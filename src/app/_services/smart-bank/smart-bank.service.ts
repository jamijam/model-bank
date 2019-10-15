import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as hardcoded from 'api-config.json';
import { AccountJson } from 'src/app/_models/smartbank/account-json';

@Injectable({
  providedIn: 'root'
})
export class SmartBankService {

  constructor(private http: HttpClient) { }

  createParty(APIXToken: string, accountName: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders().set('X-Authorization', 'bearer ' + APIXToken);

    const request = {
      "bankId": hardcoded.smartbank.bankId,
      "canGaurantee": "Y",
      "canOpenAccounts": "Y",
      "description": accountName,
      "isDebarred": "N",
      "makerDate": "2019-10-12T15:24:06.423Z",
      "makerId": "string",
      "partyType": hardcoded.smartbank.partyType
    }

    return this.http.post(hardcoded.smartbank.createPartyUrl, request, { headers });
  }

  createAccount(APIXToken, name: string, nick: string, scheme: string, cardFacility: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders().set('X-Authorization', 'bearer ' + APIXToken);

    const request: AccountJson = {
      "accountClosingDate": "2019-10-12T11:38:01.711Z",
      "accountCurrency": "GBP",
      "accountName": name,
      "accountOpeningDate": "2019-10-12T11:38:01.711Z",
      "accountTypeId": hardcoded.smartbank.accountTypeId,
      "accountrefnumber": "string",
      "balance": 0,
      "bankId": hardcoded.smartbank.bankId,
      "branchId": hardcoded.smartbank.branchId,
      "cardFacility": cardFacility,
      "checkerDate": "2019-10-12T11:38:01.711Z",
      "checkerId": "string",
      "chequebookFacility": "Y",
      "creditDebitIndicator": "Credit",
      "creditLineAmount": 0,
      "creditLineIncluded": "N",
      "creditLineType": "Emergency",
      "frozen": "N",
      "isjointaccount": "N",
      "isonlineaccessenabled": "Y",
      "makerDate": "2019-10-12T11:38:01.711Z",
      "makerId": "string",
      "modifiedDate": "2019-10-12T11:38:01.711Z",
      "nickname": nick,
      "noCredit": "Y",
      "noDebit": "N",
      "nomineeAddress": "string",
      "nomineeDob": "2019-10-12T11:38:01.711Z",
      "nomineeName": "string",
      "nomineePhoneNo": "string",
      "nomineeRelatonship": "string",
      "passbookFacility": "Y",
      "productId": hardcoded.smartbank.productId,
      "schemeName": scheme,
      "status": "string",
      "typeOfBalance": "ClosingAvailable",
      "usage": "Y"
    }

    return this.http.post(hardcoded.smartbank.createAccountUrl, request, { headers });
  }

  setOwner(APIXToken, accountId, partyId): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders().set('X-Authorization', 'bearer ' + APIXToken);

    const request = {
      "accountId": accountId,
      "checkerDate": "2019-10-12T11:43:04.488Z",
      "checkerId": "string",
      "endDate": "2019-10-12T11:43:04.488Z",
      "isPrimaryOwner": "Y",
      "makerDate": "2019-10-12T11:43:04.488Z",
      "makerId": "string",
      "modifiedBy": "string",
      "modifiedDate": "2019-10-12T11:43:04.488Z",
      "partyId": partyId,
      "percentageOfShare": 100,
      "startDate": "2019-10-12T11:43:04.488Z",
      "status": "Active"
    }

    return this.http.post(hardcoded.smartbank.setOwnersUrl, request, { headers });
  }
}
