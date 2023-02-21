import { Component, OnInit, Input, ViewChild, QueryList, ViewChildren} from '@angular/core';
import {Playlist} from './../../interfaces/playlist'
import {Storage} from '@ionic/storage';
import { IonGrid } from '@ionic/angular';
import { MusicComponent } from '../music/music.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {

  @Input()
  data!: Playlist;

  musicas:any = [];
  
  tocando!:boolean;
  tocando_id!:number;
  MusicTocando!:MusicComponent;


  @ViewChildren(MusicComponent) musicasContainer!: QueryList<MusicComponent>;
  

  constructor(private storage: Storage) { }

  async ngOnInit() {
    if(await this.storage.get('musics') == null){
      await this.storage.set('musics',this.musicas);
    }
    this.musicas = await this.storage.get('musics');
    
    let temp:any = []
    let m:any = "";
    for(m of this.musicas){
      if(this.data.video_ids.indexOf(m.videoId ?? "") != -1){
        temp.push(m)
      }
    }
    
    this.musicas = temp;
    this.tocando = false
    this.tocando_id = 0;
  }

  ngAfterViewInit() {
    console.log(this.musicasContainer.toArray())
    this.MusicTocando = this.musicasContainer.toArray()[this.tocando_id]
  }

  musicaTerminou(){
    this.proximo();
  }

  loadPosition(){
    this.MusicTocando = this.musicasContainer.toArray()[this.tocando_id]
  }

  async play(){
    this.loadPosition()
    await this.MusicTocando.playPause();
    this.MusicTocando.tocando = true;
    this.tocando = true;
  }
  
  async stop(){
    if(this.tocando){
      this.tocando = false;
      this.MusicTocando.player.stop();
      this.MusicTocando.tocando = false;
    }
  }

  async anterior(){
    if(this.tocando_id-1 == -1){
      this.tocando_id = this.musicasContainer.length -1; 
    }
    this.tocando_id -= 1
    this.stop()
    this.play()
  }

  async proximo(){
    if(this.tocando_id == this.musicasContainer.length -1){
      this.tocando_id = 0;
    }
    this.tocando_id+=1
    this.stop()
    this.play()
  }
}
