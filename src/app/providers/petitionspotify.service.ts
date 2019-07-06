
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class petitionSpotify {
  private user;
  private respuestaAuth;

  constructor(private http: HttpClient,
              private router : Router) { }

  login(){
    var scopes = 'user-read-private user-read-email user-modify-playback-state user-library-modify'
    let urlLogin = 'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + 'c1e2d5bb35ee45a1964cddd54b6110ae' + 
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(`${window.location.href}callback`);
      window.open(urlLogin);
      self.close();
  }

  solicitarToken(parametros){
    let parametro = parametros.split("state=")[0];
    let codigo = parametro.split("code=")[1];
     this.http.post("https://us-central1-myspotifyapp-19dc1.cloudfunctions.net/loginSpotify",{
      codigo : codigo,
      redirect_uri : `${window.location.href.split("?")[0]}callback`
    }).subscribe((res:any) =>{
      let response = JSON.parse(res.body);
      if(response.error){
        this.notificar("Ops","Ha ocurrido un error de internet, debera ingresar de nuevo","error");
        this.router.navigate([''])
      }else{
        this.respuestaAuth = response;
        localStorage.setItem("token",this.respuestaAuth.access_token);
        this.router.navigate(['spotify']);
      }
    });
  }


  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        `"Bearer ${localStorage.getItem("token")}"`
    });
    return this.http.get(url, { headers });
  }

  putQuery(query:string,body?){
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        `"Bearer ${localStorage.getItem("token")}"`
    });

    if(body){
      return this.http.put(url,body, { headers });
    }
    //console.log(query);
    return this.http.put(url, { headers });
  }

  getUsuario(){
    return this.user;
  }

  notificar(title, text, type, footer?) {
    Swal.fire({
      type: type,
      title: title,
      text: text,
      footer: footer
    })
  }


}
