
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySpotifyRoutingModule,adminComponents } from './my-spotify-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    imports: [
      CommonModule,
      MySpotifyRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule
   
    ],
    declarations: [adminComponents, LoginComponent],
    providers:[]
  })
  export class MySpotifyModule {}