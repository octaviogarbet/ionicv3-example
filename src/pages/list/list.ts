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
  items: Array<string>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private itemsProvider: ItemsProvider) {

    this.itemsProvider.getKeys().then(values => this.items = values);
  }

  goToAdd() {
    this.navCtrl.push('CreateItemPage');
  }
}
