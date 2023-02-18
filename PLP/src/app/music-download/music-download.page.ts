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

  ngOnInit() {
    this.load().then(()=>{

    })
  }

  async download(){
    let res = await this.YtbMusicDownload.getMusic(this.variables.videoId);

    while(res.stats != "finished"){
      let update_in:any = res.progress?.estimative;
      if(update_in == undefined){
        update_in = 3000;
      }
      await new Promise(r => setTimeout(r, update_in));
      res = await this.YtbMusicDownload.getMusic(this.variables.videoId);
    }
    res.file = LZString.compress(res.file ?? "")
    this.musicas.push(res);
    this.save()
  }

}
