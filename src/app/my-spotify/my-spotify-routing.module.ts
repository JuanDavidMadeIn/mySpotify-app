
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MySpotifyComponent } from "./my-spotify.component";
import { LoginComponent } from './login/login.component'

const routes: Routes = [

  {
    path: '', component: LoginComponent,
    //canActivate: [AuthGuard],
    children: [
      //{ path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule', canActivate: [AdminAuthGuardService], data: { role: ['superadmin', 'administrador','contabilidad','seguridad'] } },
     /*  {
        path: 'funcionarios', loadChildren: './funcionarios/funcionarios.module#FuncionariosModule', canActivate: [AdminAuthGuardService],
        data: { role: ['superadmin', 'administrador','seguridad','recursos'] }
      }, */
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'spotify', component: MySpotifyComponent }

];

export const adminComponents = [MySpotifyComponent,LoginComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MySpotifyRoutingModule { }
