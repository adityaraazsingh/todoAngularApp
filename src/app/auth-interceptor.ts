import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', 'Bearer asdasdasdasdasd'),
  });
  return next(reqWithHeader);
};
