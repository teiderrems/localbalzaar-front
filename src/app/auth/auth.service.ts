import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Credentials, LoginResponse} from '../../interfaces/Credentials';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject('API_BASE_URL') private baseUrl:string,private  readonly httpClient:HttpClient) {}

  login(credentials:Credentials):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/auth/login`,credentials);
  }

  register(credentials:Credentials):Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.baseUrl}/v1/users`,credentials);
  }

}
