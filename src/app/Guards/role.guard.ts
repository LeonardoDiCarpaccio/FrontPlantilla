import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUserRole = this.auth.getRole();
    const allowedRoles = route.data['roles'];

    if (!currentUserRole || !allowedRoles.includes(currentUserRole)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
