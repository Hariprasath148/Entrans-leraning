import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../service/auth';
import { inject } from '@angular/core';

export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const id = route.params['id'];
  const user = authService.getUser();

  if(!route.data['roles'].includes(user.role)) { 
    router.navigate(['dashboard']);
    return false;
  }
  
  if(id && user.role === "User" && id != user.id) {
    router.navigate(['dashboard']);
    return false;
  }

  return true;
};
