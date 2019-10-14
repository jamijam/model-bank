import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-capture-details',
  templateUrl: './capture-details.component.html',
  styleUrls: ['./capture-details.component.scss']
})
export class CaptureDetailsComponent implements OnInit {
  valid = true;
  formDetails: any;

  constructor(private formBuilder: FormBuilder) { }

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
    }

    this.formDetails.reset();
  }

}
