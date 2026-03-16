import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { Auth } from '../service/auth';

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth);
  const router = inject(Router);

  return authService.validate().pipe(
    map((res) => {
      authService.setUser(res);
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );

};