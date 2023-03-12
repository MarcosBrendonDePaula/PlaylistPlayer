import { Component, OnInit, ViewChild} from '@angular/core';
import { IonModal, IonSearchbar } from '@ionic/angular';
import { YtInfoService } from '../service/yt-info.service';

import {YtbMusicDownloadService } from '../service/ytb-music-download.service'
import {Storage} from '@ionic/storage';
import {LZString} from 'lzstring.ts';
import {YtbMusic} from '../interfaces/ytb-music';
import {Playlist} from '../interfaces/playlist';

@Component({
  selector: 'app-play-list-download',
  templateUrl: './play-list-download.page.html',
  styleUrls: ['./play-list-download.page.scss'],
})
export class PlayListDownloadPage implements OnInit {
  
  @ViewChild('viewPlayList', { static: true }) modal!: IonModal;
  @ViewChild('DownloadMusic', { static: true }) modalMusicDownload!: IonModal;
  @ViewChild(IonSearchbar) searchbar!: IonSearchbar;

  name: string | undefined;
  
  constructor(private ytbInfo:YtInfoService, private YtbMusicDownload:YtbMusicDownloadService, private storage: Storage) { }
  
  musicas:Array<YtbMusic> = [];
  musicas_ids:any = []

  playlistId:string = "";
  playlists:Array<any> = [];
  videos:Array<any> = [];

  getPlayListLink(link:string){
    let partes = link.split("https://www.youtube.com/watch?")[1] ?? "";
    let vars = partes.split('&')
    let localized_arg = "";
    for(let v of vars) {
      if(v.indexOf('list=')!= -1){
        localized_arg = v.split('list=')[1] ?? "";
      }
    }
    return localized_arg
  }

  async find(){
    if(this.searchbar.value){
      let PlaylistId = this.searchbar.value
      let ytb_link = this.getPlayListLink(PlaylistId)
      if(ytb_link != "") 
        PlaylistId = ytb_link;
      let playlist:any = await this.ytbInfo.getPlayList(PlaylistId);
      let playlistItems:any = await this.ytbInfo.getPlayListItems(PlaylistId);
      this.playlistId = PlaylistId;
      if(playlistItems?.items.length > 0){
        this.model_vars.playlist_info = playlist?.items[0];
        this.videos = playlistItems?.items;
        this.modal.present()
      }
      
    }
  }

  async save(){
    await this.storage.set('playlists', this.playlists);
    await this.storage.set('musics', this.musicas);
  }

  checkifExist(videoId:string):boolean{
    return false;
  }

  async ngOnInit() {
    if(await this.storage.get('playlists') == null){
      await this.storage.set('playlists',this.playlists);
    }
    
    if(await this.storage.get('musics') == null){
      await this.storage.set('musics',this.musicas);
    }

    this.musicas = await this.storage.get('musics');
    for(let musica of this.musicas){
      this.musicas_ids.push(musica.videoId)
    }

    this.playlists = await this.storage.get('playlists');
  }
  
  model_vars:any = {
    playlist_info: {},
    playlist_ids:[],
    video_atual: {},
    atual_download_progress: 0,
    img_source: "",
    title: "",
    author: "",
    progress : 0.1,
    cancelar: false
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  cancelDownload() {
    this.model_vars.cancelar = true;
    this.modal.dismiss(null, 'cancel');
  }

  async removerPlayList(id:number){
    this.playlists.splice(id, 1)
    await this.storage.set('playlists', this.playlists);
  }

  async confirm() {
    this.downloadPlayList()
  }

  onWillDismiss(event: Event) {
    console.log(event)
  }
  
  async download_music(music_id:string){
    let res = await this.YtbMusicDownload.getMusic(music_id);
    if(res == undefined){
      return;
    }
    while(res.stats != "finished"){
      let update_in:any = res.progress?.estimative;
      let atual:any = res.progress?.percentage ?? 1;
      this.model_vars.atual_download_progress = (atual * 0.01)
      if(update_in == undefined){
        update_in = 1;
      }
      await new Promise(r => setTimeout(r, (update_in * 60 * 1000)/8));
      res = await this.YtbMusicDownload.getMusic(music_id);
    }
    
    let compressed = LZString.compress(res.file ?? "")
    await this.storage.set(`m-c-${res.videoId}`, compressed);
    res.file = `m-c-${res.videoId}`;
    this.musicas.push(res);
    this.save()
    this.model_vars.atual_download_progress = 0;
  }

  async downloadPlayList(){
    this.model_vars.cancelar = false;
    this.model_vars.playlist_ids = [];
    this.modalMusicDownload.present();
    this.modal.dismiss();
    let count = 1;
    
    for(let video of this.videos){
      if(this.model_vars.cancelar){
        this.modalMusicDownload.dismiss();
        return;
      }
      if(!this.modalMusicDownload.isOpen){
        this.modalMusicDownload.present();
      }
      this.model_vars.progress = ((count / this.videos.length))
      this.model_vars.video_atual = video;
      
      if(this.musicas_ids.indexOf(video?.snippet?.resourceId?.videoId) == -1){
        await this.download_music(video?.snippet?.resourceId?.videoId)
      }else{
        console.log(`${video?.snippet?.resourceId?.videoId} ja existe`)
      }
      
      this.model_vars.playlist_ids.push(video?.snippet?.resourceId?.videoId)
      count+=1;
    }
    
    let playlist_temp:Playlist = {
      title: this.model_vars.playlist_info?.snippet?.title,
      video_ids: this.model_vars.playlist_ids,
      videos:[],
      thumbnail:this.model_vars.playlist_info?.snippet?.thumbnails?.high?.url,
      id: this.playlistId
    };

    this.playlists.push(playlist_temp)
    this.save()
    this.modalMusicDownload.dismiss();
  }
}
