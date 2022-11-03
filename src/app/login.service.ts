import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: AuthService) { }

  public login(): Observable<void> {
    return this.auth.loginWithRedirect( {redirect_uri: environment.clientURL} );
  }

  public logout(): void {
    this.auth.logout({ returnTo: environment.clientURL});
  }

}
