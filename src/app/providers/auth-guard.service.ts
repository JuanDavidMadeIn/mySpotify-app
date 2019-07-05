/* 
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
    return this.auth.user$.pipe(map(res => {
      if (!res) {
        this.router.navigate(['login'])
        return false;
      }
      return true;
    }));
  }

}
 */