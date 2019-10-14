import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.formDetails = this.formBuilder.group({
      name: '',
      msisdn: ''
    });
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
      });
    }
  }

  sendOTP(accessToken: string, msisdn: string) {
    let secureMSISDN = this.cryptoService.encryptRSAOAEP(msisdn);
    secureMSISDN = this.cryptoService.encodeBase64(secureMSISDN);
    localStorage.setItem('secureMSISDN', secureMSISDN);
    this.scoringService.createReq(accessToken, secureMSISDN).subscribe(response => {
      if (response.data && response.data.request_id) {
        localStorage.setItem('request_id', response.data.request_id);
        this.router.navigate(['/otp']);
      }
    });
  }

}
