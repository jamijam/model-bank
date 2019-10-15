import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(
    private smartBankService: SmartBankService,
    private apixService: ApixService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formDetails = this.formBuilder.group({
      amt: ''
    });
  }

  onSubmit(formData: any) {
    console.log('Received Data', formData);

    if (!formData.amt) {
      this.valid = false;
    } else {
      this.valid = true;
      this.amt = formData.amt;
      this.applyLoan();
    }

    this.formDetails.reset();
  }

  applyLoan() {
    const accountId = JSON.parse(localStorage.getItem('accountDetails')).accountId;
    this.apixService.getAPIXToken().subscribe(data => {
      const APIXToken = data.access_token;

      this.smartBankService.applyLoan(APIXToken, accountId).subscribe(response => {
        this.loanId = 'Loan ID : ' + response.loanId;
      });
    });
  }

}
