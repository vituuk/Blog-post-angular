import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {LocalStorageEnum} from '../types/enums/local-storage.enum';
import {AuthService} from '../services/auth.service';
import {APIResponseCodeEnum} from '../types/enums/api-response-code.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService,
    ) {
    }

    isRefreshingToken: boolean = false;
    tokenBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
        '',
    );

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const refresh_token = this.localStorageService.get(
            LocalStorageEnum.RefreshToken,
        );
        let token = this.localStorageService.get(LocalStorageEnum.Token);
        const isRefreshTokenRequest = this.authService.isRefreshTokenUrl(req.url);
        if (isRefreshTokenRequest) {
            if (refresh_token) {
                req = this.addToken(req, refresh_token);
            }
        } else if (token) {
            req = this.addToken(req, token);
        }
        return next.handle(req).pipe(
            catchError((err) => {
                if (err.status === APIResponseCodeEnum.expired_token) {
                    if (isRefreshTokenRequest) {
                        this.authService.logout();
                    } else if (refresh_token) {
                        if (!this.isRefreshingToken) {
                            this.isRefreshingToken = true;
                            // Reset here so that the following requests wait until the token
                            // comes back from the refreshToken call.
                            this.tokenBehaviorSubject.next('');
                            // get a new token via userService.refreshToken
                            return this.authService.refreshToken().pipe(
                                switchMap((res) => {
                                    this.localStorageService.set(
                                        LocalStorageEnum.Token,
                                        res.data.access_token,
                                    );
                                    this.localStorageService.set(
                                        LocalStorageEnum.RefreshToken,
                                        res.data.refresh_token,
                                    );
                                    this.tokenBehaviorSubject.next(res.data.access_token);
                                    return next.handle(this.addToken(req, res.data.access_token));
                                }),
                                catchError((err) => {
                                    // If we don't get a new token, we are in trouble so logout.
                                    if (this.authService.isRefreshTokenUrl(err.url)) {
                                        this.authService.logout();
                                    }
                                    return of(err);
                                }),
                                finalize(() => {
                                    this.isRefreshingToken = false;
                                }),
                            );
                        } else {
                            return this.tokenBehaviorSubject.pipe(
                                filter((token) => token != ''),
                                take(1),
                                switchMap((token) => {
                                    return next.handle(this.addToken(req, token));
                                }),
                            );
                        }
                    } else {
                        this.authService.logout();
                    }
                } else if (err.status === APIResponseCodeEnum.invalid_token) {
                    this.authService.logout();
                }
                return throwError(() => err);
            }),
        );
    }

    private addToken(req: HttpRequest<any>, token: string) {
        return req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token,
            },
        });
    }
}
