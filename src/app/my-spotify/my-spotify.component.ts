import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {petitionSpotify} from '../providers/petitionspotify.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-spotify',
  templateUrl: './my-spotify.component.html',
  styleUrls: ['./my-spotify.component.scss']
})
export class MySpotifyComponent implements OnInit {
  public vista = true;
  public albumes = true;
  public user;
  public albumProceso ;
  public albums;
  public imagen;
  public tracksAlbum;
  constructor(private petitionSpotify : petitionSpotify,
              private router : Router) { }

  ngOnInit() {
    this.user = this.petitionSpotify.getQuery("me").subscribe((info:any)=>{
      this.user = info;
      this.imagen = this.user.images[0].url;
    });

    this.albums = this.petitionSpotify.getQuery("browse/new-releases?limit=20").subscribe((albums:any)=>{
      this.albums = albums.albums;
      Swal.close();
    });
  }
  
  search(value){
    if(value.length <= 3){
      this.notificar('','Debe tener almenos 3 caracteres para realizar la busqueda','error');
      return;
    }

    this.petitionSpotify.getQuery(`search?q=${encodeURIComponent(value)}&type=album&limit=20`).subscribe((albumes:any)=>{
      this.albumes = true;
      this.albums = albumes.albums; 
    })
  }

  reproducirAlbum(album){
    this.albumes = false;
    this.albumProceso = album;
    this.petitionSpotify.getQuery(`albums/${album.id}/tracks?limit=20`).subscribe((tracks)=>{
      this.tracksAlbum = tracks;
    });
  }

  informacionAlbum(album){
    Swal.fire({
      title: album.name,
      html: `<p>Artista: ${album.artists[0].name}</p>`+
      `<p>Fecha Publicacion: ${album.release_date}</p>`+
      `<p>Total Tracks: ${album.total_tracks}</p>`+
      `<a href="${album.external_urls.spotify}" target="_blank">Mirar en Spotify</a>`,
      imageUrl: album.images[0].url,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: `Foto de ${album.name}`,
      animation: false
    })
  }
  
  reproducirTrack(track){
    this.notificar("Informacion","Para poder reproducir un track se debe tener el device_id del computador, por lo tanto este no se podra reporducir","info");
     this.petitionSpotify.putQuery("me/player/play",{
      "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
      "offset": {
        "position": 5
      },
    }).subscribe((play)=>{
      console.log(play)
    }); 
  }

  calcularTiempo(milisegundos){
    var minutos = Math.floor(milisegundos / 60000);
    var segundos = ((milisegundos % 60000) / 1000).toFixed(0); 
    return minutos + ":" + (parseInt(segundos) < 10 ? '0' : '') + segundos;
  }

  agregarAlbumFavoritos(album){
    this.petitionSpotify.putQuery(`me/albums?ids={${album.id}}`).subscribe(data=>{
      this.notificar("Exito","Este album se agrego correctamente","success");
    });
  }
  
  notificar(title, text, type, footer?) {
    Swal.fire({
      type: type,
      title: title,
      text: text,
      footer: footer
    })
  }

  informacionUsuario(){
    this.notificar('Usuario','Informacion Usuario','success');
  }

  verInfo(){
    Swal.fire({
      title: this.user.display_name,
      text: `Correo : ${this.user.email}, seguidores: ${this.user.followers.total}`,
      imageUrl: this.user.images[0].url,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: `Foto de ${this.user.display_name}`,
      animation: false
    })
  }

  cerrarSesion(){
    this.router.navigate(['']);
  }

  

}
