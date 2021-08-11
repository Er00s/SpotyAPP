import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  
  //este nuevasCanciones lo utilizamos para citarlo en el HTML
  nuevasCanciones: any[] = [];

  loading: boolean;
  error: boolean = false; 
  mensajeError: string;

  constructor( private spotify: SpotifyService) {
    

     this.loading = true;
     this.error= false;
    //con el this.spotify.getNewRelases
    this.spotify.getNewReleases()
     //en el spotify service se define el return entonces utilizamos el subscribe en el home component
    .subscribe( (data: any) => {
     console.log(data);
     
     this.nuevasCanciones = data;

     this.loading=false;
     }, (errorServicio)=> {
       this.loading = false;
       this.error= true;
       console.log(errorServicio);
       this.mensajeError = errorServicio.error.error.message;
     });
  }
   

  ngOnInit() { }

}
