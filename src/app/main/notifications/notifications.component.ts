import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { CorrespondanceService } from 'src/app/services/correspondance.service';
import { DashboardService } from 'src/app/services/dashboard-service';
import { correspondanceConstants } from '../../constants/correspondanceConstants';
import { constants } from "src/app/constants/constants.model";
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  lang: string;

  correspondanceConstants;


  filteredList = [];

  selectedMessages = [];

  selectAll: boolean = false;

  viewMessage = null;

  viewMessageIndex: number;

  searchFilter: string = '';

  notifications: any = [];
  tin: any;
  language;
  setFavoriteFilter: boolean = false;

  pathList: any = ['/mains/newvat', '', '/mains/tax', '/mains/returns/search'];

  direction: string = "ltr";
  constructor(public dashboardService: DashboardService, public notifierService: NotifierService, private router: Router, private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    moment.locale('en');
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'ar';
      this.language = constants.langz.arb;

      this.direction = "rtl";
    } else {
      this.language = constants.langz.eng;
      this.lang = 'en';
      this.direction = "ltr";
    }
    this.tin = localStorage.getItem("gpart");
    this.correspondanceConstants = correspondanceConstants;

    this.getNotifications();
  }
  public notificationsList: any = [];
  getNotifications() {
    this.dashboardService.getInboxNotifications(this.tin).subscribe((res) => {
      //this.notificationsList = res["d"]["results"];
      let responseNotifList = res["d"]["results"];
      this.notificationsList = this.tranformNotificationsList(responseNotifList);
      this.filteredList = this.notificationsList.slice();
    }, (err) => {
    });
  }
  onSearchNotifications() {
    this.viewMessage = null;
    this.viewMessageIndex = null;
    this.selectedNotification = {};
    if (this.searchFilter) {
      const list = this.notificationsList.filter(
        (item) => item.title.search(new RegExp(this.searchFilter, 'i')) > -1
      );
      this.filteredList = list;
    } else {
      this.filteredList = this.notificationsList.slice();
    }
  }


  private notificationTypes: any = ["01", "02", "03", "04"];
  tranformNotificationsList(notificationsList: any = []) {
    let transformedNotificaitonsList = [];
    //transformedNotificaitonsList = notificationsList.slice();
    notificationsList.forEach((notification) => {
      notification.timeStamp = +notification.Begda.replace(/\D/g, '');
    });
    notificationsList = this.orderPipe.transform(notificationsList, 'timeStamp', true);
    this.notificationTypes.forEach((notificationType) => {
      let notificationObj = this.getRecentNotificationObj(notificationsList, notificationType);
      if (notificationObj) {
        transformedNotificaitonsList.push(notificationObj);
      }
    });
    transformedNotificaitonsList = this.orderPipe.transform(transformedNotificaitonsList, 'timeStamp', true);
    transformedNotificaitonsList.forEach((notification) => {
      let notifIndex = this.getNotificationTypeIndex(notification.NotifTy);
      notification.title = this.language.notifications[notifIndex].title;
      notification.description = this.language.notifications[notifIndex].description;
      let datestr = notification.Begda;
      notification.date = datestr.replace(/\D/g, '');
      notification.dateStr = moment(Number(notification.date)).format("DD-MMM-YYYY");

      let timeStr=notification.Ctime;
      timeStr=`${moment(
        timeStr.replace(/\D/g, ''),
        'hhmmss'
      ).format('hh:mm a')}`;
      notification.timeStr=timeStr;
    });
    return transformedNotificaitonsList || [];
  }

  getRecentNotificationObj(NotificationsList: any = [], notificationType: string = "") {
    let results = NotificationsList.filter((notification) => {
      return (notification.NotifTy == notificationType);
    });
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  }

  getNotificationTypeIndex(notificationType) {
    if (notificationType == '01') {
      return 0;
    } else if (notificationType == '02') {
      return 1;
    } else if (notificationType == '03') {
      return 2;
    } else if (notificationType == '04') {
      return 3;
    }
  }

  public selectedNotification: any = {};
  onNotificationSelect(i, notification) {
    this.viewMessageIndex = i;
    this.viewMessage = notification;
    this.selectedNotification = notification;
    if (notification.NotifRead != "X") {
      this.markNotificationAsRead(notification);
    }
  }
  getImageURL(notification) {
    let imageURL = "assets/images/inbox/arrow-right.svg";
    if (this.selectedNotification.CaseGuid == notification.CaseGuid) {
      imageURL = "assets/images/inbox/arrow-right-white.svg";
    }
    return imageURL;
  }

  markNotificationAsRead(notification) {
    let deleteNotifObj = Object.assign({}, notification);
    delete deleteNotifObj["__metadata"];
    delete deleteNotifObj.title;
    delete deleteNotifObj.description;
    delete deleteNotifObj.path;
    delete deleteNotifObj.date;
    delete deleteNotifObj.dateStr;
    delete deleteNotifObj.timeStamp;
    delete deleteNotifObj.TimeStamp;
    delete deleteNotifObj.Erstp;
    delete deleteNotifObj.timeStr;
    delete deleteNotifObj.Ctime;

    deleteNotifObj.Inpch = '243';
    deleteNotifObj.NotifRead = 'X';
    this.dashboardService.updateNotifications(deleteNotifObj).subscribe((res) => {
      //this.getNotifications();
      notification.NotifRead = 'X';
    },
      (err) => {
        let errors = err.error.error.innererror.errordetails;
        if (errors.length > 0) {
          this.notifierService.notify("error", errors[0].message || 'Error');
        } else {
          this.notifierService.notify("error", 'Error');
        }

      });
  }


  navigateTo(notification) {
    console.log("navigateTo", notification);
    ///mains/returns/search?return=2
    if (notification.NotifTy == '04') {
      this.router.navigate(["/mains/returns/search"], { queryParams: { alloverDue: '1' } });
    } else if (notification.NotifTy == '01') {
      this.router.navigate(["/mains/newvat"]);
    } else if (notification.NotifTy == '02' || notification.NotifTy == '03') {
      this.router.navigate(["/mains/tax"]);
    }
  }

  // getNotifications() {
  //   this.dashboardService.getInboxNotifications(this.tin).subscribe((res) => {

  //     console.log("getNotifications", res);

  //     let resultset: any = [];
  //     resultset = res["d"]["results"];
  //     console.log(this.notifications);

  //     for (let i = 0; i < resultset.length; i++) {
  //       // if (resultset[i]["NotifTy"] !== '03') {
  //       if (resultset[i]["NotifTy"] == '04') {
  //         if (!this.isReturnsadded) {
  //           this.notifications.push(resultset[i]);
  //           this.isReturnsadded = true;
  //         }
  //       } else {
  //         this.notifications.push(resultset[i]);
  //       }
  //       // }
  //     }
  //     this.isReturnsadded = false;
  //     for (let i = 0; i < this.notifications.length; i++) {
  //       let notifIndex = 0;
  //       if (this.notifications[i]["NotifTy"] == '01') {
  //         notifIndex = 0;
  //         this.notifications[i].path = this.pathList[0];
  //       } else if (this.notifications[i]["NotifTy"] == '02') {
  //         notifIndex = 1;
  //         this.notifications[i].path = this.pathList[0];
  //       } else if (this.notifications[i]["NotifTy"] == '03') {
  //         notifIndex = 2;
  //         this.notifications[i].path = this.pathList[0];
  //       } else if (this.notifications[i]["NotifTy"] == '04') {
  //         notifIndex = 3;
  //         this.notifications[i].path = this.pathList[0];
  //       }
  //       this.notifications[i].title = this.language.notifications[notifIndex].title;
  //       this.notifications[i].description = this.language.notifications[notifIndex].description;

  //       // const date = parseInt(this.notifications[i].Erstp.replace(/\D/g, ''));

  //       // // const Cdate = `${moment(date).format('ddd Do MMM YYYY')} ${moment(
  //       // //   this.notifications[i].Erstp.replace(/\D/g, ''),
  //       // //   'hhmmss'
  //       // // ).format('hh:mm a')}`;

  //       // const Cdate = `${moment(date).format('ddd Do MMM YYYY')}`;
  //       // this.notifications[i].date = Cdate;
  //       let datestr = this.notifications[i]["Begda"];
  //       this.notifications[i].date = datestr.replace(/\D/g, '');

  //     }

  //     this.filteredList = this.notifications;
  //   },
  //     (err) => {

  //     });
  // }








}
