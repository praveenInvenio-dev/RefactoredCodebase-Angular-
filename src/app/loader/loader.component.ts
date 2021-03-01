import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';
import { LoaderState } from './loaderstate';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  // variables
  show = false;
  public subscription: Subscription;

  constructor(public loaderService: LoaderService) {
  console.log("wqqwdqwdqwd")
  }

  ngOnInit() {
    //console.log("dslkvnsdlk",this.show)
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
        if (this.show) {
          //console.log("dslkvnsdlk",this.show)
          document.getElementById('loader').style.display = 'block';
        } else {
          document.getElementById('loader').style.display = 'none';
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
