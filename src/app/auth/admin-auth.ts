import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from "@angular/router";
import { AdminService } from "../service/admin.service";

@Injectable({
    providedIn:'root'
})
class AdminPermission{

    // costruttore
    constructor(private router:Router,
        private adminService:AdminService){ }
    
        canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
            if(!this.adminService.checkAdminLoginState()){
                this.router.navigate([""]);
                return false;
            }
            return true;
        }
}

export const ADMIN_GUARD: CanActivateFn = (next:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean =>{
    return inject(AdminPermission).canActivate(next, state);
}