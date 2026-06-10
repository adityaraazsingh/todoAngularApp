import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (req.url.includes('/api/users')) {
    return next(req);
  }

  const savedToken = window.localStorage.getItem('saved-token');

  let token: string | null = null;

  if (savedToken) {
    const parsed = JSON.parse(savedToken);
    token = parsed.token.token;
  }

  if (token) {
    console.log('Token found in localStorage:', token);
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(reqWithHeader);
  }

  return next(req);
};