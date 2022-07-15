import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenStorageService) {};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const roles = this.tokenService.getUser().roles;

      const rolesPara = route.data["roles"] as Array<string>;
      let searchRole = 'ADMIN';
      if (rolesPara) {
        searchRole = rolesPara[0].toUpperCase();
      }
      
      if (roles) {
        const rolesArray = roles as Array<string>
        if (rolesArray.indexOf(searchRole) != -1) return true;
      };

      this.router.navigate(['/login']);
      return true;
  }
}