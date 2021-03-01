import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { WarehouseService } from '../warehouse.service';
import { displaywarehouseconstants } from "src/app/main/excise-services/warehouse/display-warehouse/displaywarehouseconstants.model";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-display-warehouse',
  templateUrl: './display-warehouse.component.html',
  styleUrls: ['./display-warehouse.component.css']
})
export class DisplayWarehouseComponent implements OnInit {

  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  WarehouseDetails: any;
  WarehouseList: any;
  OwnerTypeList: any;
  UsagePurposeList: any;
  LeasedList: any;
  AdditionalList: any;
  IdTypeList: any;
  CountrySet: any;
  TitleSet: any;
  Fbguid: any;
  Fbnum: any;
  Euser: any;
  OwnerIdTypeName: any;
  OwnerNationalityName: any;
  ManagerTitleName: any;
  ManagerIdTypeName: any;
  ManagerNationalityName: any;
  AdditionalName1: any;
  AdditionalName2: any;
  AdditionalName3: any;
  AdditionalName4: any;
  AdditionalNotes1: any;
  AdditionalNotes2: any;
  AdditionalNotes3: any;
  AdditionalNotes4: any;
  lang:any;
  direction: string;

  WarehouseListData: any;
  isCollapse: boolean = false;
  isGridView:boolean=true;
  CurrentDate = new Date();
  searchTerm:any;
  selectedWareHouse:any;
  constructor(
    private router: Router,
    private warehouseService: WarehouseService
  ) {
    this.GPartz = localStorage.getItem('gpart');

    if (localStorage.getItem("lang") === "ar") {
      this.lang = displaywarehouseconstants.langz.arb.displaywarehouse;
      this.direction = displaywarehouseconstants.langz.arb.dir;
            this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.lang = displaywarehouseconstants.langz.eng.displaywarehouse;
      this.direction = displaywarehouseconstants.langz.eng.dir;
            this.Direction = "ltl";
      this.Language = "E";
    }
  }

  ngOnInit() {
    this.getWarehouseDetails();
    this.warehouseDetailsList();
    this.idTypeDetails();
    this.getWarehouseListInfo();
    this.getWarehouseDropdownInfo();
    this.getWarehouseDraft();
  }

  warehouseDetailsList() {
    if (this.Language == 'A') {
      this.WarehouseList = {
        "manuGoods": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "01",
            "Text": "انتاج وتخزين السلع الإنتقائية"
          }, {
            "Key": "02",
            "Text": "تخزين السلع الإنتقائية"
          }
        ],
        "selAboveinfo": [
          {
            "Key": "",
            "Text": ""
          }, {
            "Key": "1",
            "Text": "نعم"
          }, {
            "Key": "0",
            "Text": "لا"
          }
        ],
        "wareHsLease": [
          {
            "Key": "I",
            "Text": "فرد"
          }, {
            "Key": "C",
            "Text": "شركة"
          }
        ],
        "InspReq": [
          {
            "Key": "1",
            "Text": "نعم"
          }, {
            "Key": "0",
            "Text": "لا"
          }
        ]
      }
    }
    else {
      this.WarehouseList = {
        "manuGoods": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "01",
            "Text": "Manufacturing & Storage of the Excise Goods"
          }, {
            "Key": "02",
            "Text": "Storage of the Excise Goods"
          }
        ],
        "selAboveinfo": [
          {
            "Key": "",
            "Text": ""
          }, {
            "Key": "1",
            "Text": "Yes"
          }, {
            "Key": "0",
            "Text": "No"
          }
        ],
        "wareHsLease": [
          {
            "Key": "I",
            "Text": "Individual"
          }, {
            "Key": "C",
            "Text": "Company"
          }
        ],
        "InspReq": [
          {
            "Key": "1",
            "Text": "Yes"
          }, {
            "Key": "0",
            "Text": "No"
          }
        ]
      }
    }

    this.OwnerTypeList = this.WarehouseList.wareHsLease;
    this.UsagePurposeList = this.WarehouseList.manuGoods;
    this.LeasedList = this.WarehouseList.selAboveinfo;
    this.AdditionalList = this.WarehouseList.InspReq;
  }

  idTypeDetails() {
    if (this.Language == 'A') {
      this.IdTypeList = {
        "idTyp": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "ZS0001",
            "Text": "هوية وطنية"
          },
          {
            "Key": "ZS0002",
            "Text": "هوية مقيم"
          },
          {
            "Key": "ZS0003",
            "Text": "هوية خليجية"
          }
        ]
      }
    }
    else {
      this.IdTypeList = {
        "idTyp": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "ZS0001",
            "Text": "National ID"
          },
          {
            "Key": "ZS0002",
            "Text": "Iqama ID"
          },
          {
            "Key": "ZS0003",
            "Text": "GCC ID"
          }
        ]
      }
    }

    this.IdTypeList = this.IdTypeList.idTyp;
  }

  getWarehouseListInfo() {
    this.warehouseService.warehouseDetailsListInfo(this.GPartz, this.Language).subscribe(res => {
      console.log('wrhs-whole-list', res);
     
    }, (error) => {
      console.log('err', error);
    });
  }

  getWarehouseDropdownInfo() {
    this.warehouseService.warehouseDropdownInfo(this.GPartz, this.Language).subscribe(res => {
      console.log('wrhs-dropdown', res);
      this.CountrySet = res["d"].COUNTRYSet.results;
      this.TitleSet = res["d"].TITLESet.results;
    }, (error) => {
      console.log('err', error);
    });
  }

  getWarehouseDraft() {
    this.warehouseService.warehouseDraftInfo(this.GPartz, this.Language).subscribe(res => {
      console.log('wrhs-draft', res);
    }, (error) => {
      console.log('err', error);
    });
  }

  getWarehouseInfo() {
    this.warehouseService.warehouseDetailsInfo(this.GPartz, this.Language, this.Fbguid, this.Fbnum, this.Euser).subscribe(res => {
      console.log('wrhs-info', res);
      this.WarehouseDetails = res["d"];
      console.log('res', this.WarehouseDetails);
      this.WarehouseDetails.Lsfdt = res["d"].Lsfdt !== "Invalid date" && res["d"].Lsfdt !== null ? new Date(+res["d"].Lsfdt.substr(6, 13)).toISOString().slice(0, 19) : null;
      this.WarehouseDetails.Lsedt = res["d"].Lsedt !== "Invalid date" && res["d"].Lsedt !== null ? new Date(+res["d"].Lsedt.substr(6, 13)).toISOString().slice(0, 19) : null;
      this.WarehouseDetails.WH_CONTACTPSet.results[0].HiringDt = res["d"].WH_CONTACTPSet.results[0].HiringDt !== "Invalid date" && res["d"].WH_CONTACTPSet.results[0].HiringDt !== null ? new Date(+res["d"].WH_CONTACTPSet.results[0].HiringDt.substr(6, 13)).toISOString().slice(0, 19) : null;
      this.allDropdownListBindingNames();
    }, (error) => {
      console.log('err', error);
    });
  }

  allDropdownListBindingNames() {
    if(this.WarehouseDetails !== undefined && this.TitleSet !== undefined && this.CountrySet !== undefined) {
      for(let f=0; f<this.TitleSet.length; f++) {
        if(this.WarehouseDetails.WH_CONTACTPSet.results[0].Title == this.TitleSet[f].Title) {
          this.ManagerTitleName = this.TitleSet[f].TitleMedi;
        }
      }

      for(let d=0; d<this.CountrySet.length; d++) {
        if(this.WarehouseDetails.WH_CONTACTPSet.results[1].Nationality == this.CountrySet[d].Land1) {
          this.OwnerNationalityName = this.CountrySet[d].Natio50;
        }
        if(this.WarehouseDetails.WH_CONTACTPSet.results[0].Nationality == this.CountrySet[d].Land1) {
          this.ManagerNationalityName = this.CountrySet[d].Natio50;
        }
      }

      for(let w=0; w<this.IdTypeList.length; w++) {
        if(this.WarehouseDetails.WH_CONTACTPSet.results[1].Type == this.IdTypeList[w].Key) {
          this.OwnerIdTypeName = this.IdTypeList[w].Text;
        }
        if(this.WarehouseDetails.WH_CONTACTPSet.results[0].Type == this.IdTypeList[w].Key) {
          this.ManagerIdTypeName = this.IdTypeList[w].Text;
        }
      }

      for(let p=0; p<this.AdditionalList.length; p++) {
        if(this.WarehouseDetails.AddQuesSet.results[0].RbFg == this.AdditionalList[p].Key) {
          this.AdditionalName1 = this.AdditionalList[p].Text;
        }
        if(this.WarehouseDetails.AddQuesSet.results[1].RbFg == this.AdditionalList[p].Key) {
          this.AdditionalName2 = this.AdditionalList[p].Text;
        }
        if(this.WarehouseDetails.AddQuesSet.results[2].RbFg == this.AdditionalList[p].Key) {
          this.AdditionalName3 = this.AdditionalList[p].Text;
        }
        if(this.WarehouseDetails.AddQuesSet.results[3].RbFg == this.AdditionalList[p].Key) {
          this.AdditionalName4 = this.AdditionalList[p].Text;
        }
      }

      for(let z=0; z<this.WarehouseDetails.NOTESSet.results.length; z++) {
        if(this.WarehouseDetails.NOTESSet.results[z].Rcodez == "EWQ_NOTE01") {
          this.AdditionalNotes1 = this.WarehouseDetails.NOTESSet.results[z].Strline;
        }
        if(this.WarehouseDetails.NOTESSet.results[z].Rcodez == "EWQ_NOTE02") {
          this.AdditionalNotes2 = this.WarehouseDetails.NOTESSet.results[z].Strline;
        }
        if(this.WarehouseDetails.NOTESSet.results[z].Rcodez == "EWQ_NOTE03") {
          this.AdditionalNotes3 = this.WarehouseDetails.NOTESSet.results[z].Strline;
        }
        if(this.WarehouseDetails.NOTESSet.results[z].Rcodez == "EWQ_NOTE04") {
          this.AdditionalNotes4 = this.WarehouseDetails.NOTESSet.results[z].Strline;
        }
      }
    }
    console.log("this.WarehouseDetails",this.WarehouseDetails);
    
  }
  getWarehouseDetails() {
    this.warehouseService.warehouseDetailsListInfo(this.GPartz, this.Language).subscribe(data => {
      if(data) {
        console.log('list-data', data["d"]);
        this.WarehouseListData = data["d"].WI_TASKSet.results;
      }
    }, (error) => {
      console.log('err', error);
    });
  }

  displayWarehouse(item)
  {
    this.selectedWareHouse=item;
    
    this.Fbguid =item.Fbguid;
    this.Fbnum =item.Fbnum;
    this.Euser = item.Euser;
    this.getWarehouseInfo();
  }
  downloadFile(url)
  {
    window.open(url,"_blank")
  }
   Acknowledgement() {
    this.warehouseService.downloadfilledform(this.Fbnum).subscribe((data: any) => {
      FileSaver.saveAs(data, "Acknowledgement.pdf");
     // this.Step= 1
    }, (error) => {
      console.log('err-2', error);
    });
  }
  downloadForm() {
    this.warehouseService.acknowledgementform(this.Fbnum).subscribe((data: any) => {
      FileSaver.saveAs(data, "DownloadForm.pdf");
      this.Step= 1
    }, (error) => {
      console.log('err-2', error);
    });
  }
  downloadownershipattach(Doguid, Dotyp, filename) {
    this.warehouseService.downloadAttachments(Doguid, Dotyp).subscribe((data: any) => {

      FileSaver.saveAs(data, filename);
    }, (error) => {
      console.log('err-2', error);
    });
  }
  SearchWareList() {
    this.warehouseService.warehouseDetailsListInfo(this.GPartz, this.Language).subscribe(data => {
      if(data) {
         this.WarehouseListData = data["d"].WI_TASKSet.results;
        if(this.searchTerm) {
          var result = this.WarehouseListData.filter(item =>
            Object.keys(item).some(k => item[k] != null &&
              item[k].toString().toLowerCase()
                .includes(this.searchTerm.toLowerCase()))
          );
          this.WarehouseListData = result;
        } 
      }
    }, (error) => {
      console.log('err', error);
    });
  }
}
