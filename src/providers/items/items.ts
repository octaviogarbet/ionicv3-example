import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Profile } from '../../interfaces/profile.interface';

/*
  Generated class for the ItemsProvider provider.
*/
@Injectable()
export class ItemsProvider {

  items: Profile[];
  itemsChanged: Subject<void>;

  constructor() {
    this.items = new Array<Profile>()
    this.itemsChanged = new Subject();
  }

  addItem(item: Profile) {
    this.items.push(item);
    this.itemsChanged.next();
  }

  getItems(): Profile[] {
    return this.items;
  }
}
