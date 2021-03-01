import { Component, OnInit } from '@angular/core';
import { assUserConstants } from 'src/app/constants/addUser.constants';
import {Router} from "@angular/router"
import { FormArray, FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import {UserManagementService} from "src/app/services/user-management.service";
import { CalendarComponent } from "src/app/constants/calendar.component";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  // Constants
  addUserConstants = assUserConstants
  direction = 'ltr'
  form = new FormGroup({
    idNo: new FormControl('',[Validators.required,]),
    idType: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    dob: new FormControl('',[Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^5[0-9]{8}$/)]),
    email: new FormControl('',[Validators.email, Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
  })
  formGroupValidator = false
  headerComponent = CalendarComponent;
  getUserResponse: any;
  getUserResponseInactive: any;
  getUserResponseAll
  getUserResponseDisplayVar: any = []
  IDset
  actualIDSet: any = [];
  queryParam
  queryParamName
  queryParamBranch;
  userRenderData
  dat = {
    "IdType": "",
    "IdNumber": "",
    "Name": "",
    "Dob": "",
    "Emailid": "",
    "Mobileno": "",
    "Branch": "",
    "BranchNo": "",
    "UserNo": "",

  }
  branch_index_var

  constructor(private router: Router, public UserManagementService:UserManagementService,private activatedRoute: ActivatedRoute,public notifierService: NotifierService  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      console.log(data);
      this.queryParam = data["page"]
      this.queryParamName = data["name"]
      this.queryParamBranch=data["Branch"]
      console.log(this.queryParamName)
    });
 
   }

   mobNoShouldStartWithFive = localStorage['lang'] == 'ar' ? assUserConstants.mobileShouldStartwith5['arb'] : assUserConstants.mobileShouldStartwith5['eng'] 
   pleaseEnterMobile = localStorage['lang'] == 'ar' ? assUserConstants.pleaseEnterMobile['arb'] : assUserConstants.pleaseEnterMobile['eng'] 

  formGroupVaidator = false
  ngOnInit(): void {
    if (localStorage["lang"] === "ar") {
      
      this.direction = "rtl";
    }
    //Get deleted users and active users and construct array
    this.getUserInfo(localStorage['gpart'])
    //Get branch details
    this.branchAPI()
  }
    // Go back to userdetails
    gotoUserDetails() {
      this.router.navigate(['/mains/userdetails'],  { queryParams: { page: this.queryParam, name: this.queryParamName , branch: this.queryParamBranch} })
    }

    // Get branch
    new_branch = []
    branchAPI() {
      console.log("Entered branch ai")
      let a = localStorage['fn']
      console.log(a)
      let b = localStorage['eu']
      console.log(b)
  
      this.UserManagementService.getTaskAllocAllUsers(a,b).subscribe(res => {
        console.log(res)
        this.new_branch = res["d"]["AllBranchesSet"]["results"]
      },err => {console.log(err)})
    }

    // Submit
    submit() {

    }

    // Name validator
  nameValidator(event){
    let value = /^[a-z A-Z \s]*$/.test(event.target.value);
    console.log(value);
    if (!value) {
      event.target.value = event.target.value.slice(0, -1);
    }
  }

  // Number Valiator
  numberValidator(event){
    // let value = /^[0-9]*$/.test(event.target.value);
    // console.log(value);
    // if (!value) {
    //   event.target.value = event.target.value.slice(0, -1);
    // }
    // if(event.target.value.length == 14 ) {
    //   event.target.value = event.target.value.slice(0, -1);
    // }
    this.form.controls['phone'].setValue(event.target.value.replace(/[^0-9]/g, ""))
    event.target.value = event.target.replace(/[^0-9]/g, "")
  }

  // Get all users
  getUserInfo(i) {
    console.log("tracker is ",)
    console.log("getting user ingo..")
    this.UserManagementService.getInitialData(i).subscribe((res) => {
      this.getDelUsers()
      console.log(res)
      this.getUserResponse = res["d"]["UserSet"]["results"];
      console.log(this.getUserResponse)
      this.IDset = res["d"]["IdSet"]["results"]
      // For loop to get ID set
      for (let i = 0; i < this.IDset.length; i++) {
        let temp_id = res["d"]["IdSet"]["results"][i]["Text"]
        this.actualIDSet[i] = temp_id
        localStorage.setItem("Id_Set", this.actualIDSet)
      }
      console.log(this.actualIDSet)
    }, (err) => {
      console.log(err);
    })
  }

  // Get deleted users and build 
  getDelUsers() {

    this.UserManagementService.getDeletedUsers().subscribe(res => {
      console.log(res)
      this.getUserResponseInactive = res['d']['results']
      // Add an extra key called inactive to differenciate inactive users
      for (let i = 0; i < this.getUserResponseInactive.length; i++) {
        this.getUserResponseInactive[i]["status"] = false
        // Status == flase => Inactive user
      }
      console.log(this.getUserResponseInactive)
      console.log(this.getUserResponseInactive.length)
      //concat dell users to active users after api success
      this.getUserResponseAll = this.getUserResponse
      console.log(this.getUserResponseAll)
      // Add key to active users called status
      if (this.getUserResponse != undefined) {
        for (let i = 0; i < this.getUserResponse.length; i++) {
          this.getUserResponse[i]["status"] = true
        }
      }

      // Add key to inactive users called status

      for (let i = 0; i < this.getUserResponseInactive.length; i++) {
        this.getUserResponseInactive[i]["status"] = false
      }

      // Combine both lists
      console.log(this.getUserResponseInactive)
      this.getUserResponseAll = [...this.getUserResponse, ...this.getUserResponseInactive]
      this.getUserResponseDisplayVar = this.getUserResponseAll
      // Find index of user on page
      this.findIndexOfUserfromQueryParams()

      // // Create Noof users list and make everything false by default
      // for (let i = 0; i < this.getUserResponseAll.length; i++) {
      //   console.log("making false")
      // }
      console.log(this.getUserResponseDisplayVar);
    }, err => { console.log(err) })

  }

  // Old aSPformat converted for date
  getDateFromAspNetFormat(date: string): number {
    const re = /-?\d+/;
    const m = re.exec(date);
    return parseInt(m[0], 10);
} 

  // Find user index and then prefill fform
  // Convert DOB to correct format and create date
  findIndexOfUserfromQueryParams() {
    // let index = this.getUserResponseDisplayVar.findIndex((index) => index['AuthUsrno'] === this.queryParam)
    let index = this.getUserResponseDisplayVar.findIndex((index) => index["AuthUsrno"] === this.queryParam)
    console.log(index)
    console.log(this.queryParam)
    // Use index found to set Render Variable for form
    this.userRenderData = this.getUserResponseDisplayVar[index]
    console.log(this.userRenderData)
    this.form.controls['name'].setValue(this.userRenderData['Name'])
    this.form.controls['idNo'].setValue(this.userRenderData['IdNumber'])
    // let mob = this.userRenderData['Mobileno']

    //this.form.controls['phone'].setValue(this.userRenderData['Mobileno'].slice(5))
    
    
    this.form.controls['phone'].setValue(this.userRenderData['Mobileno'])
   if (this.userRenderData['Mobileno'].length>9)
   {
     this.form.controls['phone'].setValue(this.userRenderData['Mobileno'].slice(5))
   }
    this.form.controls['email'].setValue(this.userRenderData['Emailid'])
    let id_tye = this.userRenderData['IdType']
    console.log(this.userRenderData['IdType'][this.userRenderData['IdType'].length -1])
    if(this.userRenderData['IdType'][this.userRenderData['IdType'].length -1] == 3) {
      console.log("gcc")
      this.form.controls['idType'].setValue('GCC ID')
    }
    if(this.userRenderData['IdType'][this.userRenderData['IdType'].length -1] == 2) {
      console.log("gcc")
      this.form.controls['idType'].setValue('Iquama ID')
    }
    if(this.userRenderData['IdType'][this.userRenderData['IdType'].length -1] == 1) {
      console.log("gcc")
      this.form.controls['idType'].setValue('National ID')
    }
    //Convert date into new format
    let converted_date = this.getDateFromAspNetFormat(this.userRenderData['Dob'])
    let new_date  = new Date(converted_date) 
    var datestring = new_date.getDate()  + "-" + (new_date.getMonth()+1) + "-" + new_date.getFullYear()
    this.form.controls['dob'].setValue(datestring)
    console.log(datestring)

    //Get branch index and make default selection
    console.log(this.new_branch)
    let branch_index = this.new_branch.findIndex((index)=> index["BranchNm"] == this.userRenderData['Branch'])
    this.branch_index_var = branch_index // local var for form submit reference - index of branch to get from new_branch
    console.log(branch_index)
    this.form.controls['branch'].setValue(branch_index)  
  } 
  // Post edited user
  navigateToProfile() {
    this.router.navigate(['/mains/profile'])
  }
  navigateToUsermanagement() {
    this.router.navigate(['/mains/usermanagement'])
  } 
  postUser() {

    if(this.form.valid){

    let dat = {
    "AuthUsrno": this.queryParam,
    "Name": this.form.controls['name'].value,
    "Emailid": this.form.controls['email'].value,
    "Mobileno": "00966" + this.form.controls['phone'].value,
    "Branch":  this.new_branch[this.form.controls['branch'].value]['BranchNm'],
    "UserNo": localStorage['gpart'],
    "BranchNo": this.new_branch[this.form.controls['branch'].value]['BranchNo'],
    "Login": "",
    "DeleteUsr": ""
    }
    console.log(dat)

    this.UserManagementService.updateUser(dat).subscribe(res => {
      console.log(res)
      this.queryParamName = dat['Name']
      this.queryParamBranch=dat["Branch"]
      this.notifierService.notify("success", localStorage['lang'] ==='ar' ? this.addUserConstants['successEdit']['arb']: this.addUserConstants['successEdit']['eng'])

      setTimeout(() => {
        console.log(this.router)
        this.router.navigate(["mains/userdetails"],{ queryParams: { page: this.queryParam, name: this.queryParamName , branch: this.queryParamBranch} })
      },3000)

    }, err => {
      console.log(err)
      this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"])

    })
    }
    else {
      console.log("invalid form..")
     this.formGroupValidator = true
    }
  }
  
}
