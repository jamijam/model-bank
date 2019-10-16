import { Component, OnInit } from '@angular/core';

import { HypervergeResponse } from '../_models/kyc/hyperverge-response';

import { FaceMatchService } from '../_services/face-match/face-match.service';
import { ApixService } from '../_services/apix/apix.service';

@Component({
  selector: 'app-id-verification',
  templateUrl: './id-verification.component.html',
  styleUrls: ['./id-verification.component.scss']
})
export class IDVerificationComponent implements OnInit {

  image1: any;
  image2: any;

  APIXToken: string;

  verified = false;
  confidence: number;

  constructor(
    private faceMatchService: FaceMatchService,
    private apixService: ApixService
  ) { }

  ngOnInit() {
    this.apixService.getAPIXToken().subscribe(data => {
      this.APIXToken = data.access_token;
    });
  }

  onFile1Selected(event) {
    this.image1 = event.target.files[0];
  }

  onFile2Selected(event) {
    this.image2 = event.target.files[0];
  }

  verifyUser() {
    this.faceMatchService.verifyUser(this.APIXToken, this.image1, this.image2)
      .subscribe(data => {

        const receivedObject: HypervergeResponse = JSON.parse(JSON.stringify(data));

        if (receivedObject.result.match === 'yes') {
          this.verified = true;
          this.confidence = receivedObject.result.conf;
          this.loadImage(this.image1, 'image1');
          this.loadImage(this.image2, 'image2');
        }
      });
  }

  loadImage(image: any, imgTagId: string) {
    const reader = new FileReader();

    const imgtag: any = document.getElementById(imgTagId);
    imgtag.title = image.name;

    reader.onload = (event) => {
      imgtag.src = (event.target as any).result as string;
    };

    reader.readAsDataURL(image);
  }

  cancel() {
    this.verified = false;
    this.image1 = this.image2 = this.confidence = undefined;
  }

}
