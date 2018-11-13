import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateItemPage } from './create-item';

@NgModule({
  declarations: [
    CreateItemPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateItemPage),
  ],
})
export class CreateItemPageModule {}
