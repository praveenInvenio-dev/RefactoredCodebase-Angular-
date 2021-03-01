import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { VatServicesService } from '../vat-services.service';

declare var $;
@Component({
  selector: 'app-display-registration',
  templateUrl: './display-registration.component.html',
  styleUrls: ['./display-registration.component.css']
})
export class DisplayRegistrationComponent implements OnInit {

  @ViewChild('infoModal', { static: false }) infoModal: ElementRef;

  InstructionFormGroup: FormGroup = new FormGroup({});
  DeclarationFormGroup: FormGroup = new FormGroup({});

  GPartz: any;
  Direction: string;
  Language: string;
  Step: any = 1;
  CurrentDate = new Date();
  IdTypeList: any;
  FrequencyList: any;
  AttachmentTypeList: any;
  DisplayMainData: any;
  AttachmentDataSet: any;
  VTCPSet: any;
  VTEPAttachmentSet: any;
  CategorySet: any;
  ProvinceSet: any;
  CitySet: any;
  AttachmentSet: any;
  ElegibleCategory: any;
  Region1: any;
  RefundFrequency: any;
  IdType1: any;
  Region2: any;
  IdType2: any;
  FirstAttachmentList: any[] = [];
  SecondAttachmentList: any[] = [];
  ChangeAttachFiles: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private displayVatService: VatServicesService
  ) {
    this.GPartz = localStorage.getItem('gpart');
    if (localStorage.getItem("lang") === "ar") {
      this.Direction = "rtl";
      this.Language = "A";
    } else {
      this.Direction = "ltr";
      this.Language = "E";
    }
    this.DeclarationFormGroup = new FormGroup({
      check1: new FormControl(false, [Validators.required]),
      check2: new FormControl(false, [Validators.required]),
      check3: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit() {
    this.getDefaultAllListSet();
    this.getAllServiceData();
    this.instructionFormControls();
  }

  stepsChecking() {
    switch (this.Step) {
      case 1:
        this.getDataSet();
        break;
      case 2:
        this.getDeclarationDetails();
        break;
      default:
        break;
    }

    return this.Step;
  }

  getDefaultAllListSet() {
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

      this.FrequencyList = {
        "frequency": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "QU",
            "Text": "Quarterly refund application"
          },
          {
            "Key": "AN",
            "Text": "Yearly refund application"
          }
        ]
      }

      this.AttachmentTypeList = {
        "type": [
          {
            "Key": "",
            "Text": ""
          },
          {
            "Key": "EP25",
            "Text": "Copy of ID"
          },
          {
            "Key": "EP27",
            "Text": "Copy of employment contract or proof of employment at the Elegible entity"
          },
          {
            "Key": "EP28",
            "Text": "Others"
          }
        ]
      }
    }
    this.IdTypeList = this.IdTypeList.idTyp;
    this.FrequencyList = this.FrequencyList.frequency;
    this.AttachmentTypeList = this.AttachmentTypeList.type;
  }

  /* Step - 1 starts here */
  getAllServiceData() {
    this.displayVatService.getVatDisplaySRVData1(this.GPartz, this.Language).subscribe(data => {
      if (data) {
        console.log('data-srv-1', data["d"]);
        this.DisplayMainData = data["d"];
        this.AttachmentDataSet = data["d"].ATTACHMENTSet.results;
        this.VTCPSet = data["d"].VTCPSet.results[0];
        this.VTEPAttachmentSet = data["d"].VTEP_ATTSet.results;
        let declarationDate = this.DisplayMainData.Decdob !== undefined && this.DisplayMainData.Decdob !== null ? new Date(+this.DisplayMainData.Decdob.substr(6, 13)) : this.CurrentDate; 
        let birthDate = this.VTCPSet.Birthdt !== undefined && this.VTCPSet.Birthdt !== null ? new Date(+this.VTCPSet.Birthdt.substr(6, 13)) : this.CurrentDate;
        this.DisplayMainData.Decdob = declarationDate;
        this.VTCPSet.Birthdt = birthDate;
        this.displayVatService.getVatDisplaySRVData2(this.GPartz, this.Language).subscribe(data => {
          if (data) {
            console.log('data-srv-2', data["d"]);
            this.CategorySet = data["d"].ELG_CATESet.results;
            this.ProvinceSet = data["d"].PROVINCESet.results;
            this.CitySet = data["d"].CITYSet.results;
            if (this.DisplayMainData !== undefined && this.AttachmentDataSet !== undefined && this.VTCPSet !== undefined && this.CategorySet !== undefined && this.ProvinceSet !== undefined && this.FrequencyList !== undefined && this.IdTypeList !== undefined) {
              this.stepsChecking();
            }
          }
        }, (error) => {
          console.log('error-srv-2', error);
        });
      }
    }, (error) => {
      console.log('error-srv-1', error);
    });

    this.displayVatService.getVatDisplaySRVData3(this.Language).subscribe(data => {
      if (data) {
        console.log('data-srv-3', data["d"]);
        this.AttachmentSet = data["d"].results;
      }
    }, (error) => {
      console.log('error-srv-3', error);
    });
  }

  getDataSet() { 
    let category = this.CategorySet.filter(x => x.EpCode == this.DisplayMainData.EpCode);
    this.ElegibleCategory = category.length > 0 ? category[0].DepDescr : '';
    let province1 = this.ProvinceSet.filter(x => x.Bland == this.DisplayMainData.Region);
    this.Region1 = province1.length > 0 ? province1[0].Bezei : '';
    let frequency = this.FrequencyList.filter(x => x.Key == this.DisplayMainData.Periodicity);
    this.RefundFrequency = frequency.length > 0 ? frequency[0].Text : '';
    let type1 = this.IdTypeList.filter(x => x.Key == this.VTCPSet.Type);
    this.IdType1 = type1.length > 0 ? type1[0].Text : '';
    let province2 = this.ProvinceSet.filter(x => x.Bland == this.VTCPSet.Region);
    this.Region2 = province2.length > 0 ? province2[0].Bezei : '';
    let type2 = this.IdTypeList.filter(x => x.Key == this.DisplayMainData.TypeDec);
    this.IdType2 = type2.length > 0 ? type2[0].Text : '';
    this.AttachmentDataSet.forEach((element) => {
      let attachset = this.AttachmentTypeList.filter(tt => tt.Key !== undefined && tt.Key == element.Dotyp);
      if (attachset.length > 0) {
        this.SecondAttachmentList.push(element);
      }
    });
    this.AttachmentDataSet.forEach((element) => {
      let attachset = this.AttachmentSet.filter(tt => tt.DmsTp !== undefined && tt.DmsTp == element.Dotyp);
      if (attachset.length > 0) {
        this.FirstAttachmentList.push(element);
      }
    });
  }

  instructionFormControls() {
    this.InstructionFormGroup.addControl('agree', new FormControl(false, [Validators.required]));
    $('#infoModal').modal('show');
  }

  termsAndConditionsOfInstructionAcceptance() {
    $('#infoModal').modal('hide');
  }

  continueFirstScreen() {
    this.step2();
  }
  /* Step - 1 ends here */

  /* Step - 2 starts here */
  getDeclarationDetails() {
    if (this.DisplayMainData !== undefined) {
      this.DeclarationFormGroup.controls['check1'].setValue(this.agreeStringValueCheck(this.DisplayMainData.Decfg));
      this.DeclarationFormGroup.controls['check2'].setValue(this.agreeStringValueCheck(this.DisplayMainData.Decfg1));
      this.DeclarationFormGroup.controls['check3'].setValue(this.agreeStringValueCheck(this.DisplayMainData.DisplayFg));
    } else {
      this.DeclarationFormGroup.controls['check1'].setValue(false);
      this.DeclarationFormGroup.controls['check2'].setValue(false);
      this.DeclarationFormGroup.controls['check3'].setValue(false);
    }
  }
  /* Step - 2 ends here */

  agreeBooleanValueCheck(value) {
    let agree;
    if (value == true) {
      agree = "X";
    }
    else {
      agree = "";
    }
    return agree;
  }

  agreeStringValueCheck(value) {
    let agree;
    if (value == "X") {
      agree = true;
    }
    else {
      agree = false;
    }
    return agree;
  }

  attachmentDownload(obj) {
    console.log('download', obj.DocUrl);
    window.open(obj.DocUrl, '_blank');
  }

  redirectTo() {
    this.router.navigate(['/mains/vatServices/vatElegibleChange']);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.DisplayMainData !== undefined) {
        this.InstructionFormGroup.controls['agree'].setValue(this.agreeStringValueCheck(this.DisplayMainData.AgrFg));
      }
      this.infoModal.nativeElement.click();
    }, 5000)
  }

  back1() {
    this.Step = 1;
  }

  step2() {
    this.Step = 2;
    this.stepsChecking();
  }

}
