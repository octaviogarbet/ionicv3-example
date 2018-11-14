import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [
    ListPage,
    ListItemComponent
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
  ],
})
export class ListPageModule {}
