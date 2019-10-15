import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ScoringService } from '../_services/scoring/scoring.service';
import { CryptoService } from '../_services/crypto/crypto.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  accessToken: string;
  requestId: string;
  consentId: string;
  secureMSISDN: string;

  valid = true;
  msisdn: string;
  formDetails: any;
  score: string;

  constructor(
    private formBuilder: FormBuilder,
    private scoringService: ScoringService,
    private cryptoService: CryptoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_token');
    this.requestId = localStorage.getItem('request_id');
    this.secureMSISDN = localStorage.getItem('secureMSISDN');
    if (!this.accessToken || !this.requestId || !this.secureMSISDN) {
      this.router.navigate(['/apply']);
    }
    this.formDetails = this.formBuilder.group({
      otp: ''
    });
  }

  onSubmit(formData: any) {
    console.log('Received Data', formData);

    if (!formData.otp) {
      this.valid = false;
    } else {
      this.valid = true;
      this.startVerifyFlow(formData.otp);
    }

    this.formDetails.reset();
  }

  startVerifyFlow(otp: any) {
    this.scoringService.verifyReq(this.accessToken, this.requestId, otp).subscribe(response => {
      if (response.data && response.data.consent_id) {
        this.consentId = response.data.consent_id;
        localStorage.setItem('consentId', this.consentId);

        this.getCreditScore();
      }
    });
  }

  getCreditScore() {
    this.scoringService.getScore(this.accessToken, this.secureMSISDN, this.consentId).subscribe(response => {
      if (response.data && response.data.score) {
        this.score = response.data.score;

        this.score = this.cryptoService.decodeBase64(this.score);
        this.cryptoService.getPrivKey().subscribe(privateKey => {
          this.cryptoService.decryptRSAOAEP(this.score, privateKey).subscribe(decrypted => {
            decrypted = new Uint8Array(decrypted);
            this.score = this.cryptoService.arrayBufferToString(decrypted);
          });
        });
        // TODO: Show result as per response (remember to update the template!)
      }
    });
  }

}
