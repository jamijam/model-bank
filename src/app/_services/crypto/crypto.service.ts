import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encodeBase64(stringToEncode: string): string {
    return btoa(stringToEncode);
  }

  decodeBase64(stringToDecode: string): string {
    return atob(stringToDecode);
  }

  encryptRSAOAEP(stringToEncrypt: string): string {
    // TODO: implement
    return stringToEncrypt;
  }

  decryptRSAOAEP(stringToDecrypt: string): string {
    // TODO: implement
    return stringToDecrypt;
  }
}
