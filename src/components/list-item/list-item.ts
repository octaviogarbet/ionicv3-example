import { Component, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Profile } from '../../interfaces/profile.interface';
import { ItemsProvider } from '../../providers/items/items';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'list-item',
  templateUrl: 'list-item.html'
})
export class ListItemComponent {
  @Input() profile: Profile;

  constructor(
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController,
    private itemsProvider: ItemsProvider) {       
  }

  shareIt() {
    if (this.profile.image) {
      const param = {
        message: this.profile.description, // not supported on some apps (Facebook, Instagram)
        subject: 'the subject', // fi. for email
        files: [this.profile.image], // an array of filenames either locally or remotely
        url: undefined,
        chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title,
        // appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
      };
      this.socialSharing.shareWithOptions(param).then(() => {
        console.log('Share completed');
      }).catch(() => {
        console.log('Share broken');
      });
    } else {
      this.toastCtrl.create({
        message: `This card don't have image to share`,
        duration: 3000,
        position: 'middle'
      }).present();
    }
  }

  onSuccess = (result) => {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  };

  onError = (msg) => {
    console.log("Sharing failed with message: " + msg);
  };

  removeIt() {
    this.itemsProvider.remove(this.profile.id);
  }
}
