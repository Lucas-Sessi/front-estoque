import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginService } from '../services/login';

export const verifyTokenGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.verifyToken().pipe(
    map(response => {
      if (response.data.valid) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(error => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
