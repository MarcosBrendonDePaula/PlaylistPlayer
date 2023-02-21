import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment';

import {YtbMusic} from '../interfaces/ytb-music'
import {YtbMusicProgress} from '../interfaces/ytb-music-progress'

@Injectable({
  providedIn: 'root'
})
export class YtbMusicDownloadService {
  constructor(private http: HttpClient) { }
  
  parseYtbMusic(response:any):YtbMusic{
    
    function parseProgress(response:any):YtbMusicProgress{
      let resp:YtbMusicProgress = {
        percentage: response.percentage,
        transferred: response.transferred,
        length: response.length,
        remaining: response.remaining,
        eta: response.eta,
        runtime: response.runtime,
        delta: response.delta,
        speed: response.speed,
        estimative: response.estimative
      }
      return resp;
    }
    
    let YtbMusic = {
      videoId: response.videoId,
      progress: parseProgress(response.progress),
      stats: response.stats,
      
      file: response.file,
      youtubeUrl: response.youtubeUrl,
      videoTitle: response.videoTitle,
      artist: response.artist,
      title: response.title,
      thumbnail: response.thumbnail,
    }
    return YtbMusic;
  }

  blobToBase64(blob:Blob){
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  
  async createBlob(base64:string) {
    let res =    await fetch(base64)
    let myBlob = await res.blob()
    return myBlob;
  } 

  async getMusic(videoId:string):Promise<YtbMusic>{
    
    let resp:any = await lastValueFrom(this.http.get(`${environment.url_ytd}/audio/get/${videoId}`, { responseType: 'json' }))
    if(resp?.percentage == undefined){
      return <YtbMusic><unknown>undefined;
    }
    let response:YtbMusic = this.parseYtbMusic(resp);
    if(response.progress?.percentage != 100){
      return response;
    } 
    else {
      try {
        let file_blob = await lastValueFrom(this.http.get(response.file ?? "", { responseType: 'blob' }))
        const file = <string> await this.blobToBase64(file_blob);
        response.file = file;
      } catch (error) {
        response.file = "";
      }
      
    }
    return response;
  }

}
