import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getLoggedUser(): Observable<any> {

    const url = "http://localhost:8080/logged-user"

    return this.http.get(url)
  }

}
