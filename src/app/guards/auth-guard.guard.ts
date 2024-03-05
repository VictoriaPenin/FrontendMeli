import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject (AuthServiceService);
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem("SESSION_STORAGE_KEY") !== null) {
    // Hay una sesión, permitir el acceso
    return true;
  } else {
    // No hay una sesión, redirigir a la página de inicio de sesión
    router.navigate(['/login']);
    return false;
  }
};
