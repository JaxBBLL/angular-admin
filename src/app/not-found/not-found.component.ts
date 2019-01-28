import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent implements OnInit {

  constructor(private myLocation: Location) { }

  ngOnInit() {
  }

  backToPrev() {
    this.myLocation.back();
  }

}
