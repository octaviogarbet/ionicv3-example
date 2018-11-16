# ionicv3-example
Ionic example for dev week

## Contents
* [Overview]
* [Setup]
* [Pages]
  + [New page]
  + [Component to page]
* [Adding new components]
* [Adding UI Components]
  + [FABs]
  + [Cards]
* [Navigation]
* [Ionic Native Integration]
  + [Social Share]
  + [Camera]
* [Storage]
* [Theming]
* [Authors]

## Overview
ionicv3-example is an Ionic 3 app created to use as a Demo for the Dev to Mobile developer talk at DevWeek. Here we will see several steps done to build this app.
We will develop a simple app that will have:
 - A form page to create simple items, with a title, a description and a picture (from our gallery or camera)
 - A list page which will display the created items as cards and we will add the capability to share this pictures.
 - And will storage the created items in order to have them every time we open the app.

## Setup
Nodejs is required to be installed in your dev environment
To install Ionic and Cordova run:

```bash
$ npm install -g ionic cordova
```

Then we chose the side menu template, so now that we have ionic cli installed you just have to run:

```bash
$ ionic start DevWeek sidemenu
```

Now to check that it works, we run:

```bash
$ ionic serve
```

## Pages
In order to develop uor app, we will add a new page, and transform the pages created by the template from a simple angular component, to a ionic page. We will do that becose ionic page use lazy module and improves our app performance.

### New page
Now to create a new page we will run the cli command:
```bash
$ ionic g page CreateItem
```
That will create under pages folder a new folder `create-item` and four files in it `create-item.html`, `create-item.ts`, `create-item.scss` and `create-item.module.ts`. And we will edit `create-item.html` to add the menu button in the header.
```xml
<ion-header>
  <ion-navbar>
    <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title>Create Item</ion-title>
  </ion-navbar>
</ion-header>
```
### Component to page
Now that we have a generated page as example, we will:
 - Add the @IonicPage() decorator to the ones generated at the start.
 - Create the missing *.module.ts files for our pages.
 - Remove the imports from app.module.ts
 - Change the navigation calls in order to use lazy loading, that is removing the import of the components and just changing the ComponentName of the params of the navigation and leave it just as a string.
 As an example `list.ts` will have:
```typescript
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
    ...
}
```
And `list.module.ts` will be:
```typescript
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';

@NgModule({
  declarations: [
    ListPage
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
  ],
})
export class ListPageModule {}
```
Then, `app.module.ts`:
```typescript
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```
And finally `app.component.ts`

```typescript
...
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'List', component: 'ListPage' }
    ];
  }
  ...
}
```

## Adding new components
Now, we will add a new component in order to have the items logic and template of the list in a reusable separated component and not in list page.

First of all we will generate the component with the ionic cli

```bash
$ ionic g component ListItem
```

The second step is to add the ionic module into the generated components module in order to be able to use ionic components in our custom components.

```typescript
import { NgModule } from '@angular/core';
import { ListItemComponent } from './list-item/list-item';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ListItemComponent],
	imports: [IonicModule],
	exports: [ListItemComponent]
})
export class ComponentsModule {}
```
Then we will add an import to our component that we will use later here and is the way that we will use to pass the data that we want to show from the list page, so our list-item.component.ts will look like:

```typescript
@Component({
  selector: 'list-item',
  templateUrl: 'list-item.html'
})
export class ListItemComponent {
  @Input() profile: Profile;

  constructor() {}

  //TODO: implement feature
  shareIt() {}

  //TODO: implement feature
  removeIt() {}
}
```
P.S. We will add shareIt and removeIt features later, and Profile is an interface we created:

```typescript
export interface Profile {
  id: string,
  title: string,
  description: string,
  image: string
}
```
After that we will import the generated `ComponentsModule` in the `ListModule`, so we can use the component that we have just created in our list page.

```typescript
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ListPage
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
    ComponentsModule
  ],
})
export class ListPageModule {}
```
We also will use it component in **ListPage** so we will call it in our `list.html` and remove the all autogenerated content code (ion-header doesn't change), so the ion-content will look like:
```xml
<ion-content>
  <list-item *ngFor="let item of items" [profile]="item"></list-item>
</ion-content>
```
We will also change our `list.ts` to use the profile interface in our item list:
```typescript
export class ListPage {
  items: Profile[];
  ...
}
```
## Adding UI Components
Here is when we start to add some magic (appart from the side menu and the pages). Ionic has many [UI Components] that help us tu build the interface of our app. For example it has tabs, action sheets, modals, popups, toolbars and more. The documentation is really well and easy to add the components in our app. The best part is that each component have the look and feel that it should have according to the OS of the device that the app is running, so you don't have to implement aditional code to add diferent behaviours to Ionic components.

For example we will add a Fixed Action Button to our list page, that will later navigate to our creat-item page, and a card in our ListItem component to display our items in a card.

### FABs
If you see at [FABs Component] doc, it has examples of diferent FAB that we can add to our view. It also use some [ionicons] that are also part of ionic, and have different look in iOS and Android. We will add one at the bottom right of our list page, so the `list.html` ion-content will look like:
```xml
<ion-content>

  <list-item *ngFor="let item of items" [profile]="item"></list-item>

  <ion-fab right bottom>
    <button ion-fab><ion-icon name="add"></ion-icon></button>
  </ion-fab>
</ion-content>
```

### Cards
Now we take a look at [Card Component] doc, and after looking after cards examples we selected the Images In Cards example one to be added in our ListItem component. So we will add the card code to our `list-item.html` using the profile variable to show the info.
```xml
<ion-card>
  <img src="{{profile.image}}" />
  <ion-card-content>
    <ion-card-title>
      {{profile.title}}
    </ion-card-title>
    <p>
      {{profile.description}}
    </p>
  </ion-card-content>
  <ion-item>
    <button ion-button clear item-start (click)="removeIt()"><ion-icon color="secondary" name="trash"></ion-icon></button>
    <button ion-button clear item-end (click)="shareIt()"><ion-icon name="share"></ion-icon></button>
  </ion-item>
</ion-card>
```

## Navigation
[Ionic Navigation] is what Ionic have to perform the navigation in our app, it has a **NavController** that can be imported in our components (including pages) which has some functions to handle the navigation. In our sidemenu project, we have the **ion-nav** working in our `app.html`, so will only use the **NavController** to make use of it.  Navigation in ionic works as a Stack, and we have 3 main basic usages.
 - push('PageName') -> to navigate to `PageName` page adding it to the top of the stack.
 - pop() -> to navigate to the previous page and remove the top page from the stack.
 - setRoot('PageName') -> to navigate to `PageName` page removing all pages from the stack and adding it as the only one of the stack.
Now we will add the navigation from the list page to the create-item. In `list.ts` we will add:
```typescript
export class ListPage {
...
  goToAdd() {
    this.navCtrl.push('CreateItemPage');
  }
}
```
And in `list.html` we will add the goToAdd call in our FAB:
```xml
  <ion-fab right bottom>
    <button ion-fab (click)="goToAdd()"><ion-icon name="add"></ion-icon></button>
  </ion-fab>
```
## Ionic Native Integration
[Ionic Native] is a wrapper for Cordova/PhoneGap plugins, it helps us to add native functionality in our app and it is really easy. To try a couple of examples, we will add a Social Sharing in order to share our items in other apps, and the Camera to take pictures or pick images from our phone data.
### Social Share
[Ionic Social Sharing] 
### Camera
Now we will add the [Ionic Camera Plugin] and use it in our **CreateItemPage**. First of all we will install it running the commands:
```bash
$ ionic cordova plugin add cordova-plugin-camera
$ npm install --save @ionic-native/camera
```
The second step is to add it to our AppModule:
```typescript
...
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```
Then we add it to the component where we want to use it and the function that will call the Camera plugin. We also add the **ToasterController** (other Ionic component) in order to give feedback to the user is something goes wrong.
```typescript
...
import { Camera } from '@ionic-native/camera';
...
export class CreateItemPage {
  constructor(
    ...
    public camera: Camera,
    private toastCtrl: ToastController,
    ...) {}

  getPicture(cameraSource: boolean) {
    if (Camera['installed']()) {
      this.camera.getPicture({
        //if cameraSource is true get the image from camera, else get it from gallery
        sourceType:cameraSource ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 500,
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
}
```
Here we explain just the Camera needed functions implementation, but in `create-item.html`, `create-item.ts` and `create-item.scss` we also added some styles improvements, an action sheet to choose between camera and gallery, a form with the title and description, and a provider which will be the responsable to add the item created to the list.
## Storage
[Ionic Storage]
## Theming
Now it's time to theme our app, [Ionic Theming] doc have all that we need to know to apply our custom styles to our app. In order to give an example we will override some of the ionic variables.
In `variables.scss` we will change the colors variable and override some of the toolbar variables too:
```css
$colors: (
  primary:    #de411b,
  secondary:  #48535b,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222
);

$toolbar-background: map-get($colors, primary);
$toolbar-border-color: map-get($colors, secondary);
```
## Authors
* [Octavio Garbarino](https://github.com/octaviog) ([@octaviogarbet](https://twitter.com/octaviogarbet))
* [Fernando Olmos](https://github.com/ferolmos) ([@OLMOStnet](https://twitter.com/OLMOStnet))

<!--- In file -->
[Overview]: #overview
[Setup]: #setup
[Pages]: #pages
[New page]: #new-page
[Component to page]: #component-to-page
[Adding new components]: #adding-new-components
[Adding UI Components]: #adding-ui-components
[FABs]: #fabs
[Cards]: #cards
[Navigation]: #navigation
[Ionic Native Integration]: #ionic-native-integration
[Social Share]: #social-share
[Camera]: #camera
[Storage]: #storage
[Theming]: #theming
[Authors]: #authors

<!--- External -->
[UI Components]: https://ionicframework.com/docs/components/#overview
[FABs Component]: https://ionicframework.com/docs/components/#fabs
[ionicons]: https://ionicframework.com/docs/ionicons/
[Card Component]: https://ionicframework.com/docs/components/#cards
[Ionic Navigation]: https://ionicframework.com/docs/components/#navigation
[Ionic Native]: https://ionicframework.com/docs/native/
[Ionic Social Sharing]: https://ionicframework.com/docs/native/social-sharing/
[Ionic Camera Plugin]: https://ionicframework.com/docs/native/camera/
[Ionic Storage]: https://ionicframework.com/docs/storage/
[Ionic Theming]: https://ionicframework.com/docs/theming/