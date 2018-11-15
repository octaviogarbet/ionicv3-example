import { NgModule } from '@angular/core';
import { ListItemComponent } from './list-item/list-item';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ListItemComponent],
	imports: [IonicModule],
	exports: [ListItemComponent]
})
export class ComponentsModule {}
