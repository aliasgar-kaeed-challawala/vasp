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
export class AdminGuard implements CanActivate {
  constructor(private cognitoService: CognitoService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cognitoService.getUser().then((user) => {
      if (user.attributes['custom:role'] === 'admin') {
        return true;
      } else {
        this.router.navigate(['/signIn'], {
          queryParams: { state: 'not-an-admin' },
        });
        return false;
      }
    });
  }
}
