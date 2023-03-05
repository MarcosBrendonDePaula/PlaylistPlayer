import { Component, OnInit, Input, ViewChild, QueryList, ViewChildren} from '@angular/core';
import {Playlist} from './../../interfaces/playlist'
import {Storage} from '@ionic/storage';
import { MusicComponent } from '../music/music.component';
import { PlayListInfo } from 'src/app/interfaces/play-list-info';

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
  PlaylistInfo!:PlayListInfo;

  timer!:Date;

  @ViewChildren(MusicComponent) musicasContainer!: QueryList<MusicComponent>;
  

  constructor(private storage: Storage) { }


  async load(){
    if(await this.storage.get('musics') == null){
      await this.storage.set('musics',this.musicas);
    }

    if(await this.storage.get(`playlist_info_${this.data.id}`) == null){
      await this.storage.set(`playlist_info_${this.data.id}`,{
        last_music_played: 0,
        music_time_played: 0,
        times_played: []
      });
    }

    this.PlaylistInfo = await this.storage.get(`playlist_info_${this.data.id}`);
    this.musicas = await this.storage.get('musics');
    
    let temp:any = []
    let m:any = "";
    for(m of this.musicas){
      if(this.data.video_ids.indexOf(m.videoId ?? "") != -1){
        temp.push(m)
      }
    }
    this.musicas = temp;
  }

  async savePlayListInfo(){
    await this.storage.set(`playlist_info_${this.data.id}`, this.PlaylistInfo);
  }

  async ngOnInit() {
    await this.load()
    this.tocando = false
    this.tocando_id = this.PlaylistInfo?.last_music_played ?? 0;
  }

  ngAfterViewInit() {
    this.MusicTocando = this.musicasContainer.toArray()[this.tocando_id]
  }

  musicaTerminou(){
    this.proximo();
  }

  loadPosition(){
    this.MusicTocando = this.musicasContainer.toArray()[this.tocando_id]
  }

  async initTimer(){
    this.timer = new Date()
  }

  async play(){
    this.initTimer()
    this.loadPosition()
    await this.MusicTocando.playPause();
    this.MusicTocando.tocando = true;
    this.tocando = true;
  }
  
  async stop(){
    let time_temp:Date = new Date();
    this.PlaylistInfo.music_time_played += (time_temp.getTime() - this.timer.getTime())
    await this.savePlayListInfo()
    if(this.tocando){
      this.tocando = false;
      this.MusicTocando.player.stop();
      this.MusicTocando.tocando = false;
    }
  }

  async anterior(){
    await this.stop()
    if(this.tocando_id-1 == -1){
      this.tocando_id = this.musicasContainer.length -1; 
    }
    this.tocando_id -= 1
    this.PlaylistInfo.last_music_played = this.tocando_id;
    await this.play()
  }

  async proximo(){
    await this.stop()
    if(this.tocando_id == this.musicasContainer.length -1){
      this.tocando_id = 0;
    }
    this.tocando_id+=1
    this.PlaylistInfo.last_music_played = this.tocando_id;
    await this.play()
  }
}
