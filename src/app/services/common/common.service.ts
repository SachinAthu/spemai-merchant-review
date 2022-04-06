import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { EncryptService } from '../encrypt/encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  httpHeaders = new HttpHeaders({
    'Content-Type': 'text/plain; charset=utf-8',
    Authorization: environment.authorization_token,
  });

  constructor(private http: HttpClient, private encryptionService: EncryptService) { }

  putRequest(url: string, body: any) {
    let encrypted_body = null;
    if (body) {
      encrypted_body = this.encryptionService.request_encript(body);
    }

    return this.http.put(environment.apiBaseUrl + url, encrypted_body, { headers: this.httpHeaders, responseType: 'text' }).pipe(
      map(res => {
        const decrypted_res = this.encryptionService.response_decript(res);
        return decrypted_res;
      }),
    );
  }

  // postRequest(url: string, body: any) {
  //   let encrypted_body = null;
  //   if (body) {
  //     encrypted_body = this.encryptionService.request_encript(body);
  //   }

  //   return this.http.post(environment.apiBaseUrl + url, encrypted_body, { headers: this.httpHeaders, responseType: 'text' }).pipe(
  //     map(res => {
  //       const decrypted_res = this.encryptionService.response_decript(res);
  //       return decrypted_res;
  //     }),
  //   );
  // }
}
