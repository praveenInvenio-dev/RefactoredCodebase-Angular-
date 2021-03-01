import { Component, OnInit } from '@angular/core';

import { inboxConstants } from '../../constants/inboxConstants';
import * as moment from 'moment';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  lang: string;
  inboxConstants;

  inbox = 1;//DONT DELETE

  constructor() { }

  ngOnInit(): void {
    moment.locale("en");
    if (localStorage.getItem('lang') === 'ar') {
      this.lang = 'ar';
    } else {
      this.lang = 'en';
    }

    this.inboxConstants = inboxConstants;
  }
  //DONT DELETE
  setInboxValue(value) {
    console.log(value);
    this.inbox = value;
    console.log(this.inbox);
  }
}
