import { Component, OnInit, ElementRef,ViewChild ,ChangeDetectorRef} from '@angular/core';
import { constants } from "src/app/constants/constants.model";
import { environment } from "src/environments/environment";
import { AuthorizeConstants } from "src/app/constants/AuthorizationConstants";
import { CalendarDate } from "jdnconvertiblecalendar";
import { FormGroup, FormBuilder, Validators,FormControl,FormArray} from "@angular/forms";
import { CalendarComponent } from 'src/app/constants/calendar.component';
import { Router } from "@angular/router";
import { Observable, of as observableOf } from 'rxjs'; // since RxJs 6
import { toGregorian } from "hijri-converter";
import { AppService } from "src/app/app.service";
import { CommonValidation } from "src/app/constants/commonValidations";
import { NotifierService } from "angular-notifier";
import { AuthorizationService } from "src/app/services/authorization.service";
import { DatePipe } from "@angular/common";
import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent implements OnInit {
  headerComponent = CalendarComponent;
   @ViewChild("tinId") tinElement: ElementRef;
   @ViewChild("nameId") nameIdElement: ElementRef;
   @ViewChild("authREqestBtn") authRequestElement: ElementRef;
   @ViewChild("taxtypeId") taxTypeElement: ElementRef;
  matPanelExpanded:boolean;
  matPanel2Expanded:boolean =false;
  baseUrl = environment.url;
  optionSlected = 0;
  menu: any;
  sub:boolean= false;
  dir: string;
  listOfTotalReturnsObjections:any=[];
  listOfReturnsObjections:any=[];
  selectedReturns =[];
  selectedObjections=[];
  disableForm:boolean=false;
  viewListView = false;
  search:string ="";
  showDropdown:boolean=false;
  page1: any;
  page2: any;
  page3:any;
  editBUttonDisabled:boolean=false;
  listUpdatedFlag:boolean = false;
  minDate:any;
    dtype:any;
  tinReadOnly:boolean=true;
  nameReadOnly:boolean=true;
  startDtInSecs:any;
  endDateInSecs:any;
  authDbSet={}
  authDetails = [];
  action: string ="X";
  calendarType:string;
  selectedServicesList=[];
  minEndDate:any;
  servicesMessage:string ="";
  tinErr: boolean = false;
  tinMsg: string ="";
  formErrors:boolean=false;
  endDateErr:boolean=false;
  authErr:any ={};
  img1: string ="";
  listOfTotalETServices=[];
  img2: string ="";
  locale:any;
  authorizationDetailsObj={

  }
   authDetailFrom:  any;
  authDetailTo: any;
  authFormGroup: FormGroup;
  matIconImg: any= "assets/image/circle-arrow-down.svg";
  submitted1: boolean=false;
  nameErr:  boolean=false;
  count:  number =0;
  nameMsg:string ="";
  tin: string ="";
  itemToDelete:any;
  showBtn=-1;
  taxtype: string ="";
  taxtypeSet=[];
  nameSet:any=[]
  listOfOtherServices=[]
  otherServiceObjectSet=[]
  editRequestSet=[]
  authRequestsSet=[]
  lang:string ="";
  options = [] ;
  filteredOptions: Observable<any>;
    constructor(
    private _formBuilder: FormBuilder,
    public notifierService: NotifierService,
    public commonValid: CommonValidation,
    public appSrv: AppService,
    private router: Router,
    public authService: AuthorizationService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public datePipe: DatePipe,

  ) {
      this.getAuthRequests = this.getAuthRequests.bind(this);
      this.setAuthDetailsData = this.setAuthDetailsData.bind(this);
      this.setSelectedServicesList = this.setSelectedServicesList.bind(this);
  }
  calendarComponent = CalendarComponent;
  ngOnInit(): void {
    this.tin = localStorage.getItem("gpart");
    this.baseUrl =environment.url;

    if (localStorage.getItem("lang") === "ar") {
      this.page1 = AuthorizeConstants.langz.arb.authorize1;
      this.page2 = AuthorizeConstants.langz.arb.authorize2;
      this.page3 = AuthorizeConstants.langz.arb.authorize3;
      this.lang  = "AR"
      moment.locale('ar');
      this.dir = constants.langz.arb.dir;
      this.authErr = AuthorizeConstants.langz.arb.authErrors;

    } else {
      this.page1 = AuthorizeConstants.langz.eng.authorize1;
      this.page2 = AuthorizeConstants.langz.eng.authorize2;
      this.page3 = AuthorizeConstants.langz.eng.authorize3;
      this.authErr = AuthorizeConstants.langz.eng.authErrors;
      this.lang  = "EN"
      moment.locale('en');
      this.dir = constants.langz.eng.dir; 
       }
      this.img1 = "assets/image/table (1).svg";
      this.img2 = "assets/image/cards (1).svg";
      
      this.appSrv.data1.subscribe((res) => {
        this.dtype = res;
        this.minDate = this.commonValid.dateFormate(
          this.commonValid.toJulianDate(new Date()),
          res
        );
      });
      this.calendarType= this.dtype;
        this.minEndDate=this.minDate
        this.authFormGroup =this._formBuilder.group({
        authStartDate: new FormControl(null, [Validators.required]),
        authEndDate: new FormControl(null, [Validators.required]),
        tin: new FormControl({value: ''}, [Validators.required]),
        name: new FormControl({value: '',}, [Validators.required]),
        taxtype: new FormControl(undefined, [Validators.required]),
        otherServicesControlSet: this._formBuilder.array([])
      });
    this.filteredOptions = this.authFormGroup.controls['name'].valueChanges
          .pipe(
            startWith(''),
            map(value => value.length >= 1 ? this._filter(value) : [])
          );
     this.getAuthRequests();
     this.getAuditorNameSet();
  }
  validateForm():Observable<boolean>{
    let isFormValid = true;
    this.resetFormValidation();
    if(!this.tinValidation2(this.authFormGroup.controls['tin'].value)){
      this.formErrors = true; 
      isFormValid=false;
    }
    if(!this.nameValidation2(this.authFormGroup.controls['name'].value)){
      this.formErrors = true; 
      isFormValid=false;
    }
    if(!this.validateDate()){
      this.formErrors = true; 
      isFormValid=false;
    }
   if(!this.validateServices()){
      this.formErrors = true; 
      isFormValid=false;
   }
    return observableOf(isFormValid);
  }
  resetFormValidation(){
    this.formErrors=false;
    this.tinErr = false;
    this.nameErr = false;
    this.endDateErr = false;
    this.authFormGroup.clearValidators()
  }
   onSubmit(){
    this.submitted1=true;
    let baseUrlStr = this.baseUrl;
    let changedStartDate,changedEndDate;
    let calType="";
    const dt1 = this.getFromDate();
    const dt2 = this.getToDate();
    if(this.action ==='U')
      this.authFormGroup.get('authStartDate').setErrors(null);
    let TaxpayerTin = localStorage.getItem("gpart");
    let AuditorTin = (this.authFormGroup.controls['tin'].value)?this.authFormGroup.controls['tin'].value:"";
           if(TaxpayerTin==="" ||TaxpayerTin ===null){
          this.formErrors = true; 
          this.notifierService.notify(
            "error",
            this.authErr.tinError3
          );
          return; 
        }
    var validForm;
    this.validateForm().subscribe((res)=>{
      validForm=res;
    })
    if(this.disableForm===true ||this.authFormGroup.invalid){
      return;
    }
    else{ 
              if(!this.authFormGroup.invalid && !this.formErrors){
                  if(this.calendarType ==="Gregorian")
                  {
                      calType="G"
                      changedStartDate  = this.commonValid.changeDate(
                        this.authFormGroup.value.authStartDate["calendarStart"]
                      );
                      changedEndDate  = this.commonValid.changeDate(
                          this.authFormGroup.value.authEndDate["calendarStart"]
                      );
                  }
                  else{
                      calType="G"
                      changedStartDate = dt1.year + "-" + dt1.month + "-" + dt1.day + "T00:00:00";
                      changedEndDate = dt2.year + "-" + dt2.month + "-" + dt2.day + "T00:00:00";
                  }
                         let body={
                          "FrmDate":changedStartDate,
                          "ToDate":changedEndDate,
                          "DateType":calType,
                          "TaxpayerTin": TaxpayerTin,
                          "AuditorTin":AuditorTin,
                          "AudName":this.authFormGroup.controls['name'].value,
                          "Taxtp":this.authFormGroup.controls['taxtype'].value,
                          "Lang":this.lang,
                          "Action":this.action
                        }
                        let data=[]
                        let taxType = this.authFormGroup.controls['taxtype'].value;
                        this.selectedReturns.forEach(function(item,index){
                          if(item['ReturnCb'] === 'X' || item['ReturnCb'] === true) {
                            let obj= {
                              __metadata : {
                                id : baseUrlStr+"sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/ActivityDetailSet('')",
                                uri : baseUrlStr+"sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/ActivityDetailSet('')",
                                type : "Z_AUDITORTPLINKING_SRV.ActivityDetail"
                              },
                              Dftval : '01',
                              ReturnYear : item["Persl"],
                              SrNo : "",
                              RelLink : "",
                              ObjectionYear : "",
                              Request : "",
                              Zstatus : ""
                            };
                            data.push(obj);
                            body["Return"] = 'X';
                          }
                        })
                        this.selectedObjections.forEach(function(item,index){
                          if(item['ObjectionCb'] === 'X' ||item['ObjectionCb'] === true) {
                            let obj= {
                              __metadata : {
                                id : baseUrlStr+"sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/ActivityDetailSet('')",
                                uri : baseUrlStr+"sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/ActivityDetailSet('')",
                                type : "Z_AUDITORTPLINKING_SRV.ActivityDetail"
                              },
                              Dftval : '02',
                              ObjectionYear : item["Persl"],
                              SrNo: "",
                              RelLink : "",
                              ReturnYear : "",
                              Request : "",
                              Zstatus :""
                            }

                            data.push(obj);
                            body["Objection"] = 'X';
                          } 
                        });

                        this.otherServiceObjectSet.forEach(function(itemReq, indexReq){
                          if(itemReq.RequestCB === true){
                          let obj= {
                              __metadata : {
                                id : baseUrlStr+"sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/ActivityDetailSet('')",
                                uri : baseUrlStr+"sap/opu/odata/SAP/Z_AUDITORTPLINKING_SRV/ActivityDetailSet('')",
                                type : "Z_AUDITORTPLINKING_SRV.ActivityDetail"
                              },
                              Dftval : '03',
                              Request : itemReq.Fbtyp,
                              SrNo : "",
                              RelLink : "",
                              ReturnYear : "",
                              ObjectionYear : "",
                              Zstatus : ""
                            }
                            data.push(obj);
                            body["Request"] = "X"
                          }
                     
                        });
                        body["ActivityDetailSet"]=data;
                        body["TaxTypSet"] = [];
                        body["RetYearSet"] = [];
                        body["ActivitiesSet"] = [];
                        body["ETServiceSet"] = [];
                        if(this.action =='U'){
                          body["ActvtReassign"] = "X";
                        }
                        this.authService.addAuthorizationRequest(body).subscribe(
                          (res) => {
                               this.optionSlected=0;
                              window.location.reload();     
                          },
                          (err) => {
                            this.notifierService.notify(
                              "error",
                              err.error.error.innererror.errordetails[0].message
                            );
                          }
                        );
                        
                        this.submitted1=false;
                    }                  
            //}
    
    }
    
  }
  changeToggleStatus(event, item,i){
    this.servicesMessage="";
    const chkArray = < FormArray > this.authFormGroup.get('otherServicesControlSet');
    this.otherServiceObjectSet=[]
      let taxType = this.authFormGroup.controls['taxtype'].value;
        if(event.checked == true){
          chkArray.push(new FormControl(item));
        }
        else{
              let i: number = 0;
              chkArray.controls.forEach((element: FormControl) => {
                if (element.value["Zdesc"] == item["Zdesc"]) {
                  chkArray.removeAt(i);
                  return;
                }
                i++;
              });
            }
            chkArray.controls.forEach((element: FormControl) => {
              this.otherServiceObjectSet.push({...element.value,"RequestCB":true})
              });
      this.validateServices();
   }
  getAuthRequests() {
    this.listOfReturnsObjections=[]
    this.listOfTotalReturnsObjections = []
    this.tin = localStorage.getItem("gpart");
    this.authService.getAuthorations(this.tin).subscribe((res) => {
        this.authDbSet=res["d"];
        this.listOfTotalETServices = res["d"]["ETServiceSet"]["results"]
        this.taxtypeSet = res["d"]["TaxTypSet"]["results"]
        this.authRequestsSet = res["d"]["ActivitiesSet"]["results"]
        this.count = this.authRequestsSet.length-1;
        this.listOfTotalReturnsObjections = res["d"]["RetYearSet"]["results"];
        this.resetObjectsReturns();
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    ); 
   }
  tinValidation(event,value) {
    let validTin=false;
    this.tinMsg="";
    let valid = /^[0-9]*$/.test(event.target.value);
    if (!valid) {
      event.target.value = event.target.value.slice(0, -1);
      return false;
    }
    if(value==null ||value==""){
      this.authFormGroup.controls['name'].setValue("")
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError3;
      return false;
    }
    let first = value.substr(0, 1);
    if(value===""){
      this.formErrors=true;
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError3;
      validTin=false;
      return validTin;
    }
    else if(!this.isNumber(parseInt(value))){
      this.formErrors=true;
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError4;
      validTin=false;
      return validTin;
    }
    else if (first !== "1") {
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError1;
      this.formErrors=true;
      validTin=false;
      return validTin;
    }
    else if (value.length != 10) {
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError2;
      this.formErrors=true;
      validTin=false;
      return validTin;
    }
     else {
        this.authService.getAuditorNameByTin(value).subscribe((res) => {
          let tempName=""
          let nameObj =this.nameSet.filter(e=>e["Partner"]===value)
          if(nameObj.length>0){
             tempName = nameObj["0"]["FullName"];
            this.authFormGroup.controls['name'].setValue(tempName)
            validTin=true;
            this.tinErr = false;
            this.nameErr = false;
            return validTin;
          }
          else{
            this.authFormGroup.controls['name'].setValue("")
            this.nameErr = true;
            this.tinErr = true;
            this.tinMsg = this.authErr.inValidTinErr;
            this.nameMsg = this.authErr.namReq;
            this.formErrors=true;
            validTin=false;
          }
         },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.error.innererror.errordetails[0].message
          );
        }
      );
    }
    return validTin;
  }
  tinValidation2(value) {
    let validTin=false;
    this.tinMsg="";
    let first = value.substr(0, 1);
    if(value===""){
      this.formErrors=true;
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError3;
      validTin=false;
      return validTin;
    }
    else if(!this.isNumber(parseInt(value))){
      this.formErrors=true;
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError4;
      validTin=false;
      return validTin;
    }
    else if (first !== "1") {
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError1;
      this.formErrors=true;
      validTin=false;
      return validTin;
    }
    else if (value.length!= 10) {
      this.tinErr = true;
      this.tinMsg = this.authErr.tinError2;
      this.formErrors=true;
      validTin=false;
      return validTin;
    }
    else{
       validTin =true;
       this.tinErr = false;
       return validTin;
    }
  }
  getStyle(statusCode){
     if(statusCode=="IP014"||statusCode=="IP021"||statusCode=="IP016"||statusCode=="IP018"){
      return "Approved";
    }
    else if(status=="Rejected"||status=="معلق"||statusCode=="IP019"){
      return "Rejected";
    }
    else if(status=="Pending"||status=="معلق"||statusCode=="IP015"){
    return "Pending";
    }
  }
  nameValidation2(name){
    let validName=false;
    if (name === "") {
      this.nameErr = true;
      this.nameMsg = this.authErr.namReq;
      this.formErrors=true;
      return false;
    }
    else{
      validName = true;
      return validName;
    }
  }
  nameValidation(name){
    let validName=false;

    if (name.toString().trim() === "") {
      this.authFormGroup.controls['tin'].setValue("");
      this.nameErr = true;
      this.nameMsg = this.authErr.namReq;
      this.tinErr=true;
      this.tinMsg = this.authErr.tinError3;
      this.formErrors=true;
      return false;
    } else {
        let tempTin=""
        let tinObj =this.nameSet.filter(e=>e["FullName"]===name)
        if(tinObj.length>0){
          tempTin=tinObj["0"]["Partner"]

          this.authFormGroup.controls['tin'].setValue(tempTin)
          this.tinErr = false;
          this.nameErr = false;
          validName=true;
        }
        else{
          this.authFormGroup.controls['tin'].setValue("")
          validName=false;
          this.tinErr = true;
          this.tinMsg = this.authErr.tinError3;
          this.formErrors=true;
        }
    }
    return validName;
  }
  changeView(type){
    if(type==="1"){
      this.viewListView =false
    }
    else{
      this.viewListView = true;
    }
    this.viewListView
      ? ((this.img1 = "assets/image/table.svg"),
      (this.img2 = "assets/image/cards-gray.svg"))
      : ((this.img1 = "assets/image/table (1).svg"),
         (this.img2 = "assets/image/cards.svg"));
        }
  deleteRequest(itemToDelete,event){
    event.preventDefault();
    event.stopPropagation();
    this.showBtn =-1;
    let dataTodelete:any;
   if(itemToDelete.RelSnro !==null && itemToDelete.RelSnro !==undefined && itemToDelete.RelSnro !==""){
    dataTodelete =this.authRequestsSet.filter((e)=>e.RelSnro===itemToDelete.RelSnro)
  }
  else{
    dataTodelete =this.authRequestsSet.filter((e)=>e.AuditorTin===itemToDelete.AuditorTin && e.Taxtp===itemToDelete.Taxtp)
  }
    let body={
          TaxpayerTin: localStorage.getItem("gpart"),
           AuditorTin: itemToDelete.AuditorTin, 
           FrmDate: dataTodelete[0]["FrmDate"],
            DateType: dataTodelete[0]["DateType"],
            RelSnro: dataTodelete[0]["RelSnro"],
            Taxtp: dataTodelete[0]["Taxtp"],
            ToDate:dataTodelete[0]["ToDate"] 
    }
     this.authService.deleteAuthorization(body,this.tin,itemToDelete.AuditorTin).subscribe((res) => {
      this.closeModal();
      this.optionSlected=0;
      window.location.reload();     
     },
     (err) => {
       this.notifierService.notify(
         "error",
         err.error.error.innererror.errordetails[0].message
       );
     }
   );
  }
  editRequest(event,item){
    let dat: any;
    let dat2: any;
    this.optionSlected=1;
    this.showBtn =-1;
    event.preventDefault();
    event.stopPropagation();
    this.listUpdatedFlag==true 
    this.action ="U";
    this.authFormGroup.enable()
    this.disableForm=false;
    this.submitted1=false;
    this.tinReadOnly=true;
    this.nameReadOnly=true;
    this.listUpdatedFlag=true;
    this.search=""; 
    this.authFormGroup.get('authStartDate').clearValidators();
    if(item.RelSnro !==null && item.RelSnro !==undefined && item.RelSnro !==""){
      this.editRequestSet =this.authRequestsSet.filter((e)=>e.RelSnro===item.RelSnro)
    }
    else{
      this.editRequestSet =this.authRequestsSet.filter((e)=>e.AuditorTin===item.AuditorTin && e.Taxtp===item.Taxtp)
    } 
    if(this.editRequestSet[0]["Approve"]!=true){
        this.authFormGroup.disable()
        this.disableForm=true;
        this.notifierService.notify(
          "error",
        this.authErr.editErr
      ); 
    }
    this.authFormGroup.controls["taxtype"].setValue(this.editRequestSet[0]["Taxtp"]);
    this.authFormGroup.controls["taxtype"].disable();
    this.authFormGroup.controls["name"].setValue(this.editRequestSet[0]["AudName"]);
    this.authFormGroup.controls["tin"].setValue(this.editRequestSet[0]["AuditorTin"]);
    this.calendarType = (this.editRequestSet[0]["DateType"]==="G")?"Gregorian":"Islamic"
      dat = this.commonValid.dateFormate(
        this.commonValid.toJulianDate( this.getDateFormated(this.editRequestSet[0]["FrmDate"])),
        this.calendarType
      );
      dat2 = this.commonValid.dateFormate(
        this.commonValid.toJulianDate(this.getDateFormated(this.editRequestSet[0]["ToDate"])),
        this.calendarType
      );
      this.authFormGroup.controls["authStartDate"].setValue(dat);
      this.authFormGroup.controls["authEndDate"].setValue(dat2);
      this.taxtype=this.editRequestSet[0]["Taxtp"]
      this.setAuthDetailsData(item);
      this.resetFormValidation();
      for(let element of this.listOfOtherServices){
        if( this.selectedServicesList.includes(element)){
            element["RequestCB"]=true
        }
        else{
          element["RequestCB"]=false
        }
     }
     this.cd.detectChanges();
  }
  getAuditorNameSet(){
    this.authService.getAuditorNames().subscribe(
      (res) => {
        this.nameSet=res["d"]["results"]
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    ); 
  }
  getAuthDetails(event,item){
    this.action = "U";
    var id =  event.target.id
    this.authDetails = item;
     moment.locale('en')
    if(this.lang  == "AR"){
      this.authDetailFrom = moment(item["FrmDate"]).format('YYYY-MM-DD');
      this.authDetailTo = moment(item["ToDate"]).format('DD-MM-YYYY');
     }
    else{
      this.authDetailFrom = moment(item["FrmDate"]).format('YYYY-MM-DD');
      this.authDetailTo = moment(item["ToDate"]).format('YYYY-MM-DD');
    }
     if(id==="MENU"){
      this.optionSlected=0;
    }
    else if (id==="EDIT"){
      this.toggleMenu();
    } else if (id==="DELETE"){
    }else{
      this.optionSlected=2;
      this.setAuthDetailsData(item);
    }
  }
  setAuthDetailsData(authItem){
    this.listOfOtherServices=[]
    this.taxtype = authItem.Taxtp;
        this.listOfOtherServices = this.listOfTotalETServices.filter(e=>e["Taxtp"]===this.taxtype)    
    this.authorizationDetailsObj["ActivitiesSet"]=authItem;
    let tempArr = Object.values( this.authDbSet["ActivityDetailSet"])
    this.listOfReturnsObjections = this.listOfTotalReturnsObjections.filter(e=>e["Taxtp"]===authItem.Taxtp);
    this.authorizationDetailsObj["ActivityDetailSet"] = tempArr["0"].filter(e=>e["RelLink"]===authItem["RelSnro"])
    this.selectedRequestsObjections(authItem);
    this.setSelectedServicesList(authItem);  
  }
  resetObjectsReturns(){
    this.listOfTotalReturnsObjections.forEach(function(item,index){
      item.ReturnCb = false;
      item.ObjectionCb = false;
      item.EnableRetFlg = true;
      item.EnableObjFlg = true;
      if(item.FlagDis === "X"){
        item.ObjCbDis = false;
      } else {
        item.ObjCbDis = true;	
      }
      if(item.Flag == "X"){
        item.RetCbDis = false;						
      } else {
        item.RetCbDis = true;
      }
			if(item.Taxtp === "03"
      || item.Taxtp === "07"){
        item.ObjCbDis = false;
      }
    });
  }
  setSelectedServicesList(authItem){
    const chkArray = < FormArray > this.authFormGroup.get('otherServicesControlSet');
    chkArray.clear()
    this.otherServiceObjectSet=[]
    this.selectedServicesList=[];
    if(authItem!==undefined && authItem!==null && authItem["Request"] == 'X'){
			let fRet = this.authorizationDetailsObj["ActivityDetailSet"].filter(function(item) {
				if(item.Dftval.length === 6){
					return item.Dftval.substring(4,6) === '03';
				} else {
					return item.Dftval === '03';
				}
      });
        for(let item of this.listOfOtherServices){
          for(let matchElement of  fRet){
            if(item["Fbtyp"]===matchElement["Request"])
            {
              this.selectedServicesList.push(item)
              chkArray.push(new FormControl(item));
            }
          }
      }      
    } 
    chkArray.controls.forEach((element: FormControl) => {
        this.otherServiceObjectSet.push({...element.value})
      });
  }
  selectedRequestsObjections(authItem){
    this.selectedReturns=[];
    this.selectedObjections=[];
    if(authItem!==undefined && authItem!==null && authItem["Return"] == 'X'){
			let fRet = this.authorizationDetailsObj["ActivityDetailSet"].filter(function(item) {
				if(item.Dftval.length === 6){
					return item.Dftval.substring(4,6) === '01';
				} else {
					return item.Dftval === '01';
				}

      });
      this.listOfReturnsObjections.forEach(function(item,index){
				let year = item["Persl"];
        fRet.forEach(function(item2,index2){  
					if (year == item2["ReturnYear"]){		
            item["ReturnCb"] = 'X';
						if(item2["Zstatus"] !="IP018")
            item["EnableRetFlg"] = false;
					}
				})
      })
    }
    if(authItem!==undefined && authItem!==null && authItem["Objection"] == 'X'){
			let fRet = this.authorizationDetailsObj["ActivityDetailSet"].filter(function(item) {
				if(item.Dftval.length === 6){
					return item.Dftval.substring(4,6) === '02';
				} else {
					return item.Dftval === '02';
				}
      });
      this.listOfReturnsObjections.forEach(function(item,index){
				let year = item["Persl"];
        fRet.forEach(function(item2,index2){  
					if (year == item2["ObjectionYear"]){		
            item["ObjectionCb"] = 'X';
						if(item2["Zstatus"] !="IP018")
            item["EnableObjFlg"] = false;
					}
				})
      })
    }
    this.selectedReturns = this.listOfReturnsObjections.filter((authorizedReturn)=>  {
      return authorizedReturn["ReturnCb"] === "X" 
    })
    this.selectedObjections = this.listOfReturnsObjections.filter((authorizedReturn)=>  {
      return  authorizedReturn["ObjectionCb"] === "X"
    })
  }
  next(){
    this.action ="X";
    this.authFormGroup.enable()
    this.disableForm=false;
    this.submitted1=false;
    const chkArray = < FormArray > this.authFormGroup.get('otherServicesControlSet');
    while (chkArray.length !== 0) {
      chkArray.removeAt(0)
    }
    this.optionSlected++;
      if(this.optionSlected===1 && this.action ==="X"){
        this.authFormGroup.controls["taxtype"].setValue(undefined);
        this.authFormGroup.controls["name"].setValue('');
        this.authFormGroup.controls["tin"].setValue('');
        this.authFormGroup.controls["authStartDate"].setValue(null);
        this.authFormGroup.controls["authEndDate"].setValue(null);
        this.tinReadOnly=true;
        this.listUpdatedFlag=false;
        this.search=""; 
        this.nameReadOnly=true;
        this.resetFormValidation();
        for(let item of this.listOfOtherServices){
          item["RequestCB"]=false;
        }
        this.listOfOtherServices=[]
        this.selectedServicesList=[];
        this.selectedObjections =[];
        this.selectedReturns =[]
        for(let item of this.listOfReturnsObjections){
          item["ReturnCb"]=false;
          item["ObjectionCb"]=false;
        }
        this.listOfReturnsObjections=[];
       }
      this.cd.detectChanges();
    }
  back() {
    if (this.optionSlected > 0) {
      this.optionSlected=0;
    } else {
      this.router.navigate(['/mains/tax']);
    }
  }
  onSearchMethod(choice){
    this.search =choice;
    if(this.disableForm ===true){
      return;
    }
    else{
          if(this.search==='2'){
            this.tinReadOnly=true;
            this.nameReadOnly=false;
              this.nameIdElement.nativeElement.focus();
          }
          else if (this.search==='1'){
             this.tinReadOnly=false;
            this.nameReadOnly=true;
            this.tinElement.nativeElement.focus();
          }
    }
  }
  onReturnObjection(index,type){
    if(type === "return") {
        if(this.listOfReturnsObjections[index]["ReturnCb"] !=="X" ||!this.listOfReturnsObjections[index]["ReturnCb"]) { 
          this.listOfReturnsObjections[index]["ReturnCb"] = "X"
        }
        else {
          this.listOfReturnsObjections[index]["ReturnCb"] = ""      
        }
      } 
        else {
          if(this.listOfReturnsObjections[index]["ObjectionCb"] !=="X"  || !this.listOfReturnsObjections[index]["ObjectionCb"]) { 
          this.listOfReturnsObjections[index]["ObjectionCb"] = "X"              
        }
        else {
          this.listOfReturnsObjections[index]["ObjectionCb"] = ""     
        }
      }
       this.selectedReturns = this.listOfReturnsObjections.filter((authorizedReturn)=>  {
        return authorizedReturn["ReturnCb"] === "X" 
      })
      this.selectedObjections = this.listOfReturnsObjections.filter((authorizedReturn)=>  {
        return  authorizedReturn["ObjectionCb"] === "X"
      })
     
      this.validateServices();
    }
  onTaxtTypeChange(event){
    this.taxtype = event.value;
  if(this.listUpdatedFlag==true){
    const chkArray = < FormArray > this.authFormGroup.get('otherServicesControlSet');
    this.authFormGroup.enable()
    this.disableForm=false;
    this.formErrors=false;  
    this.resetFormValidation();
    this.authFormGroup.controls["name"].setValue('');
    this.authFormGroup.controls["tin"].setValue('');
    this.authFormGroup.controls["authStartDate"].setValue(null);
    this.authFormGroup.controls["authEndDate"].setValue(null);
    this.tinReadOnly=true;
    this.nameReadOnly=true;
    this.listOfReturnsObjections=[];
    while (chkArray.length !== 0) {
      chkArray.removeAt(0)
    }
     for(let item of this.listOfOtherServices){
          item["RequestCB"]=false
        }
        for(let item of this.listOfTotalReturnsObjections){
          item.ReturnCb = false;
          item.ObjectionCb = false;
        }
      this.listOfOtherServices = this.listOfTotalETServices.filter(e=>e["Taxtp"]===this.taxtype);
      this.listOfReturnsObjections = this.listOfTotalReturnsObjections.filter(e=>e["Taxtp"]===this.taxtype);
      this.cd.detectChanges();
  }
  else{
        this.listOfOtherServices = this.listOfTotalETServices.filter(e=>e["Taxtp"]===this.taxtype);
        this.listOfReturnsObjections = this.listOfTotalReturnsObjections.filter(e=>e["Taxtp"]===this.taxtype);
        this.listUpdatedFlag=true;
        this.cd.detectChanges();  
  }
  if(this.taxtype === "03"
  || this.taxtype === "07"){
    this.listOfReturnsObjections.forEach(function(item,index){
    item.ObjCbDis = false;
  });
  } else {
          this.listOfReturnsObjections.forEach(function(item,index){
          item.ObjCbDis = true;
    });
  }
}
  show(id,event){
    event.preventDefault();
    event.stopPropagation();
   if(this.showBtn>=0 && this.showBtn===id){
     this.showBtn =-1;
   }
   else{
    this.showBtn =id;
   }
  }
  private getDate(field: any) {
    if (!field.value) {
      return null;
    }
    let dt = {
      year: (<CalendarDate>field.value.calendarStart).year,
      month: (<CalendarDate>field.value.calendarStart).month,
      day: (<CalendarDate>field.value.calendarStart).day,
    };
    if (field.value.calendarName === "Islamic") {
      let convertedDate = toGregorian(dt.year, dt.month, dt.day);
      dt = {
        year: convertedDate.gy,
        month: convertedDate.gm,
        day: convertedDate.gd,
      };
    }
    return  moment( new Date(dt.year,dt.month-1,dt.day));
  }

  private getFromDate() {
    return this.getDate(this.authFormGroup.controls.authStartDate);
  }

  private getToDate() {
    return this.getDate(this.authFormGroup.controls.authEndDate);
  }
  public validateDate() {
    let isFormValid=true;
    this.endDateErr=false;
    this.authFormGroup.controls.authEndDate.setErrors(null);
    this.authFormGroup.controls.authStartDate.setErrors(null);
    if(this.authFormGroup.controls.authStartDate.value==null ||
       this.authFormGroup.controls.authStartDate.value==undefined){
        isFormValid=false;
        this.formErrors = true;
        this.authFormGroup.controls.authStartDate.setErrors({
            invalid: true,
        });
      return isFormValid;
    }
    if(this.authFormGroup.controls.authEndDate.value==null ||
       this.authFormGroup.controls.authEndDate.value==undefined){
      isFormValid=false;
      this.formErrors = true;
      this.authFormGroup.controls.authEndDate.setErrors({
        invalid: true,
      });
      return isFormValid;
    }
      else {
              this.calendarType=this.authFormGroup.value.authStartDate.calendarName
              let date1 = this.getFromDate();
              let date2 = this.getToDate();
              if (date1 == null || date2 ==null){
                this.formErrors = true;
                this.endDateErr=true;
                this.authFormGroup.controls.authEndDate.setErrors({
                  invalid: true,
                });
                return isFormValid;
              }
              if( date1> date2){
                this.endDateErr=true;
                this.formErrors = true;
                isFormValid=false;
                this.authFormGroup.controls.authEndDate.setErrors({
                  invalid: true,
                });
                return isFormValid;
              }
        }
    return isFormValid;
  }
  public validateServices(){
    let isFormValid = true;
    this.formErrors = false;
    this.authFormGroup.get('otherServicesControlSet').setErrors(null);
    const chkArray = < FormArray > this.authFormGroup.get('otherServicesControlSet');
    if(chkArray.length==0 && this.selectedObjections.length==0 && this.selectedReturns.length==0){
      this.formErrors = true;
      this.servicesMessage=this.authErr.servicesErr
      this.authFormGroup.get('otherServicesControlSet').setErrors({
        invalid: true,
      });
      isFormValid=false;  
      return isFormValid;
    }
    return isFormValid;
  }
  toggleMenu(){
    this.showBtn =-1;
  }
  getDateFormated(value) {
    let val = value.substring(value.indexOf("(") + 1);
    val = val.substring(0, val.indexOf(")"));
    return new Date(parseInt(val));
  }
  isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }
 
  getDisabledTinClass(){
      if(this.tinReadOnly===true){
        return "commonInput:disabled"
      }
  }
  deleteModal(item,event){
    event.preventDefault();
    event.stopPropagation(); 
    this.itemToDelete = item;
    $("#DELETE_MODEL").modal("show");
    this.showBtn =-1;
  }

  getLocaleString(data){
    if(data!==null && data!==undefined)
      {
        moment.locale(localStorage.getItem("lang"))
        return  moment(new Date(data)).format("Do MMM YYYY")
      }
    else{
        return ''
    }
  }
  closeModal() {
      $("#DELETE_MODEL").modal("toggle");
  }
  getDisabledNameClass(){
    if(this.nameReadOnly===true){
      return "commonInput:disabled"
    }
  } 
  chanangeDateAdapter(origin: "from" | "to", picker?: any) {
    picker.close();
    let fromCalendarValue = this.authFormGroup.controls.authStartDate.value ;
    let toCalendarValue = this.authFormGroup.controls.authEndDate.value;
    if(!this.authFormGroup.value.authStartDate || !this.authFormGroup.value.authEndDate)
    {
      return;
    }
    let fromCalendarName =this.authFormGroup.value.authStartDate.calendarName
    let toCalendarName =  this.authFormGroup.value.authEndDate.calendarName;
    if(fromCalendarName===toCalendarName){
      return;
    }
      if(origin==="to"){
        if (this.authFormGroup.controls.authStartDate.value !== null) {
          fromCalendarValue = this.commonValid.dateFormate(
            fromCalendarValue,
            toCalendarName
          );
            this.authFormGroup.controls["authStartDate"].setValue(fromCalendarValue);          
        }
      }
      else{
        if (this.authFormGroup.controls.authEndDate.value != null) {
          toCalendarValue = this.commonValid.dateFormate(
            toCalendarValue,
            fromCalendarName
          );
            this.authFormGroup.controls["authEndDate"].setValue(toCalendarValue);          
        }       
      }
      this.cd.detectChanges();
  }
  spaceValidator = (event: any) => {
    let value = /^[0-9]*$/.test(event.target.value);
    if (!value) {
      event.target.value = event.target.value.slice(0, -1);
    }
  };
  private _filter(value: string) {
    const filterValue = value.toString().toLowerCase();
    return Object.assign([],this.nameSet).filter(option => option.FullName.toString().toLowerCase().includes(filterValue));
  }
  getTinErrorStyle(){
    return ((this.submitted1 || this.authFormGroup.controls.tin.touched) && this.tinErr)?'inputErr':
    ''
  }
  getNameErrorStyle(){
    return ((this.submitted1 || this.authFormGroup.controls.name.touched)  &&
     this.authFormGroup.controls.name.errors  && this.nameErr)?'inputErr':
     ''
  }
  getTxTypeErrorStyle(){
    return (this.submitted1 && this.authFormGroup.controls.taxtype.errors )?'inputErr':
    ''
    }
  getDateErrorStyle(){
      return (this.submitted1 && (this.authFormGroup.controls.authStartDate.errors || 
        this.authFormGroup.controls.authEndDate.errors))?'inputErr':
         ''
  }
  getListErrorStyle(){
    return (this.submitted1 && this.authFormGroup.controls.otherServicesControlSet.errors )?'inputErr':
    ''
  }
}
