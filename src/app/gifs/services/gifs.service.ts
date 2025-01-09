import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first } from 'rxjs';
import { Gif, SearchResponse } from '../interfaces/gif.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public giflist : Gif[]= [];
  private _tagsHistory: string[]=[];
  private apiKey : string = environment.giphyApiKey;
  private serviceUrl : string = 'https://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }
  private organizeHistory(tag:string){
    tag=tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory= this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag)
    this._tagsHistory=this.tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
  localStorage.setItem('history',JSON.stringify(this.tagsHistory))
  }

  private loadLocalStorage():void{
    if (!localStorage.getItem('history'))
    this._tagsHistory= JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length===0)return;
    this.searchTag(this._tagsHistory[0]);

  }
  async searchTag(tag:string):Promise<void>{
    if (tag.length === 0) return ;
    this.organizeHistory(tag)
    const params= new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','12')
    .set('q',tag)


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp=>{

    this.giflist = resp.data;
    });




  }


}
