import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private httpClient: HttpClient) {
  }

  done(donation: any) {
    const headers = {'Content-Type': 'application/json'};
    const url = `${environment.API_URL}donations/done`;
    const body: any = {};
    body.id = donation.id;

    const req = new HttpRequest('POST', url, body);

    return this.httpClient.request(req);
  }
}
