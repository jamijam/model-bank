import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  detailsPresent: boolean;

  constructor() { }

  ngOnInit() {
    const accDetails = JSON.parse(localStorage.getItem('accountDetails'));
    this.detailsPresent = (accDetails && accDetails.accountName);
  }

}
