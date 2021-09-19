import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 constructor(
    public authService : RestService
  ) {}

  canActivate():boolean{
    return this.authService.isAuthenticacated();
  }
  
}
