import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-spotify',
  templateUrl: './my-spotify.component.html',
  styleUrls: ['./my-spotify.component.scss']
})
export class MySpotifyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  search(value){
    if(value.length <= 3){
      this.notificar('','Debe tener almenos 3 caracteres para realizar la busqueda','error');
      return;
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

  informacionUsuario(){
    this.notificar('Usuario','Informacion Usuario','success');
  }
}
