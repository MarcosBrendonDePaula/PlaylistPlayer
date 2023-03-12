import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { YtbMusic, YtbMusicProgress } from '../../interfaces/youtube';
import { Storage } from '@ionic/storage';

import {LZString} from 'lzstring.ts';

import { Howl, Howler } from 'howler';

@Component({
  selector: 'music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {

  @ViewChild('ProgressBar')ProgressBar!: ElementRef;

  @Output() OnEnd = new EventEmitter();

  @Input() data!: YtbMusic;
  
  player:any;
  tocando:boolean = false;
  
  constructor(private storage: Storage) {}

  async ngOnInit() {
  }

  async createBlob(base64:string) {
    let res =    await fetch(base64)
    let myBlob = await res.blob()
    return myBlob;
  } 

  async playPause() {
    if (this.player == undefined) {
      let music = await this.createBlob(LZString.decompress(await this.storage.get(`m-c-${this.data.videoId}`) ?? ""));
      const promise = new Promise<void>((resolve) => {
        this.player = new Howl({
          src: [URL.createObjectURL(music)],
          html5: true,
          format: ['mp3', 'wav'],
          onload: () => {
            resolve();
          },
          onend: () => {
            this.OnEnd.emit();
          },
        });
      });
      await promise;
    }

    if(this.tocando){
      await this.player.pause()
    }else{
      await this.player.play();
    }
    this.tocando = !this.tocando;
  }

}