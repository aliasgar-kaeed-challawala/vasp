import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from '../cognito.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private cognitoService: CognitoService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cognitoService.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        return true;
      } else {
        this.cognitoService.getUser().then((user) => {
          if (user.attributes['custom:role'] === 'user') {
            this.router.navigate(['/chatbot']);
          } else {
            this.router.navigate(['/admin/dashboard']);
          }
        });
        return false;
      }
    });
  }
}
