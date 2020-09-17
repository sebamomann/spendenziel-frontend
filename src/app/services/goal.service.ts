import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private httpClient: HttpClient) {
  }

  get() {
    const url = `${environment.API_URL}goals`;
    return this.httpClient.get(url);
  }
}
