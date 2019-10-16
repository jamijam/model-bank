import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToasterService } from 'angular2-toaster';

import { ApixService } from '../_services/apix/apix.service';
import { SmartBankService } from '../_services/smart-bank/smart-bank.service';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrls: ['./loan-page.component.scss']
})
export class LoanPageComponent implements OnInit {
  formDetails: any;
  valid = true;
  loanId: string;
  amt: string;
  scoreMult: number;
  accountIdent: string;

  constructor(
    private smartBankService: SmartBankService,
    private apixService: ApixService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.scoreMult = parseFloat(localStorage.getItem('scoreMult'));
    this.accountIdent = JSON.parse(localStorage.getItem('accountDetails')).accountIdentification;
    if (!this.scoreMult || !this.accountIdent) {
      this.router.navigate(['']);
    }
    this.formDetails = this.formBuilder.group({
      amt: ''
    });
    console.log(this.formDetails);
  }

  onSubmit(formData: any) {
    console.log('Received Data', formData);

    if (!formData.amt) {
      this.valid = false;
    } else {
      this.valid = true;
      this.amt = formData.amt;
    }

    this.formDetails.reset();
  }

  applyLoan() {
    const accountId = JSON.parse(localStorage.getItem('accountDetails')).accountId;
    this.apixService.getAPIXToken().subscribe(data => {
      const APIXToken = data.access_token;

      if (APIXToken.includes('Invalid')) {
        this.toasterService.pop('error', 'Invalid Credentials', 'Please check if you have set valid APIX credentials in your API config.');
      } else {
        const loanAmt = parseInt(this.amt, 10) * this.scoreMult;

        this.smartBankService.applyLoan(APIXToken, accountId, loanAmt).subscribe(response => {
          this.loanId = response.loanId;
        }, error => {
          this.toasterService.pop(
            'error',
            'Error: SmartBank',
            'The SmartBank API rejected your loan request. Check the console for more information.'
          );
          console.error(error);
        });
      }
    });
  }
}
