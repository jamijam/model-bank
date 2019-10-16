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
      "accountCurrency": "USD",
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

  applyLoan(APIXToken: string, accountId: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders().set('X-Authorization', 'bearer ' + APIXToken);

    const request = {
      accountId,
      accruedInterest: 0,
      accruedPenalty: 0,
      approvedDate: '2019-10-15T16:59:59.694Z',
      assetIdRef: 1000000018,
      bankId: hardcoded.smartbank.bankId,
      checkerDate: '2019-10-15T16:59:59.694Z',
      checkerId: 'string',
      closedDate: '2019-10-15T16:59:59.694Z',
      collectionRecoveryFee: 0,
      creditOriginRef: 1000000052,
      endDate: '2019-10-15T16:59:59.694Z',
      feesBalance: 0,
      feesDue: 0,
      feesPaid: 0,
      gracePeriod: 0,
      gracePeriodType: 'none',
      hasCustomSchedule: 'N',
      installmentAmount: 0,
      interestApplicationMethod: 'on_repayment',
      interestBalance: 0,
      interestCalculationMethod: 'flat',
      interestChargeFrequence: 'every_month',
      interestDue: 0,
      interestSpread: 0,
      issueDate: '2019-10-15T16:59:59.694Z',
      lastAccountAppraisalDate: '2019-10-15T16:59:59.694Z',
      lastLockedDate: '2019-10-15T16:59:59.694Z',
      lastPymntAmnt: 0,
      lastPymntDate: '2019-10-15T16:59:59.694Z',
      lastSetToArrearsDate: '2019-10-15T16:59:59.694Z',
      lastinterestAppliedDate: '2019-10-15T16:59:59.694Z',
      lasttaxRateReviewDate: '2019-10-15T16:59:59.694Z',
      lineOfCreditId: 0,
      loanAccountCurrency: 'USD',
      loanContractId: 'string',
      loanName: 'string',
      loanPenaltyCalculationMethod: 'overdue_balance',
      loanRefNumber: new Date().getTime(),
      makerDate: '2019-10-15T16:59:59.694Z',
      makerId: 'string',
      modifiedBy: 'string',
      modifiedDate: '2019-10-15T16:59:59.694Z',
      nextPymntDate: '2019-10-15T16:59:59.694Z',
      paymentMethod: 'horizontal',
      paymentfrequency: 'string',
      penaltyBalance: 0,
      penaltyDue: 0,
      penaltyPaid: 0,
      periodicPayment: 0,
      principalBalance: 0,
      principalRepaymentInterval: 0,
      productKey: 0,
      recoveries: 0,
      repaymentInstallments: 0,
      repaymentPeriodCount: 0,
      repaymentPeriodUnit: 'months',
      repaymentScheduleMethod: 'fixed',
      scheduleDuedatesMethod: 'interval',
      status: 'string',
      subStatus: 'active',
      taxRate: 0,
      term: 'string',
      totalLoanAmountFunded: 0,
      totalPrincipleAmnt: 0,
      totalPymntTillDate: 0,
      totalRecInt: 0,
      totalRecLateFee: 0,
      totalRecPrncp: 0,
      type: 'string',
      verificationStatus: 'string'
    };

    return this.http.post(hardcoded.smartbank.loanUrl, request, { headers });
  }

}
