import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToasterService } from 'angular2-toaster';

import { ScoringService } from '../_services/scoring/scoring.service';
import { CryptoService } from '../_services/crypto/crypto.service';

@Component({
  selector: 'app-capture-details',
  templateUrl: './capture-details.component.html',
  styleUrls: ['./capture-details.component.scss']
})
export class CaptureDetailsComponent implements OnInit {
  valid = true;
  formDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private scoringService: ScoringService,
    private cryptoService: CryptoService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    const accDetails = JSON.parse(localStorage.getItem('accountDetails'));
    if (!accDetails) {
      this.router.navigate(['']);
    }
    this.formDetails = this.formBuilder.group({
      name: '',
      msisdn: ''
    });
    this.formDetails.controls.name.setValue(accDetails.accountName);
  }

  onSubmit(formData: any) {
    console.log('Received Data', formData);

    if (!formData.name || !formData.msisdn) {
      this.valid = false;
    } else {
      this.valid = true;
      this.startOTPFlow(formData.msisdn);
    }

    this.formDetails.reset();
  }

  startOTPFlow(msisdn: string) {
    let accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      this.scoringService.login().subscribe(response => {
        if (response.data && response.data.access_token) {
          accessToken = response.data.access_token;
          localStorage.setItem('access_token', response.data.access_token);

          this.sendOTP(accessToken, msisdn);
        }
      }, error => {
        this.toasterService.pop(
          'error',
          'Invalid Credentials',
          'Please check if you have set valid TrustingSocial credentials in your API config.'
        );
        console.error(error);
      });
    } else {
      this.sendOTP(accessToken, msisdn);
    }
  }

  sendOTP(accessToken: string, msisdn: string) {
    this.cryptoService.encrypt(msisdn).subscribe(secureMSISDN => {
      console.log('secureMSISDN', secureMSISDN);

      localStorage.setItem('secureMSISDN', secureMSISDN);
      this.scoringService.createReq(accessToken, secureMSISDN).subscribe(response => {
        if (response.data && response.data.request_id) {
          localStorage.setItem('request_id', response.data.request_id);
          this.router.navigate(['/otp']);
        }
      }, error => {
        this.toasterService.pop(
          'error',
          'Error: TrustingSocial',
          'Your request was rejected by the TrustingSocial API with the following message:\n' + error.error.message
        );
        console.error(error);
      });
    });
  }

}
