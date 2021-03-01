import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Moment } from "moment";
import { Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { StatementListConstants } from "../main/account-statement/account-statement.constants";
import { CommitmentsService } from "./commitments.service";

const httpOptions = {
  headers: new HttpHeaders({
    ichannel: "243",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AccountStatementService {
  baseUrl = environment.url;
  lang: string;
  shortLang: "A" | "E";
  calendarType: "H" | "G";
  translation: any = {};
  private isReady = false;

  tin: string;
  FbGuid: string;
  EUser: string;

  stepListener$ = new Subject<number>();
  statementDetailData: any = {};

  // These data points are used in statement list component. They are added here for persistence
  filterInfo: any = {};
  fiscalYearInfo: { taxTypeId: string; data: { year: string; _raw: any }[] } = {
    taxTypeId: null,
    data: [],
  };
  searchKeyword: string = null;
  selectedTaxType: "D" | "I";

  private CSVHeadersMap = [
    // Translation ID to object ID map in the order of CSV
    ["txnDate", "Bldat"],
    ["taxty", "TaxtypeDesc"],
    ["fbnum", "Fbnum"],
    ["sadadbill", "Vtre2"],
    ["taxp", "PeriodTxt"],
    ["duedt", "Bldat2"],
    ["billdesc", "Desc"],
    ["billam", "Betrh"],
    ["Status", "StatusDesc"],
  ];

  constructor(
    private http: HttpClient,
    private constInfo: StatementListConstants,
    private commitmentSrv: CommitmentsService
  ) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "ar";
      this.shortLang = "A";
    } else {
      this.lang = "en";
      this.shortLang = "E";
    }
    this.translation = this.constInfo.translation[this.lang];
    this.tin = localStorage.getItem("gpart");
  }

  private populateEuserAndFbguid() {
    return new Promise<void>((resolve, reject) => {
      this.commitmentSrv.getEncryptedTins().subscribe(
        (res) => {
          this.commitmentSrv
            .getDashboardData(
              res["d"]["Val1"],
              res["d"]["Val2"],
              res["d"]["Val3"],
              res["d"]["Val4"],
              res["d"]["Val5"]
            )
            .subscribe(
              (res) => {
                localStorage.setItem("euser", res["d"]["Euser"]);
                localStorage.setItem("fbguid", res["d"]["Fbguid"]);
                this.setfbguidEuser();
                this.isReady = true;
                resolve();
              },
              (err) => {
                reject();
                this.isReady = null;
                console.error("Error in getting Dashboard data", err);
              }
            );
        },
        (err) => {
          reject();
          this.isReady = null;
          console.error("Error in getting Encrypted Tins", err);
        }
      );
    });
  }

  private setfbguidEuser() {
    this.FbGuid = localStorage.getItem("fbguid");
    this.EUser = localStorage.getItem("euser");
  }

  private addTxnGroup(info: any, index: number, groupName: string) {
    info.custom_txn_group = this.constInfo.TXN_LIST_MAP[info.StatementFilter];
    return info;
  }

  ready(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      if (this.isReady === true || this.isReady === null) {
        // TODO: Idenfity what to do when Fbguid and Euser API fails?
        resolve();
      } else {
        this.populateEuserAndFbguid().then(resolve).catch(resolve);
      }
    });
  }

  getStatement(
    txnType: "D" | "I",
    statementFilter: string = "",
    fiscalYear: number = null
  ) {
    let filter = [
      `StatementFilter='${statementFilter || ""}'`,
      `TaxType='${txnType}'`,
      `FiscalYear='${fiscalYear || ""}'`,
    ];
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ACCOUNT_STATEMENT_SRV/StatementHeaderSet(" +
      `Euser='${this.EUser}',Fbguid='${this.FbGuid}',` +
      filter.join(",") +
      ",Load='',Lang='" +
      this.shortLang +
      "')?&$expand=StatmenetLineItemsSet";
    console.log("**********************url");
    console.log(url);
    return this.http.get(url, httpOptions).pipe(
      tap((res: any) => {
        this.calendarType = res.d.CalType;
      })
    );
  }

  getFiscalYearList(taxType: string, filterId: number) {
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ACCOUNT_STATEMENT_srv/YearValueSet?$filter=" +
      `Euser eq '${this.EUser}' and ` +
      `Fguid eq '${this.FbGuid}' and ` +
      `TaxType eq '${taxType}' and ` +
      `StatementFilter eq '${filterId}'`;

    return this.http.get(url).pipe(
      map((data: any) => {
        return data.d.results.map((info) => {
          return {
            year: info.Persl,
            _raw: info,
          };
        });
      })
    );
  }

  getTransactionTypes(): Observable<any> {
    // TODO: Since there are no way to choose direct v/s indirect category, we are getting all transaction types together.
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ACCOUNT_STATEMENT_SRV/RevenueDropdownSet?$filter=Euser eq '" +
      this.EUser +
      "' and Fbguid eq '" +
      this.FbGuid +
      "' and  TaxType eq '" +
      this.selectedTaxType +
      "' and Langz eq '" +
      this.shortLang +
      "'";

    return this.http.get(url).pipe(
      map((item: any) => {
        const viewMapper = this.translation.taxTypeViewMap;
        item.d.results = item.d.results.map((info: any) => {
          return {
            ...info,
            Txt30: viewMapper[info.StatementFilter] || info.Txt30,
          };
        });
        item.d.results.unshift(item.d.results.pop());

        return item;
      })
    );
  }

  downloadPDFStatement(
    fromDate: Moment,
    toDate: Moment,
    filterInfo: any,
    data: {
      listInfo: any[];
      otherData: any;
    },
    fiscalYear: number
  ) {
    let rawInfo = data.listInfo
      .filter((info) => info.txn_date >= fromDate && info.txn_date <= toDate)
      .map((info) => info._raw);
    if (rawInfo.length === 0) {
      return this.translation.notfound;
    }
    let url =
      this.baseUrl +
      "sap/opu/odata/SAP/Z_ACCOUNT_STATEMENT_SRV/zpdfDownloadSet(" +
      `Euser='${this.EUser}',` +
      `Fguid='${this.FbGuid}',` +
      `Taxtype='${filterInfo.txn_group}',` +
      `FiscalYear='${fiscalYear || ""}',` +
      `StatementFilter='${filterInfo.id}',` +
      `FromDt=datetime'${fromDate
        .locale("en")
        .format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)}',` +
      `ToDt=datetime'${toDate
        .locale("en")
        .format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)}',` +
      `Langz='${this.shortLang}')/$value`;
    console.log("Statement Download URL: ", url);
    this.initiateDownload(url);

    return '';
  }

  private addToTheList(listRef: any[], item: any) {
    if (this.shortLang === "A") {
      listRef.unshift(item);
    } else {
      listRef.push(item);
    }
  }

  private getCSVFormattedData(data: {
    listInfo: any[];
    otherData: {
      openingBalance: number;
      closingBalance: number;
    };
  }): string {
    const formattedData = [];
    // Add headers
    let row = [];
    for (let attrTuple of this.CSVHeadersMap) {
      this.addToTheList(row, this.translation[attrTuple[0]]);
    }
    formattedData.push(row);

    // Opening balance row
    row = [];
    for (let attrTuple of this.CSVHeadersMap) {
      if (attrTuple[1] === "Desc") {
        this.addToTheList(row, this.translation["openbal"]);
      } else if (attrTuple[1] === "Betrh") {
        this.addToTheList(
          row,
          parseFloat("" + data.otherData.openingBalance).toFixed(2)
        );
      } else {
        this.addToTheList(row, "");
      }
    }
    formattedData.push(row);

    // All the other data
    for (let raw of data.listInfo) {
      row = [];
      for (let attrTuple of this.CSVHeadersMap) {
        let info = raw[attrTuple[1]];
        if (
          this.lang === "en" &&
          ["Bldat", "Bldat2"].indexOf(attrTuple[1]) >= 0
        ) {
          // Date columns should be parsed:
          info = moment(+info.match(/\d+/)[0])
            .locale("en")
            .format("DD/MM/YYYY");
        } else {
          info = `"${info}"`
        }
        this.addToTheList(row, info);
      }
      formattedData.push(row);
    }

    // Closing balance row
    row = [];
    for (let attrTuple of this.CSVHeadersMap) {
      if (attrTuple[1] === "Desc") {
        this.addToTheList(row, this.translation["closeBalEx"]);
      } else if (attrTuple[1] === "Betrh") {
        // TODO: Finalize what to do about closing balance
        this.addToTheList(
          row,
          parseFloat("" + data.otherData.closingBalance).toFixed(2)
        );
      } else {
        this.addToTheList(row, "");
      }
    }
    formattedData.push(row);
    return formattedData
      .map((row) => {
        return row.join(",");
      })
      .join("\n");
  }

  downloadCSVStatement(
    fromDt: Moment,
    toDt: Moment,
    filterInfo: any,
    data: {
      listInfo: any[];
      otherData: any;
    },
    fiscalYear: number
  ) {
    try {
      let rawInfo = data.listInfo
        .filter((info) => info.txn_date >= fromDt && info.txn_date <= toDt)
        .map((info) => info._raw);

      if (rawInfo.length === 0) {
        return this.translation.notfound;
      }
      if (this.lang === "ar") {
        this.getCSVDataFromAPI(fromDt, toDt, filterInfo, fiscalYear).subscribe(
          (data) => {
            this.prepareToDownloadCSVData(
              this.getCSVFormattedData({
                listInfo: data.d.ztaxaccdataSet.results,
                otherData: {
                  openingBalance: parseFloat(data.d.Open),
                  closingBalance: parseFloat(data.d.Close),
                },
              })
            );
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        this.prepareToDownloadCSVData(
          this.getCSVFormattedData({
            listInfo: rawInfo,
            otherData: data.otherData,
          })
        );
      }
    } catch (err) {
      console.error("Something went wrong in downloading CSV ", err);
    }

    return '';
  }

  private prepareToDownloadCSVData(info: string) {
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), info], {
      type: "text/csv;charset=utf-8;",
    });
    const filename = this.constInfo.StatementFilename[this.lang].csv;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const url = URL.createObjectURL(blob);
      this.initiateDownload(url, filename);
    }
  }

  private getCSVDataFromAPI(
    fromDt: Moment,
    toDt: Moment,
    filterInfo: any,
    fiscalYear?: number
  ): Observable<any> {
    let url =
      this.baseUrl +
      `sap/opu/odata/SAP/Z_STATEMENT_DOWNLOAD_N_SRV/ztaxheaderSet(` +
      `Euser='${this.EUser}',` +
      `Fbguid='${this.FbGuid}',` +
      `Lang='${this.shortLang}',` +
      `TaxType='${filterInfo.txn_group}',` +
      `StatementFilter='${filterInfo.id}',` +
      `FiscalYear='${fiscalYear || ""}',` +
      `Download='X',` +
      `FromDt=datetime'${fromDt.locale("en").format("YYYY-M-DTHH:MM:SS")}',` +
      `ToDt=datetime'${toDt.locale("en").format("YYYY-M-DTHH:MM:SS")}',` +
      `CalType='${this.calendarType}')?&$expand=ztaxaccdataSet`;

    return this.http.get(url, httpOptions);
  }

  gotoStep(stepNumber: number) {
    this.stepListener$.next(stepNumber);
  }

  getAmountString(amount, numDecimal: number = 2) {
    // Returns ${amount} in Indian format with exactly ${numDecimal} decimal places

    return (+amount).toLocaleString("en-US", {
      minimumFractionDigits: numDecimal,
      maximumFractionDigits: numDecimal,
    });
  }

  initiateDownload(url: string, filename: string = "") {
    const link = document.createElement("a");
    if (link.download === undefined) {
      // TODO: Add this error browser not supported for download
      console.error("Your browser does not support downloading.");
      return;
    }
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getStatusStylingClass(status: string) {
    // Paid-green - 1
    // Awaiting payment -red - 3
    // Over Due-red - 2
    // Under Review- grey - 4 -verified
    // Open Credit- orange - 5
    // Reversed-red - 6
    // Credit Balance -green - 7
    // Refund - red - 9 --- waiting confirmation
    // Got the following conditions from UI5 portal
    if (status == "4" || status == "8" || status == "2" || status == "7") {
      return "tag-success";
    } else if (status == "1" || status == "9" || status == "5") {
      return "tag-partial";
    } else if (status == "3" || status == "6") {
      return "tag-danger";
    } else {
      return "tag-unsubmit";
    }
  }
}
