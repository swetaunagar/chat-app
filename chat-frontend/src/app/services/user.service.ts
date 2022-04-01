import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { environment } from '../../environments/environment';
import { GeneralResponse } from '../models/GeneralResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    return parsedUser;
  }

  setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  registerUser(body: User): Observable<GeneralResponse<User>> {
    return this.http.post<GeneralResponse<User>>(environment.user.register, body)
      .pipe(
        map(result => result)
      );
  }

}
