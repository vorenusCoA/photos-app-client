import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean;
  user: any;
  photos: any;

  constructor(private auth: AuthService, private userService: UserService) {
    this.isAuthenticated = false;
  }

  ngOnInit() {

    this.auth.isAuthenticated$.subscribe(
      userLogged => {
        if (userLogged) {
          this.isAuthenticated = true;
          this.userService.getUserOrRegister().subscribe(
            (user: any) => {
              this.user = user;
            }
          )
        }
      }
    )

  }

  setPhotos(photos: any) {
    this.photos = photos;
  }

}
