import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InstallmentPlan } from 'src/app/constants/InstallmentPlan';

@Component({
  selector: 'errror-message-modal',
  template: `
    <div class="modal-header">
      <span class="modal-title">{{data}}
      </span>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-footer" dir="{{ dir }}">
      <button type="button"  class="btnPrimary mx-2" mat-button (click)="activeModal.close('Close click')"  data-dismiss="modal">  {{lang.screen1.close}}</button>
    </div>
  `,
  styles: ['.modal-content { width: 800px !important;} .modal-header {border-bottom: none; } .modal-footer { border-top: none }  .mat-button { background-color: var(--secondary) !important; color: #ffffff !important;}']
})
export class ErrorMessageModal implements OnInit {
  @Input() data: any;
  lang;
  dir;
  //table1: { Cdate: string; Faedn: string; Gpart: string; IncoText: string; Incotyp: string; Persl: string; Perslt: string; RetFbn: string; TinNm: string; Vkont: string; }[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log('dataaaaa', this.data);
    if (localStorage.getItem("lang") === "ar") {
      this.lang = InstallmentPlan.langz.arb;
      this.dir = InstallmentPlan.langz.arb.dir;
    } else {
      this.lang = InstallmentPlan.langz.eng;
      this.dir = InstallmentPlan.langz.eng.dir;
    }
  }
}