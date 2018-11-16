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

## Overview
ionicv3-example is an Ionic 3 app created to use as a Demo for the Dev to Mobile developer talk at DevWeek. Here we will see several steps done to build this app.
We will develop a simple app that will have:
 - A form page to create simple items, with a title, a description and a picture (from our galery or camera)
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
That will create under pages folder a new folder create-item and four files in it create-item.html, create-item.ts, create-item.scss and create-item.module.ts

### Component to page
Now that we have a generated page as example, we will:
 - Add the @IonicPage() decorator to the ones generated at the start.
 - Create the missing *.module.ts files for our pages.
 - Remove the imports from app.module.ts
 - Change the navigation calls in order to use lazy loading, that is removing the import of the components and just changing the ComponentName of the params of the navigation and leave it just as a string.
 As an example list.ts will have:
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
And list.module.ts will be:
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
Then, app.module.ts:
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```
And finally app.component.ts

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

First we will generate the component with the ionic cli

```bash
$ ionic g component ListItem
```

Then we will add the ionic module to the generated components module in order to be able to use ionic components in our custom components.

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
Finally we will import the generated ComponentsModule in the ListModule, so we can use the component that we have just created in our list page.

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

## Adding UI Components

### FABs

### Cards

## Navigation

## Ionic Native Integration

## Social Share

## Camera

## Storage

## Theming
