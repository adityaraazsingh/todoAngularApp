import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";

export const authGuard : CanMatchFn =(route , segments) => {
    const router = inject(Router);

    const savedToken = window.localStorage.getItem('saved-token');
    let token: string | null = null;

    if (savedToken) {
        const parsed = JSON.parse(savedToken);
        token = parsed.token;
    }

    if (token) {
       return true;
    }else{
        return router.createUrlTree(['/login']);
    }
}