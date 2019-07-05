
import  { Observable ,  BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';





import {  Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable()
export class AuthService{
  
  private user = new BehaviorSubject({});

  constructor(private router: Router) {
    this.checkSate();
  }


  login(mail, pass) {
    this.esperaUsuario();
    /* this.loginMail(mail, pass)
      .then((rs) => {
        if (rs == 'error') { this.notificar("¡Error!", "Los datos que ingresaste no corresponden", "error"); return; }
        this.checkSate();
      }).catch(); */
  }

  logout() {
    this.router.navigate(["login"]);
  }

  getappUsr(){
    /* return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid)
        }
        return of(null);
      })); */
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  notificar(title, text, type, footer?) {
    Swal.fire({
      type: type,
      title: title,
      text: text,
      footer: footer
    })
  }

  checkSate(){
    /* this.getappUsr$().subscribe((e:any) =>{
      if(!e){
        this.logout();
        this.notificar("¡Error!", "Los datos que ingresaste no corresponden", "error");
        return;
      } 

      if(!e.activo){
        this.logout();
        this.notificar("Vaya","Tu usuario no tiene acceso para ingresar a la plataforma","error","Contacta a tu administrador");
        return;
      } 
      
      Swal.close();
      this.router.navigate(['/admin/pedidos']);
      this.usersSubject.next(e)}) */
  }

  esperaUsuario() {
    Swal.fire({
        title: 'Estamos procesando su petición',
        customClass: 'sweet-cms',
        html: 'Esta ventana se cerrara automaticamente, Espere por favor ...',
        onBeforeOpen: () => {
          Swal.showLoading()
        },
        onClose: () => {
          
        }
      }).then((result) => {
        if (result.dismiss !== Swal.DismissReason.timer) {
          this.esperaUsuario();
        }
      })
    }

}
