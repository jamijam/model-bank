import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  accountDetails: any;
  accountInfo: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.accountDetails = JSON.parse(localStorage.getItem('accountDetails'));
    if (this.accountDetails) {
      this.accountInfo = 'Account Number : ' + this.accountDetails.accountIdentification + '<br>'
        + 'Personal ID: ' + this.accountDetails.partyId + '<br>'
        + 'Account Name: ' + this.accountDetails.accountName + ' | ' + this.accountDetails.nickname + ' (nickname)<br>'
        + 'Account Scheme: ' + this.accountDetails.schemeName + '<br>'
        + 'Secondary Identification: ' + this.accountDetails.secondaryIdentification;
    } else {
      this.router.navigate(['/home']);
    }

  }

}
