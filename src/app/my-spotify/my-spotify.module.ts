
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySpotifyRoutingModule,adminComponents } from './my-spotify-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {petitionSpotify} from '../providers/petitionspotify.service'
@NgModule({
    imports: [
      CommonModule,
      MySpotifyRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule
   
    ],
    declarations: [adminComponents, LoginComponent],
    providers:[petitionSpotify]
  })
  export class MySpotifyModule {}