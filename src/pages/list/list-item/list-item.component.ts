import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Profile } from '../../../interfaces/profile.interface';
import { ItemsProvider } from '../../../providers/items/items';

@Component({
    templateUrl: 'list-item.html',
    selector: 'app-list-item'
})
export class ListItemComponent { // implements OnChanges, OnInit


    // @Input() profileIdentifier: string;
    @Input() profile: Profile;

    constructor(private socialSharing: SocialSharing, private itemsProvider: ItemsProvider) {       
    }

    /*ngOnInit() {
        this.itemsProvider.getItem(this.profileIdentifier).then(value => this.profile = value);
        console.log(this.profileIdentifier);
    }

    ngOnChanges(changes: SimpleChanges): void {

        console.log(changes);
        if (changes.profileIdentifier && changes.profileIdentifier.currentValue) {
            this.itemsProvider.getItem(changes.profileIdentifier.currentValue).then(value => {
                this.profile = value
                console.log(JSON.stringify(this.profile));
            });
        }
    }*/

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

    removeIt() {
        // pending
    }
}
