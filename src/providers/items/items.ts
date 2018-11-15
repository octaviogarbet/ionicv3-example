import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Profile } from '../../interfaces/profile.interface';

import { Storage } from '@ionic/storage';

/*
  Generated class for the ItemsProvider provider.
*/
@Injectable()
export class ItemsProvider {

  items: Profile[];
  itemsChanged: Subject<void>;

  constructor(private storage: Storage) {
    this.items = new Array<Profile>()
    this.itemsChanged = new Subject();
  }

  addItem(item: Profile) {
    item.id = this.getIdentifier();
    //this.items.push(item);
    //this.itemsChanged.next();
    this.storage.set(item.id, JSON.stringify(item));
  }

  getKeys(): Promise<Array<string>> {
    return this.storage.keys();
  }

  getItem(key: string): Promise<Profile> {
    return this.storage.get(key);
  }


  private getIdentifier() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
