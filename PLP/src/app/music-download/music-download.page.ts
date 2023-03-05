import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { YtbMusic } from '../interfaces/ytb-music';
import {YtbMusicDownloadService } from '../service/ytb-music-download.service'
import { Storage } from '@ionic/storage';
import {LZString} from 'lzstring.ts';

@Component({
  selector: 'app-music-download',
  templateUrl: './music-download.page.html',
  styleUrls: ['./music-download.page.scss'],
})
export class MusicDownloadPage implements OnInit {
  
  //@ViewChild('videoId')videoId!: ElementRef;
  musicas:Array<YtbMusic> = []

  variables = {
    videoId: "zswkH2PkQE8"
  }



  async load(){
    if(await this.storage.get('musics') == null){
      await this.storage.set('musics',this.musicas);
      console.log('novo vetor')
    }
    this.musicas = await this.storage.get('musics');
  }
  
  async save(){
    await this.storage.set('musics',this.musicas);
  }

  constructor( private YtbMusicDownload:YtbMusicDownloadService, private storage: Storage) { }

  ngOnInit() {}

  getVideoId(videoUrl:string){
    let v_id = videoUrl;
    if(videoUrl.indexOf('https://www.youtube.com/watch?v=') != -1){
      v_id = videoUrl.split('https://www.youtube.com/watch?v=')[1]
      v_id = v_id.split('&')[0]
    }
    return v_id
  }

  async download(){
    let res = await this.YtbMusicDownload.getMusic(this.getVideoId(this.variables.videoId));

    while(res.stats != "finished"){
      let update_in:any = res.progress?.estimative;
      await new Promise(r => setTimeout(r, (update_in * 60 * 1000)/4));
      res = await this.YtbMusicDownload.getMusic(this.getVideoId(this.variables.videoId));
    }
    //res.file = LZString.compress(res.file ?? "")
    let compressed = LZString.compress(res.file ?? "")
    await this.storage.set(`m-c-${res.videoId}`, compressed);
    res.file = `m-c-${res.videoId}`;
    this.musicas.push(res);
    this.save()
  }
  
}
