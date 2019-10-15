import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as config from 'api-config.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceMatchService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      appId: config.facematch.apiCredentials.appId,
      appKey: config.facematch.apiCredentials.appKey
    })
  };

  constructor(private http: HttpClient) { }

  verifyUser(APIXToken, image1, image2): Observable<any> {
    const headers: HttpHeaders = this.httpOptions.headers.set('X-Authorization', 'bearer ' + APIXToken);

    const formData: FormData = new FormData();
    formData.append('type', 'id')
    formData.append('image1', image1);
    formData.append('image2', image2);

    return this.http.post(config.facematch.verifyUrl, formData, { headers });
  }
}
