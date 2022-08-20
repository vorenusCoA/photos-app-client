import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: any

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
    this.userService.getLoggedUser().subscribe(data => {
      this.username = data.name;
    })

  }

}
