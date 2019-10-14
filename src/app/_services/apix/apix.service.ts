import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as config from 'api-config.json';

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

    const body = JSON.stringify(config.apix.credentials);

    return this.http.post(config.apix.tokenUrl, body, apixOptions);
  }
}
