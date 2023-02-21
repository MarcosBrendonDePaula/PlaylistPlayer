import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MusicComponent } from './music/music.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { IonicModule, IonIcon } from '@ionic/angular';


@NgModule({
	declarations: [MusicComponent, PlaylistComponent],
	imports: [IonicModule, CommonModule],
	exports: [MusicComponent, PlaylistComponent]
})
export class ComponentsModule {}