import { Injectable } from '@angular/core';

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

  encryptRSAOAEP(stringToEncrypt: string): string {
    const data = this.stringToArrayBuffer(stringToEncrypt);
    this.jsCrypt.importKey('jwk', config.scoreApi.telcoPubKey as JsonWebKey, {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' },
    }, false, ['encrypt']).then((publicKey) => {
      window.crypto.subtle.encrypt(
        {
          name: 'RSA-OAEP',
        },
        publicKey,
        data
      )
        .then((encrypted) => {
          stringToEncrypt = this.arrayBufferToString(encrypted);
          return stringToEncrypt;
        });
    });
    return stringToEncrypt;
  }

  decryptRSAOAEP(stringToDecrypt: string): string {
    const data = this.stringToArrayBuffer(stringToDecrypt);
    this.jsCrypt.importKey('jwk', config.scoreApi.clientPrivateKey as JsonWebKey, {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' },
    }, false, ['decrypt']).then((publicKey) => {
      window.crypto.subtle.decrypt(
        {
          name: 'RSA-OAEP',
        },
        publicKey,
        data
      )
        .then((decrypted) => {
          stringToDecrypt = this.arrayBufferToString(decrypted);
          return stringToDecrypt;
        });
    });
    return stringToDecrypt;
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
