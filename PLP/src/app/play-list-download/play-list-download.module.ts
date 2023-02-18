import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayListDownloadPageRoutingModule } from './play-list-download-routing.module';

import { PlayListDownloadPage } from './play-list-download.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [PlayListDownloadPage],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PlayListDownloadPageRoutingModule,
        ComponentsModule,
        
    ]
})
export class PlayListDownloadPageModule {}
