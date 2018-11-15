import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';
import { Profile } from '../../interfaces/profile.interface';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<Profile>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private itemsProvider: ItemsProvider) {

    //this.itemsProvider.getKeys().then(values => this.items = values);
    this.itemsProvider.getItemsFromStorage().then(values => this.items = values);

    this.itemsProvider.itemsChanged.subscribe(values => {
      this.items = values;
    });
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
}
