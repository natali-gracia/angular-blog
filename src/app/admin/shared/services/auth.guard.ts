import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.auth.loguot();
    this.router.navigate(['/admin', 'login'], {
      queryParams: {
        loginAgain: true,
      },
    });
    return false;
  }

  //   canActivateChild(
  //     route: ActivatedRouteSnapshot,
  //     state: RouterStateSnapshot
  //   ): Observable<boolean> | Promise<boolean> | boolean {
  //     return this.canActivate(route, state);
  //   }
}
