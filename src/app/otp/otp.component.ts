import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  valid = true;
  msisdn: string;
  formDetails: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    }

    this.formDetails.reset();
  }

}
