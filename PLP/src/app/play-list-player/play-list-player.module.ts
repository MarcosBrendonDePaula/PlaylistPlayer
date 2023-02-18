import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayListPlayerPageRoutingModule } from './play-list-player-routing.module';

import { PlayListPlayerPage } from './play-list-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayListPlayerPageRoutingModule
  ],
  declarations: [PlayListPlayerPage]
})
export class PlayListPlayerPageModule {}
