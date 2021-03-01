import { Component, OnInit } from "@angular/core";
import { userManagementConstants } from "./../../constants/userManagement.constants";
import { UserManagementService } from "src/app/services/user-management.service";
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';



declare var $: any;

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements OnInit {
//#region  variable
  lang = userManagementConstants.eng;
  direction = "ltr";
  umConstants = userManagementConstants;
  selectedAuthUserNo = null;
  viewToggler = false
  userMgmtMenu = false;
  public authUrsNm: any;
  activateMember="";
  deactivateMember="";
  getUserResponse: any=[];
  getUserResponseInactive: any=[];
  getUserResponseAll=[];
  getUserResponseDisplayVar=[]
  test_array = [];
  view = "grid";
  public clickTracker = "";
  public userNameVar: any;
  activeBadge: string
  inactiveBadge: any
  wrapperArray: any = []
  NoOfUsers: any = {};
  IDset = [];
  actualIDSet: any = [];
  branchSet: any = [];
  branchList=[];
  evalus = {};
  taskallocUsersArray=[];
  filt=[];
  indexFound:any;
  list ="";
  uniqueChars:any = [];
  isActive = 0;
  selectedUserIndex = null;

  
//#endregion

//#region constructor
  constructor(public UserManagementService: UserManagementService, private router: Router, public notifierService: NotifierService) {

  }
  //#endregion

  //#region Methods
  ngOnInit(): void {
 
    this.getTaskAllocAllUsers()
    // Get fbguuid
    this.getFgbuid()
    // Set default tab to All Users on component mount
    this.clickTracker = "all";
    // Handle language
    if (localStorage["lang"] === "ar") {
      this.direction = "rtl";
      this.lang = userManagementConstants.arb;
      //Task alloc arabic
      this.activateMember=this.lang['activateUser'];
      this.deactivateMember=this.lang['deactivateUser'];
      // Handle conversion of Active and Inactive badges
      this.activeBadge=this.lang['activeTag'];
      this.inactiveBadge=this.lang['inActiveTag'];
     }
    else {
      this.lang = userManagementConstants.eng;
      this.activeBadge=this.lang['activeTag'];
      this.inactiveBadge=this.lang['inActiveTag'];
      this.activateMember=this.lang['activateUser'];
      this.deactivateMember=this.lang['deactivateUser'];
    }
    this.userNameVar = localStorage["gpart"]
    this.getUserInfo(this.userNameVar); 
  }

  //Add user nav
  addUserNav() {
    this.router.navigate(['/mains/adduser'])
  }
  navigateToProfile() {
    this.router.navigate(['/mains/profile'])
  }
  navigateToUsermanagement() {
    this.router.navigate(['/mains/usermanagement'])
  }
  //navigateToUsermanagement
  // Open user Nav
  openUserDetails(authUsr, name ,branch) {
    this.router.navigate(['/mains/userdetails'], { queryParams: { page: authUsr, name: name, branch:branch} })

  }

  //Activate user
  activateUserMenu(event, index, authUserNo) {
    if (this.selectedUserIndex === index) {
      this.selectedUserIndex = null;
    } else {
      this.selectedUserIndex = index
    }
    event.stopPropagation()
    if (this.selectedAuthUserNo == authUserNo) {
      this.selectedAuthUserNo = null;
    } else {
      this.selectedAuthUserNo = authUserNo;
    }
  }

  // API integration vars

  filterActive() {
    this.selectedAuthUserNo = null;
    this.selectedUserIndex = null;
    this.getUserResponseDisplayVar = this.getUserResponse

    this.clickTracker = "active";
  }

  filterAll() {
    this.selectedAuthUserNo = null;
    this.selectedUserIndex = null;
    this.getUserResponseDisplayVar = this.getUserResponseAll
    this.clickTracker = "all";
  }

  filterInactive() {
    this.selectedAuthUserNo = null;
    this.selectedUserIndex = null;
    this.getUserResponseDisplayVar = this.getUserResponseInactive
    this.clickTracker = "inactive";
  }
  //Activate deleted user
  activateUser(authUsrNo, idType, idNumber, mobileNo, name) {

    this.UserManagementService.addDeletedUser(authUsrNo, idType, idNumber, mobileNo, name).subscribe(res => {
      this.selectedAuthUserNo = null;
      this.selectedUserIndex = null
      this.userNameVar = localStorage["gpart"]
      this.getUserInfo(this.userNameVar); 
      // this.notifierService.notify("success",   localStorage['lang'] == 'ar' ? userManagementConstants['userSuccessfullyActivated']['arb'] : userManagementConstants['userSuccessfullyActivated']['eng'])
      this.notifierService.notify("success", this.lang['userSuccessfullyActivated'] )
    }, err => {
      this.notifierService.notify("error", err["error"]["error"]["innererror"]["errordetails"][0]["message"])

    })
  }
  // Delete user function
  deleteUser(authId, idNumber, emailId, userNo, branchNo) {


    this.UserManagementService.deActivateUser(authId, idNumber, emailId, userNo, branchNo).subscribe(res => {
      this.userNameVar = localStorage["gpart"]
      this.closeModal('dialogueboxUserDeactivate')
      this.selectedAuthUserNo = null
      this.selectedUserIndex = null
      this.getUserInfo(this.userNameVar); //pass username into get user api function
      this.notifierService.notify("success", localStorage['lang'] == 'ar' ? this.umConstants['arb']['userSuccessfullyDeleted'] : this.umConstants['eng']['userSuccessfullyDeleted'])

    }, err => {
      this.notifierService.notify("error",err["error"]["error"]["innererror"]["errordetails"][0]["message"])
    })
  }

  goToTaskAlloc(event, authUsri, name) {
    event.stopPropagation();
    this.router.navigate(['/mains/taskallocation'], { queryParams: { page: authUsri, name: name } })
    this.selectedUserIndex = null;
  }

  //params for post new user api
  getUserInfo(userName) {

    this.UserManagementService.getInitialData(userName).subscribe((res) => {
      this.getDelUsers()
      if(res !=null && res["d"]!=null)
      {
        if(res["d"]["UserSet"]!=null && res["d"]["UserSet"]["results"]!=null)
        {
          this.getUserResponse = res["d"]["UserSet"]["results"];
        }
        if(res["d"]["UserBranchSet"]!=null && res["d"]["UserBranchSet"]["results"]!=null)
        {
          this.branchList =  res["d"]["UserBranchSet"]['results']
        }
        if(res["d"]["IdSet"]!=null && res["d"]["IdSet"]["results"]!=null)
        {
          this.IDset = res["d"]["IdSet"]["results"]
          for (let i = 0; i < this.IDset.length; i++) {
            let temp_id = res["d"]["IdSet"]["results"][i]["Text"]
            this.actualIDSet[i] = temp_id
            localStorage.setItem("Id_Set", this.actualIDSet)
          }
        
        }
        // For loop to get ID set
      }
     
    }, (err) => {

    })
  }

  //Get fbgUUID api1
  getFgbuid() {
    this.UserManagementService.getFbgUid().subscribe(res => {
      if(res!=null && res["d"]!=null)
      {
        this.getFgbuid2(res["d"]["Val1"], res["d"]["Val2"], res["d"]["Val3"], res["d"]["Val4"], res["d"]["Val5"]);
      }
    }, err => {

    })
  }

  // Get all users from task alloc
  getTaskAllocAllUsers() {
    this.UserManagementService.getTaskAllocAllUsers(localStorage['fn'],localStorage['eu']).subscribe(res =>{
      if(res!=null && res['d']!=null && res['d']['UserSet']!=null &&res['d']['UserSet']['results']!=null)
      {
        this.taskallocUsersArray = res['d']['UserSet']['results']
      }
      else
      {
        this.taskallocUsersArray = [];
      }
      
    },err=> {

    })
  }

 getFgbuid2(euser1, euser2, euser3, euser4,euser5) {
    this.UserManagementService.getFbgUid2(euser1, euser2, euser3, euser4,euser5).subscribe(res => {
      localStorage.setItem("fn", res["d"]["Fbguid"])
      localStorage.setItem("eu", res["d"]["Euser"])
     }, err => {

    })
  }

  getDelUsers() {

    this.UserManagementService.getDeletedUsers().subscribe(res => {
      if(res!=null && res['d']!=null&& res['d']['results']!=null)
      {
        this.getUserResponseInactive = res['d']['results']
      }
      else
      {
        this.getUserResponseInactive=[];
      }
     
      // Add an extra key called inactive to differenciate inactive users
      for (let i = 0; i < this.getUserResponseInactive.length; i++) {
        this.getUserResponseInactive[i]["status"] = false
        // Status == flase => Inactive user
      }
      //concat dell users to active users after api success
      this.getUserResponseAll = this.getUserResponse
      // Add key to active users called status
      if (this.getUserResponse != undefined) {
        for (let i = 0; i < this.getUserResponse.length; i++) {
          this.getUserResponse[i]["status"] = true
        }
      }

      // Add key to inactive users called status
      for (let i = 0; i < this.getUserResponseInactive.length; i++) {
        this.getUserResponseInactive[i]["status"] = false
        // Branch name is not coming from deleted uses only branch no. Converting... to name
        let temp_branch_id = this.getUserResponseInactive[i]['Branch']
        let inactiveBranchIndex = this.branchList.findIndex((index) => index['BranchNo'] == temp_branch_id)
        this.getUserResponseInactive[i]['Branch'] = this.branchList[inactiveBranchIndex]['BranchNm']
      }

      // Combine both lists
      this.getUserResponseAll = [...this.getUserResponse, ...this.getUserResponseInactive]
      this.getUserResponseDisplayVar = this.getUserResponseAll
      // Create Noof users list and make everything false by default
      for (let i = 0; i < this.getUserResponseAll.length; i++) {
        this.NoOfUsers[i] = false;
      }
      // Add key from task alloc api result for allocated services and
     
      for(let i =0;i<this.getUserResponseDisplayVar.length;i++){
        let authUserNofromDisplayVar = this.getUserResponseDisplayVar[i]['AuthUsrno']
        this.indexFound = this.taskallocUsersArray.findIndex((index) => index['AuthUsrno'] === authUserNofromDisplayVar)
        let uniqueChars:any = []
        if(this.indexFound >= 0) {
          this.filt = this.taskallocUsersArray.filter((record)=> record['AuthUsrno'] == authUserNofromDisplayVar)
          // Once index is found, extract using for loop and append into CSVs
          this.list = ""
            for(let k=0;k<this.filt.length;k++) {
                this.list = this.list + this.filt[k]['LinkedActivity']+ (k !== this.filt.length -1 ? ", " : "")
            }
          
           //Split result into array
        let new_list = this.list.split(",")
        uniqueChars = [...new Set(new_list)];
        }
        this.getUserResponseDisplayVar[i]['linked'] = uniqueChars.join(", " )
      }

      // Check which tab is the page on 
      if (this.clickTracker == 'all') {
        this.getUserResponseDisplayVar = this.getUserResponseAll
      }
      if (this.clickTracker == 'active') {
        this.getUserResponseDisplayVar = this.getUserResponse
      }
      if (this.clickTracker == 'inactive') {
        this.getUserResponseDisplayVar = this.getUserResponseInactive
      }


    }, err => { 

     })

  }

  // Handle Modal
  getModal(event, cardType) {
    event.stopPropagation();
    const status = this.getUserResponseDisplayVar[this.selectedUserIndex]['status']
    if (!status) {
      this.modalConfirm();
      this.selectedAuthUserNo=null;
      this.selectedUserIndex=null;
      return false;
    }
    if (cardType === 'dialogueboxUserDeactivate') {
      this.isActive = 1;
      ($('#dialogueboxUserDeactivate') as any).modal('show');


    }
 
  }

  goToDash() {
    this.router.navigate(['/mains/dshboard'])
  }

  modalConfirm() {
    let user = this.getUserResponseDisplayVar[this.selectedUserIndex]
    if (!user['status']) {
      this.activateUser(user['AuthUsrno'], user['IdType'], user['IdNumber'], user['Mobileno'], user['Name'])
    } else {
      this.deleteUser(user['AuthUsrno'],
      user['IdNumber'],
      user['Emailid'],
      user['UserNo'],
      user['BranchNo'])
    }
  }


  //close modal function
  closeModal(cardType) {
    if (cardType === 'dialogueboxUserDeactivate') {
      $('#dialogueboxUserDeactivate').modal('toggle');
      this.selectedAuthUserNo = null
      this.selectedUserIndex = null;
    }
  }


  toggleCardView(event) {
    this.viewToggler = !this.viewToggler
    if(event.currentTarget.id == 'grid'){
    }
    else {
    }
  }

  // Got o profile
  gotoProfile() {
    this.router.navigate(['/mains/profile'])
  }
//#endregion
}
