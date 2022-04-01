import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MessageInfo } from '../models/Message';
import { GeneralResponse } from '../models/GeneralResponse';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  getAllMessages(): Observable<GeneralResponse<MessageInfo[]>> {
    return this.http.get<GeneralResponse<MessageInfo[]>>(environment.message.getAllMessages)
      .pipe(
        map(result => result)
      );
  }
}
