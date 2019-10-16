import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToasterService } from 'angular2-toaster';

import { SmartBankService } from '../_services/smart-bank/smart-bank.service';
import { ApixService } from '../_services/apix/apix.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  schemes: any = ['BBAN', 'IBAN'];
  account;
  message = 'Please fill all fields';
  accountInfo = '';

  accountCardFacility = 'N';
  schemeName: string;
  accountName: string;
  nickname: string;

  marked = false;
  APIXToken: string;

  constructor(
    private smartBankService: SmartBankService,
    private apixService: ApixService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.apixService.getAPIXToken().subscribe(data => {
      this.APIXToken = data.access_token;
      if (this.APIXToken.includes('Invalid')) {
        this.toasterService.pop('error', 'Invalid Credentials', 'Please check if you have set valid APIX credentials in your API config.');
      }
    });
  }

  cardFacility(event) {
    this.marked = event.target.checked;

    if (this.marked === true) {
      this.accountCardFacility = 'Y';
    } else {
      this.accountCardFacility = 'N';
    }
  }

  onOptionsSelected(event) {
    this.schemeName = this.schemes[event];
    console.log(this.schemeName);
  }

  getAccountValues() {
    this.message = 'Creating...';

    this.smartBankService.createAccount(
      this.APIXToken,
      this.accountName,
      this.nickname,
      this.schemeName,
      this.accountCardFacility
    ).subscribe(accountData => {
      this.account = JSON.parse(JSON.stringify(accountData));

      if (accountData != null) {
        this.smartBankService.createParty(this.APIXToken, this.accountName).subscribe(partyData => {
          const partyId = partyData.partyId;
          const accountId = accountData.accountId;

          this.smartBankService.setOwner(this.APIXToken, accountId, partyId).subscribe(response => {
            const partyDetails = response.party;

            const accountDetails = {
              accountId: this.account.accountId,
              accountIdentification: this.account.accountIdentification,
              partyId: partyDetails.partyId,
              accountName: accountData.accountName,
              nickname: accountData.nickname,
              schemeName: accountData.schemeName,
              secondaryIdentification: accountData.secondaryIdentification
            };

            localStorage.setItem('accountDetails', JSON.stringify(accountDetails));

            this.message = 'Your account has been successfully created.';

            document.getElementById('closeBtn').click();

            this.router.navigate(['/viewdetails']);
          }, error => this.throwSmartBankError(error));
        }, error => this.throwSmartBankError(error));

        console.log(accountData);
      } else {
        this.message = 'Account Creation Failed';
      }
    });
  }

  checkDisabled(): boolean {
    if (this.accountName && this.accountCardFacility && this.schemeName && this.nickname) {
      return false;
    }
    return true;
  }

  throwSmartBankError(error: any): void {
    this.toasterService.pop(
      'error',
      'Error: SmartBank',
      'Your request was rejected by the SmartBank API. Please check the console for extra information.'
    );
    console.error(error);
  }

}
