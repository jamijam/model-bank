import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ApixService } from '../_services/apix/apix.service';
import { SmartBankService } from '../_services/smart-bank/smart-bank.service';
import { Router } from '@angular/router';

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
    private router: Router
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

      const loanAmt = parseInt(this.amt, 10) *  this.scoreMult;

      this.smartBankService.applyLoan(APIXToken, accountId, loanAmt).subscribe(response => {
        this.loanId = response.loanId;
      });
    });
  }

}
