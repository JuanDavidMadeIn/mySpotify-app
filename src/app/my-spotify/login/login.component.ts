import { Component, OnInit } from '@angular/core';
import {petitionSpotify} from '../../providers/petitionspotify.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private contador;
  constructor(private petitionSpotify : petitionSpotify) { }

  ngOnInit() {
    let ruta = window.location.href.split("?");
    
    if(ruta.length > 1){
      if(ruta[1].search("code") != -1){
        this.notificar("Exito","Estamos cargando su contenido","success");
        this.petitionSpotify.solicitarToken(ruta[1]);
      }
      
      if(ruta[1].search("error") != -1){
        this.notificar("Error","No se ha autenticado correctamente con spotify","error");
      }
    }
  }

  public login() {
    this.notificandoEntrandaAlSistema();
    this.contador = setTimeout(()=>{
      Swal.close();
      this.petitionSpotify.login();
    },2000);
  }

  notificandoEntrandaAlSistema() {
    Swal.fire({
      title: 'Estamos procesando su solicitud',
      text: "Conectando con Spotify ....",
      type: 'success',
      showConfirmButton : true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.cancelar();
      }
    })
  }

  cancelar(){
    Swal.fire(
      'Cancelando!',
      '',
      'success'
    );

    if(this.contador){
      clearTimeout(this.contador);
    }
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
