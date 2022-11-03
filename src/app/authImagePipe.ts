import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OnInit, Pipe, PipeTransform } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";

@Pipe({
  name: 'authImage'
})
export class AuthImagePipe implements PipeTransform {

  token: any;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.getAccessTokenSilently().subscribe(
      token => {
        this.token = token;
      }
    );
   }

  async transform(src: string): Promise<string> {
    if (src.indexOf(';base64,') > -1) {
      return src;
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    const imageBlob: any = await this.http.get(src, { headers, responseType: 'blob' }).toPromise();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });
  }

}