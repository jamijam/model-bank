import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as config from 'api-config.json';
import * as requestBodies from 'src/app/_models/scoring/_index';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  commonOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(APIXToken?: string): Observable<any> {
    const headers: HttpHeaders = APIXToken
      ? this.commonOptions.headers.append('X-Authorization', 'bearer ' + APIXToken)
      : this.commonOptions.headers;
    const body = JSON.stringify(config.scoreApi.credentials);

    return this.http.post(config.scoreApi.url.loginEndpoint, body, { headers });
  }

  createReq(accessToken: string, msisdn: string, APIXToken?: string): Observable<any> {
    const headers = (APIXToken
      ? this.commonOptions.headers.append('X-Authorization', 'bearer ' + APIXToken)
      : this.commonOptions.headers)
      .append('Authorization', 'Bearer ' + accessToken);

    const body: requestBodies.CreateReqBody = {
      client_code: config.scoreApi.clientCode,
      requested_msisdn: msisdn
    };

    return this.http.post(config.scoreApi.url.createReqEndpoint, body, { headers });
  }

  verifyReq(accessToken: string, reqId: string, otp: string, APIXToken?: string): Observable<any> {
    const headers = (APIXToken
      ? this.commonOptions.headers.append('X-Authorization', 'bearer ' + APIXToken)
      : this.commonOptions.headers)
      .append('Authorization', 'Bearer ' + accessToken);

    const body: requestBodies.VerifyReqBody = {
      request_id: reqId,
      otp
    };

    return this.http.post(config.scoreApi.url.createReqEndpoint, body, { headers });
  }

  getScore(accessToken: string, msisdn: string, consentId: string, APIXToken?: string): Observable<any> {
    const headers = (APIXToken
      ? this.commonOptions.headers.append('X-Authorization', 'bearer ' + APIXToken)
      : this.commonOptions.headers)
      .append('Authorization', 'Bearer ' + accessToken);

    const body: requestBodies.ScoreReqBody = {
      client_code: config.scoreApi.clientCode,
      requested_msisdn: msisdn,
      consent_id: consentId
    };

    return this.http.post(config.scoreApi.url.scoreReqEndpoint, body, { headers });
  }
}
