import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsProvider {

  items: any[];
  itemsChanged: Subject<void>;

  constructor() {
    this.items = new Array<any>()
    this.itemsChanged = new Subject();
  }

  addItem(item) {
    this.items.push(item);
    this.itemsChanged.next();
  }

  getItems() {
    return this.items;
  }
}
