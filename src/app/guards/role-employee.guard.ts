import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const roleEmployeeGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  if (typeof sessionStorage !== 'undefined' && (sessionStorage.getItem("SESSION_STORAGE_ROL") == "EMPLOYEE" ||sessionStorage.getItem("SESSION_STORAGE_ROL") == "SELLER")) {
    // Hay una sesión, permitir el acceso
    return true;
  } else {
    // No hay una sesión, redirigir a la página de inicio de sesión
    router.navigate(['/login']);
    return false;
  }
  
};
