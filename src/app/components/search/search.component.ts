import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent  {

  artistas: any [] = [];
 loading: boolean;
  constructor(private spotify:SpotifyService) { }
        
  
  //utilizando el termino:string estoy atrapando lo que envian desde el html en el keyup
buscar (termino:string){
 console.log(termino);
 
 this.loading = true;
 this.spotify.getArtistas( termino )
  .subscribe( (data: any) => { 
    console.log( data );

    this.artistas= data;
    this.loading = false;
  });
};

}
