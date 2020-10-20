import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraimageService {

  constructor(public http: HttpClient,
    public camera: Camera) {
    console.log('Hello TakeimageProvider Provider');
  }
  // click image from camera
  selectImageInCamera() {
    const CAMERA_OPTIONS: CameraOptions = {
      allowEdit: true,
      quality: 20,
      targetHeight: 300,
      targetWidth: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return this.camera.getPicture(CAMERA_OPTIONS);
  }
  // choose image from gallery
  selectImageInGallery() {
    const CAMERA_OPTIONS: CameraOptions = {
      allowEdit: true,
      quality: 20,
      targetHeight: 300,
      targetWidth: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    return this.camera.getPicture(CAMERA_OPTIONS);
  }

}
