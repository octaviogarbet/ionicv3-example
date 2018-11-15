import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsProvider } from '../../providers/items/items';

/**
 * Generated class for the CreateItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})
export class CreateItemPage {

  item: any;
  itemForm: FormGroup;
  titleEdited: boolean;
  descriptionEdited: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private toastCtrl: ToastController,
    private itemsService: ItemsProvider,
    private actionsheetCtrl: ActionSheetController)
  {
    this.itemForm = this.formBuilder.group({
      title: [, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: [, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]]
    });
    this.item = {
      title: '',
      description: '',
      image: ''
    };
  }

  getPicture(cameraSource: boolean) {
    if (Camera['installed']()) {
      this.camera.getPicture({
        //if cameraSource is true get the image from camera, else get it from gallery
        sourceType:cameraSource ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
        //destinationType: cameraSource ? this.camera.DestinationType.DATA_URL: this.camera.DestinationType.FILE_URI,
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100,
        allowEdit: true,
        targetWidth: 250,
        targetHeight: 250,
        encodingType: this.camera.EncodingType.JPEG,      
        correctOrientation: true
      }).then((data) => {
        this.item.image = 'data:image/jpg;base64,' + data;
      }, (err) => {
        this.toastCtrl.create({
          message: 'Unable to take the picture',
          duration: 3000,
          position: 'middle'
        }).present();
      })
    }
  }

  /**
   * opens the action sheet about add profile image
   */
  openMenu(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Image source',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            //call get picture with camera on true
            this.getPicture(true);
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            //call get picture with camera on false
            this.getPicture(false);
          }
        },        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  createItem() {
    this.item.title = this.itemForm.get('title').value;
    this.item.description = this.itemForm.get('description').value;
    this.itemsService.addItem(this.item);
    this.toastCtrl.create({
      message: 'Item created successfully',
      duration: 3000,
      position: 'middle'
    }).present();
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot('ListPage');
    }
  }
}
