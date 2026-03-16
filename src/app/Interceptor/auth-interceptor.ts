import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const cloneReq = req.clone({withCredentials:true});
  return next(cloneReq);
};
