import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayListFindPageRoutingModule } from './play-list-find-routing.module';

import { PlayListFindPage } from './play-list-find.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayListFindPageRoutingModule
  ],
  declarations: [PlayListFindPage]
})
export class PlayListFindPageModule {}
