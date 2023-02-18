import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YtbApiService {

  constructor(private http: HttpClient) { }
  
  getInfo(url:string):string {
    return "";
  }

}
