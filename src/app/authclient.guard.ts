import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthclientService } from './authclient.service';

@Injectable({
  providedIn: 'root'
})
export class AuthclientGuard implements  CanActivate {

  constructor(private router: Router,
              private authClientService: AuthclientService) { }

  canActivate(): boolean {
    const currentUser = this.authClientService.isLoggedIn;

    if (currentUser) {
      // authorised so return true
      return true;
  }
  // not logged in so redirect to login page with the return url
  this.router.navigate(['/signup']);
  return false;
  }
}