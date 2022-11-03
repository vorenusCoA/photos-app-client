import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';

import { LoginService } from '../login.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() isAuthenticated: any;
  @Input() user: any;

  @Output() eventPhotos = new EventEmitter<any>();

  filesToUpload: any;
  filesUploaded: any;

  constructor(private loginService: LoginService, private photoService: PhotoService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('isAuthenticated')) {
      this.isAuthenticated = changes['isAuthenticated'].currentValue;
    }
    if (changes.hasOwnProperty('user')) {
      this.user = changes['user'].currentValue;
    }
  }

  public login(): void {
    this.loginService.login()
  }

  public logout(): void {
    this.loginService.logout();
  }

  upload(file: File): void {

    if (file) {
      this.photoService.upload(file).subscribe(
        (event: any) => {
          if (event instanceof HttpResponse) {
            this.filesUploaded++;
            if (this.filesUploaded == this.filesToUpload) {
              this.eventPhotos.emit(this.photoService.getPhotos())
            }
          }
        }
      );
    }
  }

  uploadFiles(event: any): void {

    const files = event.target.files;

    this.filesToUpload = files.length;
    this.filesUploaded = 0;

    for (let file of files) {
      this.upload(file);
    }

  }

}