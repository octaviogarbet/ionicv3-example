import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  goToAdd() {
    this.navCtrl.push('CreateItemPage');
  }

  shareIt() {
    const param = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: 'the subject', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
      chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title,
      appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };
    this.socialSharing.shareWithOptions(param).then(() => {
      console.log('Share completed');
    }).catch(() => {
      console.log('Share broken');
    });
    
  }

  onSuccess = (result) => {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  };
  
  onError = (msg) => {
    console.log("Sharing failed with message: " + msg);
  };
}
