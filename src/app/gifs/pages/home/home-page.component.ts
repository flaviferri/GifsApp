import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',

})
export class HomePageComponent {

  constructor( private gifsServide : GifsService){}

  get gifs(): Gif[]{
    return this.gifsServide.giflist;
  }

}
