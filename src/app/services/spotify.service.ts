import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Map utilizamos para filtrar lo que traemos del as api
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(private http: HttpClient) {
    console.log("spotify service listo")
  }

  
  


  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query} `;

    // creamos una constante para definir el uso de los permisos que utilizamos en postman(luego los utilizamos en la funcion de abajo)
    const headers = new HttpHeaders({
      "Authorization": "Bearer BQDrYWM76OPrL5W0v_tTSA8MCReOqOTDXv_s9WZcQXaOp6viAz1Q8C0tWgl6lv7Kxr2R9GBg80JqwxaJdC4"
    });

    return this.http.get(url, { headers });
  }

  //servicio para poner los nuevos lanzamientos en las cartas
  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=21")
      .pipe(map((data) => data["albums"].items));
  }

  //this.http.get("https://api.spotify.com/v1/browse/new-releases?limit=21",  { headers })
  // .pipe(map((data) => {
  //    return data["albums"].items;
  //  }))
  //                        }


  //servicio para buscar artistas
  getArtistas(termino: string) {
    //inyectamos el termino que recibimos desde el html
    return this.getQuery(`search?query=${termino}&type=artist&offset=0&limit=15`)
    .pipe(map((data) => data["artists"].items)); //manera simple de escribirlo arriba esta completo

  }

  getArtista(id: string) {
    //inyectamos el id que recibimos desde el html
    return this.getQuery(`artists/${id}`);
       //.pipe(map((data) => data["artists"].items)); 

  }

  getTopTracks(id: string) {
    //inyectamos el id que recibimos desde el html
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
        .pipe(map((data) => data["tracks"])); 
  }
}
