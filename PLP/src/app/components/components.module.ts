import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MusicComponent } from './music/music.component';
import { IonicModule, IonIcon } from '@ionic/angular';


@NgModule({
	declarations: [MusicComponent],
	imports: [IonicModule, CommonModule],
	exports: [MusicComponent]
})
export class ComponentsModule {}