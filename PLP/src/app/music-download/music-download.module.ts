import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicDownloadPageRoutingModule } from './music-download-routing.module';

import { MusicDownloadPage } from './music-download.page';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicDownloadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MusicDownloadPage]
})
export class MusicDownloadPageModule {}
