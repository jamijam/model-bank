import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import * as config from 'api-config.json';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  jsCrypt: SubtleCrypto = window.crypto.subtle;

  constructor() { }

  encodeBase64(stringToEncode: string): string {
    return btoa(stringToEncode);
  }

  decodeBase64(stringToDecode: string): string {
    return atob(stringToDecode);
  }

  getPubKey(): Observable<CryptoKey> {
    const PubKeyPromise: PromiseLike<CryptoKey> = this.jsCrypt.importKey('jwk', config.scoreApi.telcoPubKey as JsonWebKey, {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-512' },
    }, false, ['encrypt']);
    return from(PubKeyPromise);
  }

  getPrivKey(): Observable<CryptoKey> {
    const PrivKeyPromise: PromiseLike<CryptoKey> = this.jsCrypt.importKey('jwk', config.scoreApi.clientPrivateKey as JsonWebKey, {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' },
    }, false, ['decrypt']);
    return from(PrivKeyPromise);
  }

  encryptRSAOAEP(stringToEncrypt: string, publicKey: CryptoKey): Observable<any> {
    const data = this.stringToArrayBuffer(stringToEncrypt);
    const encryptedPromise: PromiseLike<any>
      = this.jsCrypt.encrypt(
        {
          name: 'RSA-OAEP',
        },
        publicKey,
        data
      );
    return from(encryptedPromise);
  }

  decryptRSAOAEP(stringToDecrypt: string, privateKey: CryptoKey): Observable<any> {
    const data = this.stringToArrayBuffer(stringToDecrypt);
    const decryptedPromise: PromiseLike<any>
      = this.jsCrypt.decrypt(
        {
          name: 'RSA-OAEP',
        },
        privateKey,
        data
      );
    return from(decryptedPromise);
  }

  stringToArrayBuffer(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  arrayBufferToString(str) {
    const byteArray = new Uint8Array(str);
    let byteString = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCodePoint(byteArray[i]);
    }
    return byteString;
  }
}
