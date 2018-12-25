import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventhistoryPage } from './eventhistory';

@NgModule({
  declarations: [
    EventhistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(EventhistoryPage),
  ],
})
export class EventhistoryPageModule {}
