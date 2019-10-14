import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as hardcoded from '../../../../api-config.json';

@Injectable({
  providedIn: 'root'
})
export class ApixService {

  constructor(private http: HttpClient) { }

  getAPIXToken(): Observable<any> {
    const apixOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        'Content-Type': 'application/json'
      })
    };

    const request = JSON.stringify(hardcoded.apix.credentials);

    return this.http.post(hardcoded.apix.tokenUrl, request, apixOptions);
  }
}
