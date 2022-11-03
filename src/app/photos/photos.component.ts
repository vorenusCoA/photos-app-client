import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @Input() user: any;
  @Input() photosInput: any;

  photos?: Observable<any>;

  constructor(private photoService: PhotoService) {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('user')) {
      this.user = changes['user'].currentValue;
      if (this.user && this.user.id) {
        this.photos = this.photoService.getPhotos();
      }
    }
    if (changes.hasOwnProperty('photosInput')) {
      let newPhotos = changes['photosInput'].currentValue;
      if (newPhotos) {
        this.photos = newPhotos;
      }
    }
  }

}
