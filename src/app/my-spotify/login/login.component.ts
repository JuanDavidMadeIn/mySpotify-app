import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public frmLogin : FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.frmLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public login() {
    if (!this.frmLogin.valid) {
      this.notificar("Advertencia", "Se debe llenar los campos y/o algunos estan invalidos", "warning");
      return;
    }
    if (this.frmLogin.value.email.indexOf('@') == -1) return;

    console.log(this.frmLogin.value);
    this.notificandoEntrandaAlSistema();

    




    //this.auth.login(this.frmLogin.value.email.toLowerCase(),this.frmLogin.value.password);
  }

  notificandoEntrandaAlSistema() {
    Swal.fire({
      title: 'Estamos procesando su solicitud',
      text: "Comprobando Información",
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
    this.frmLogin.setValue({
      email : '',
      password : ''
    });

    Swal.fire(
      'Cancelando!',
      '',
      'success'
    );
  }

  notificar(title, text, type, footer?) {
    Swal.fire({
      type: type,
      title: title,
      text: text,
      footer: footer
    })
  }

  getError(form: any, control) {
    let errors = form.controls[control].errors;
    if (!errors) return "";
    let keysErrors = Object.keys(errors);
    if (keysErrors.length == 0) return "";

    switch (keysErrors[0]) {
      case "required":
        return "Este campo es obligatorio";

      case "email":
        return "Verifique el correo su formato se encuentra invalido";

      case "minlength":
        return "La longitud minima de caracteres es de: " + errors.minlength["requiredLength"];

      case "pattern":
        return "Caracteres invalidos";
    }
  }


}
