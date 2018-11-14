import { Component, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Profile } from '../../../interfaces/profile.interface';

@Component({
    templateUrl: 'list-item.html',
    selector: 'app-list-item'
})
export class ListItemComponent {

    @Input() profile: Profile;

    constructor(private socialSharing: SocialSharing) { }

    shareIt() {
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

    }

    onSuccess = (result) => {
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
        console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };

    onError = (msg) => {
        console.log("Sharing failed with message: " + msg);
    };
}
