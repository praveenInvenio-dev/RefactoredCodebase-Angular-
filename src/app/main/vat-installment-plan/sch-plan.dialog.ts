import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonValidation } from "src/app/constants/commonValidations";
import { VatInstallmentPlanConstant } from "src/app/constants/vatInstallmentPlanConstants";
import * as moment from "moment";

@Component({
  selector: "sch-plan",
  template: `
    <div class="modal-header" *ngIf="!data" dir="{{ dir }}">
      <span class="modal-title" *ngIf="dir === 'rtl'"
        >{{ arString }},{{ lang.screen1.proceed }}
      </span>
      <span class="modal-title" *ngIf="dir === 'ltr'"
        >{{ enString }},{{ lang.screen1.proceed }}
      </span>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" dir="{{ dir }}">
      <div class="row mt-3 mb-2 mx-3" style="text-align: start;" *ngIf="!data">
        <table style="width:100%">
          <tr class="tabHeader">
            <th
              colspan="3"
              [style.border-top-right-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-top-left-radius]="dir === 'rtl' ? '0px' : '16px'"
            >
              {{ lang.screen1.retFbNum }}
            </th>
            <th colspan="3">{{ lang.screen1.retTxTyp }}</th>
            <th colspan="3">{{ lang.screen1.retPerDes }}</th>
            <th colspan="3">{{ lang.screen1.retCreDt }}</th>
            <th
              colspan="3"
              [style.border-top-left-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-top-right-radius]="dir === 'rtl' ? '0px' : '16px'"
            >
              {{ lang.screen1.retDueDt }}
            </th>
          </tr>
          <ng-container *ngFor="let item of table1; last as isLast">
            <tr class="tabheader2">
              <td
                colspan="3"
                *ngIf="isLast"
                [style.border-bottom-right-radius]="
                  dir === 'rtl' ? '16px' : '0px'
                "
                [style.border-bottom-left-radius]="
                  dir === 'rtl' ? '0px' : '16px'
                "
              >
                {{ item.RetFbn }}
              </td>

              <td colspan="3" *ngIf="!isLast">{{ item.RetFbn }}</td>
              <td colspan="3">{{ item.IncoText }}</td>
              <td colspan="3">{{ item.Perslt }}</td>
              <td colspan="3">
                {{ commonValidation.convertDateToStandard(item.Cdate) + "" }}
              </td>
              <td
                colspan="3"
                *ngIf="isLast"
                [style.border-bottom-left-radius]="
                  dir === 'rtl' ? '16px' : '0px'
                "
                [style.border-bottom-right-radius]="
                  dir === 'rtl' ? '0px' : '16px'
                "
              >
                {{ commonValidation.convertDateToStandard(item.Faedn) + "" }}
              </td>
              <td colspan="3" *ngIf="!isLast">
                {{ commonValidation.convertDateToStandard(item.Faedn) + "" }}
              </td>
            </tr>
          </ng-container>
        </table>
      </div>
      <div
        class="row mt-3 mb-2 mx-3"
        style="text-align: start;"
        *ngIf="data"
        dir="{{ dir }}"
      >
        <table style="width:100%" *ngIf="!installmentAgreementNum">
          <tr class="tabHeader">
            <th
              colspan="3"
              [style.border-top-right-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-top-left-radius]="dir === 'rtl' ? '0px' : '16px'"
            >
              {{ lang.f3.m1 }}
            </th>
            <th colspan="3">{{ lang.f3.m2 }}</th>
            <th colspan="3">{{ lang.f3.m3 }}</th>
            <th colspan="3">{{ lang.f3.m4 }}</th>
            <th
              colspan="3"
              [style.border-top-left-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-top-right-radius]="dir === 'rtl' ? '0px' : '16px'"
            >
              {{ lang.f3.m5 }}
            </th>
          </tr>
          <ng-container
            *ngFor="let item of data; let index = index; last as isLast"
          >
            <tr class="tabheader2">
              <td colspan="3">
                {{ getFormattedDate(item.Faedn) }}
              </td>
              <td colspan="3">
                {{ item.Monat }}
              </td>
              <td colspan="3">
                {{ item.Betrw | number: "0.2" }} {{ lang.sar }}
              </td>

              <td colspan="3">
                {{ item.Totpaidamt | number: "0.2" }} {{ lang.sar }}
              </td>

              <td>{{ item.Totremainamt | number: "0.2" }} {{ lang.sar }}</td>
            </tr>
          </ng-container>
          <tr class="tabheader2" *ngIf="data.length > 0">
            <td
              colspan="3"
              [style.border-bottom-right-radius]="
                dir === 'rtl' ? '16px' : '0px'
              "
              [style.border-bottom-left-radius]="dir === 'rtl' ? '0px' : '16px'"
            >
              {{ lang.f3.total }}
            </td>
            <td colspan="3">
              {{ data[data.length - 1].Monat }}
            </td>
            <td colspan="3">
              {{ data[data.length - 1].Totpaidamt | number: "0.2" }}
              {{ lang.sar }}
            </td>

            <td colspan="3">
              {{ data[data.length - 1].Totpaidamt | number: "0.2" }}
              {{ lang.sar }}
            </td>

            <td
              colspan="3"
              [style.border-bottom-left-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-bottom-right-radius]="
                dir === 'rtl' ? '0px' : '16px'
              "
            >
              {{ data[data.length - 1].Totremainamt | number: "0.2" }}
              {{ lang.sar }}
            </td>
          </tr>
        </table>
        <span *ngIf="installmentAgreementNum">
          <b>{{ lang.agreementSchedulePlanModal.installmentAgreementNum }}</b>
          &nbsp;
          <span>{{ installmentAgreementNum }}</span>
        </span>
        <table style="width:100%" *ngIf="installmentAgreementNum" class="mt-3">
          <tr class="tabHeader">
            <th
              colspan="3"
              [style.border-top-right-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-top-left-radius]="dir === 'rtl' ? '0px' : '16px'"
            >
              {{ lang.agreementSchedulePlanModal.dueDate }}
            </th>
            <th colspan="3">
              {{ lang.agreementSchedulePlanModal.noOfMonths }}
            </th>
            <th colspan="3">
              {{ lang.agreementSchedulePlanModal.monthlyInstallment }}
            </th>
            <th colspan="3">
              {{ lang.agreementSchedulePlanModal.totalAmountPaid }}
            </th>
            <th colspan="3">
              {{ lang.agreementSchedulePlanModal.amountRemaining }}
            </th>
            <th
              colspan="3"
              [style.border-top-left-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-top-right-radius]="dir === 'rtl' ? '0px' : '16px'"
            >
              {{ lang.agreementSchedulePlanModal.paymentStatus }}
            </th>
          </tr>
          <ng-container
            *ngFor="let item of data; let index = index; last as isLast"
          >
            <tr class="tabheader2">
              <td colspan="3">
                {{ getFormattedDate(item?.DueDate) }}
              </td>
              <td colspan="3">
                {{ item.NoOfMonths }}
              </td>
              <td colspan="3">
                {{ item.InstalmentAmt | number: "0.2" }} {{ lang.sar }}
              </td>

              <td colspan="3">
                {{ item.TotalPaidAmt | number: "0.2" }} {{ lang.sar }}
              </td>

              <td colspan="3">
                {{ item.RemainingAmt | number: "0.2" }} {{ lang.sar }}
              </td>
              <td
                colspan="3"
                [style.border-bottom-left-radius]="
                  dir === 'rtl' ? '0px' : '0px'
                "
                [style.border-bottom-right-radius]="
                  dir === 'rtl' ? '0px' : '0px'
                "
              >
                {{ item.Status }}
              </td>
            </tr>
          </ng-container>
          <tr class="tabheader2" *ngIf="data.length > 0">
            <td
              colspan="3"
              [style.border-bottom-right-radius]="
                dir === 'rtl' ? '16px' : '0px'
              "
              [style.border-bottom-left-radius]="dir === 'rtl' ? '0px' : '16px'"
            >
              {{ lang.f3.total }}
            </td>
            <td colspan="3">
              {{ data[data.length - 1].NoOfMonths }}
            </td>
            <td colspan="3">
              {{ getTotalInstallment() | number: "0.2" }} {{ lang.sar }}
            </td>

            <td colspan="3">
              {{ getTotatlAmountPaid() | number: "0.2" }} {{ lang.sar }}
            </td>

            <td colspan="3">
              {{ getTotalAmountRemaining() | number: "0.2" }} {{ lang.sar }}
            </td>

            <td
              colspan="3"
              [style.border-bottom-left-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-bottom-right-radius]="
                dir === 'rtl' ? '0px' : '16px'
              "
            >
              {{ " " }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="modal-footer" dir="{{ dir }}">
      <button
        class="btnPrimary mx-2"
        type="button"
        mat-button
        (click)="activeModal.close('Close click')"
      >
        {{ lang.modal.close }}
      </button>
    </div>
  `,
  styleUrls: ["./sch-plan.css"],
})
export class SchPlanModal implements OnInit {
  @Input() table1: any = null;
  @Input() data: any = null;
  @Input() installmentAgreementNum: any = null;
  lang;
  dir;
  arString: string;
  tin: string;
  enString: string;
  //table1: { Cdate: string; Faedn: string; Gpart: string; IncoText: string; Incotyp: string; Persl: string; Perslt: string; RetFbn: string; TinNm: string; Vkont: string; }[];
  // tableData: any;
  constructor(
    public activeModal: NgbActiveModal,
    public commonValidation: CommonValidation
  ) {}

  ngOnInit() {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = VatInstallmentPlanConstant.arb;
      this.dir = this.lang.dir;
    } else {
      this.lang = VatInstallmentPlanConstant.eng;
      this.dir = this.lang.dir;
    }

    console.log(this.data);

    // this.arString = "عزيزي المكلف " + this.table1[0].TinNm + ",الرقم المميز " + localStorage.getItem("gpart") + ""
    // this.enString = "Dear Taxpayer " + this.table1[0].TinNm + ",TIN " + localStorage.getItem("gpart") + ""
  }

  getFormattedAmount(amount) {
    if (amount) {
      const floatNumber = parseFloat(amount);
      if (isNaN(floatNumber)) {
        return "";
      } else {
        return floatNumber.toFixed(2);
      }
    } else {
      return "";
    }
  }

  getFormattedDate(date) {
    return date ? moment(date).locale("en-us").format("DD/MM/YYYY") : "";
  }

  getTotalInstallment() {
    let total = 0;
    for (let i = 0; i < this.data.length; i++) {
      let amount = 0;
      const item = this.data[i];
      if (!isNaN(parseFloat(item.InstalmentAmt))) {
        amount = parseFloat(item.InstalmentAmt);
      }
      total += amount;
    }
    return total;
  }

  getTotatlAmountPaid() {
    let total = 0;
    for (let i = 0; i < this.data.length; i++) {
      let amount = 0;
      const item = this.data[i];
      if (!isNaN(parseFloat(item.TotalPaidAmt))) {
        amount = parseFloat(item.TotalPaidAmt);
      }
      total += amount;
    }
    return total;
  }

  getTotalAmountRemaining() {
    let total = 0;
    for (let i = 0; i < this.data.length; i++) {
      let amount = 0;
      const item = this.data[i];
      if (!isNaN(parseFloat(item.RemainingAmt))) {
        amount = parseFloat(item.RemainingAmt);
      }
      total += amount;
    }
    return total;
  }
}
