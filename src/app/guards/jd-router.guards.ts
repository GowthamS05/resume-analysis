import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class JDRouterGuard implements CanActivate {
  private storageService=inject(StorageService)
   private toastService = inject(ToastService)
    private router =inject(Router)
  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.storageService.getData('jd_score')){
      return true
    }
    this.toastService.showError('Unauthorized URL','Error');
    this.router.navigate(['/home'])
    return false

  }
}
