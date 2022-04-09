import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router} from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private router: Router,
    private sStorage: LocalStorageService
  ) {}

  canActivate(): boolean {
    const isLoggedIn = this.sStorage.getLocalStorage();
    if (isLoggedIn) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
