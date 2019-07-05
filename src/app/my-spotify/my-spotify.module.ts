
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySpotifyRoutingModule,adminComponents } from './my-spotify-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      CommonModule,
      MySpotifyRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModalModule
    ],
    declarations: [adminComponents, LoginComponent],
    providers:[]
  })
  export class MySpotifyModule {}