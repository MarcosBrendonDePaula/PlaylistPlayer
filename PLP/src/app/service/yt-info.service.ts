import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YtInfoService {
  apiUrl = "https://www.googleapis.com/youtube/v3"
  
  constructor(private http: HttpClient) { }
  async getPlayList(PlayListId:string) {
    let resp = await lastValueFrom(
      this.http.get(`${this.apiUrl}/playlists?key=${environment.youtube_key_api}&id=${PlayListId}&maxResults=50&part=snippet`, { responseType: 'json' })
    )
    return resp
  }

  async getPlayListItems(PlayListId:string) {
    let resp = await lastValueFrom(
      this.http.get(`${this.apiUrl}/playlistItems?key=${environment.youtube_key_api}&playlistId=${PlayListId}&maxResults=50&part=snippet`, { responseType: 'json' })
    )
    return resp
  }
}
