import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('title') title: string;
  @Input('direction') direction: string;
  @Input('url') url: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("title direction", this.title, this.direction)
  }

}
