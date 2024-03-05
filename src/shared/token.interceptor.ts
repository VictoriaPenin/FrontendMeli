import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('SESSION_STORAGE_KEY');
  if(req.url.includes('/auth/register-seller')||req.url.includes('/auth/login')){
    return next(req);
  }
  const authReq = authToken
  ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  : req;

return next(authReq);
};


