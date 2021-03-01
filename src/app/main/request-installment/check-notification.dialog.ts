import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonValidation } from "src/app/constants/commonValidations";
import { InstallmentPlan } from "src/app/constants/InstallmentPlan";
import { RequestForInstallmentService } from "src/app/services/request-for-installment-service";

@Component({
  selector: "ngbd-modal-content",
  template: `
    <div class="modal-header" *ngIf="!data" dir="{{ dir }}">
      <span class="modal-title" *ngIf="dir === 'rtl'" [ngClass]="dir === 'rtl' ? 'textAr' : 'textEn'">{{arString}},{{lang.screen1.proceed}}
      </span>
      <span class="modal-title" *ngIf="dir === 'ltr'" [ngClass]="dir === 'rtl' ? 'textAr' : 'textEn'">{{enString}},{{lang.screen1.proceed}}
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
            <th colspan="3" [style.border-top-right-radius]="dir === 'rtl' ? '16px' : '0px'"
            [style.border-top-left-radius]="dir === 'rtl' ? '0px' : '16px'">{{ lang.screen1.retFbNum }}</th>
            <th colspan="3">{{ lang.screen1.retTxTyp }}</th>
            <th colspan="3">{{ lang.screen1.retPerDes }}</th>
            <th colspan="3">{{ lang.screen1.retCreDt }}</th>
            <th colspan="3" [style.border-top-left-radius]="dir === 'rtl' ? '16px' : '0px'"
            [style.border-top-right-radius]="dir === 'rtl' ? '0px' : '16px'">{{ lang.screen1.retDueDt }}</th>
          </tr>
          <ng-container *ngFor="let item of table1; last as isLast">
            <tr class="tabheader2">
              <td colspan="3" *ngIf="isLast" [style.border-bottom-right-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-bottom-left-radius]="dir === 'rtl' ? '0px' : '16px'">{{ item.RetFbn }}</td>

              <td colspan="3" *ngIf="!isLast">{{ item.RetFbn }}</td>
              <td colspan="3">{{ item.IncoText }}</td>
              <td colspan="3">{{ item.Perslt }}</td>
              <td colspan="3">
                {{ commonVaidation.convertDateToStandard(item.Cdate) + "" }}
              </td>
              <td colspan="3" *ngIf="isLast" [style.border-bottom-left-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-bottom-right-radius]="dir === 'rtl' ? '0px' : '16px'">
                {{ commonVaidation.convertDateToStandard(item.Faedn) + "" }}
              </td>
              <td colspan="3" *ngIf="!isLast">
                {{ commonVaidation.convertDateToStandard(item.Faedn) + "" }}
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
        <table style="width:100%">
          <tr class="tabHeader">
            <th colspan="3" [style.border-top-right-radius]="dir === 'rtl' ? '16px' : '0px'"
            [style.border-top-left-radius]="dir === 'rtl' ? '0px' : '16px'">{{ lang.screen1.srNo }}</th>
            <th colspan="3">{{ lang.screen1.pr_installmet }}</th>
            <th colspan="3">{{ lang.screen1.due_date }}</th>
            <th colspan="3" [style.border-top-left-radius]="dir === 'rtl' ? '16px' : '0px'"
            [style.border-top-right-radius]="dir === 'rtl' ? '0px' : '16px'">{{ lang.screen1.status }}</th>
          </tr>
          <ng-container *ngFor="let item of data; let index = index; last as isLast">
            <tr class="tabheader2">
            <td colspan="3" *ngIf="isLast" [style.border-bottom-right-radius]="dir === 'rtl' ? '16px' : '0px'"
            [style.border-bottom-left-radius]="dir === 'rtl' ? '0px' : '16px'">{{ index + 1 }}</td>
          <td colspan="3" *ngIf="!isLast">{{ index + 1 }}</td>
              <td colspan="3">
                {{
                  getFormattedAmount(item.InsAmt) | currency: "SAR" | slice: 3
                }}
                {{ lang.screen1.sar }}
              </td>
              <td colspan="3">
                {{ commonVaidation.convertDateToStandard(item.DueDt) + "" }}
              </td>
              <td
                colspan="3" [style.border-bottom-left-radius]="dir === 'rtl' ? '16px' : '0px'"
                [style.border-bottom-right-radius]="dir === 'rtl' ? '0px' : '16px'"
                *ngIf="item.InsStatus === '01' && isLast"
                style="color: red"
              >
                {{ item.InsStatusTxt }}
              </td>
              <td colspan="3" [style.border-bottom-left-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-bottom-right-radius]="dir === 'rtl' ? '0px' : '16px'"
              *ngIf="item.InsStatus === '02' && isLast"
              style="color: red">
              {{ item.InsStatusTxt }}
            </td>
              <td colspan="3" *ngIf="item.InsStatus === '01' && !isLast" [style.border-bottom-left-radius]="dir === 'rtl' ? '16px' : '0px'"
              [style.border-bottom-right-radius]="dir === 'rtl' ? '0px' : '16px'">
                {{ item.InsStatusTxt }}
              </td>
              <td colspan="3"
              *ngIf="item.InsStatus === '02' && !isLast"
              style="color: red">
              {{ item.InsStatusTxt }}
            </td>
            </tr>
          </ng-container>
        </table>
      </div>
    </div>
    <div class="modal-footer" dir="{{ dir }}">
      <button class="btnPrimary mx-2" type="button" mat-button
        (click)="activeModal.close('Close click')">
        {{lang.screen1.close}}
      </button>
    </div>
  `,
  styleUrls: ["./check-notification.css"],
})
export class NgbdModalContent implements OnInit {
  @Input() table1: any;
  @Input() data: any;
  lang;
  dir;
  arString: string;
  tin: string;
  enString: string;
  //table1: { Cdate: string; Faedn: string; Gpart: string; IncoText: string; Incotyp: string; Persl: string; Perslt: string; RetFbn: string; TinNm: string; Vkont: string; }[];
  // tableData: any;
  constructor(
    public activeModal: NgbActiveModal,
    private reqestService: RequestForInstallmentService,
    public commonVaidation: CommonValidation
  ) { }

  ngOnInit() {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = InstallmentPlan.langz.arb;
      this.dir = InstallmentPlan.langz.arb.dir;
    } else {
      this.lang = InstallmentPlan.langz.eng;
      this.dir = InstallmentPlan.langz.eng.dir;
    }

    this.arString = "عزيزي المكلف " + this.table1[0].TinNm + ",الرقم المميز " + localStorage.getItem("gpart") + ""
    this.enString = "Dear Taxpayer " + this.table1[0].TinNm + ",TIN " + localStorage.getItem("gpart") + ""

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
}
