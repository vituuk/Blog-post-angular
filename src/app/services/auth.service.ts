import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';
import {LoginProps, RegisterProps} from '../types/auth';
import {UserToken} from '../types/user-token';
import {HttpClientService} from './http-client.service';
import {LocalStorageEnum} from '../types/enums/local-storage.enum';
import {BaseData} from '../types/base-data';
import {RequestOption} from '../types/request-option';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange$: BehaviorSubject<boolean>;
  isAuth: boolean;
  permissions: string[] = [];
  userId: string | null;
  forceChangePassword;

  private refreshTokenPath = '/v1/auth/refresh-token';

  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    private localStorageService: LocalStorageService,
  ) {
    this.authChange$ = new BehaviorSubject<boolean>(this._isAuth);

    this.isAuth = this._isAuth;
    this.userId = this._userId;
    this.forceChangePassword = this._forceChangePassword;
    this.permissions = this._permissions;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.isAuth != this._isAuth) {
          this.markStatusChange();
        }
      }
    });
  }

  login(data: LoginProps) {
    return this.httpClientService
      .postJSON<{
        success: boolean;
        data: UserToken & { user: any };
      }>('/v1/auth/login', {data, isLoading: true})
      .pipe(
        map((res) => {
          this._setAuth(res);
        }),
      );
  }

  register(data: RegisterProps) {
    return this.httpClientService
      .postJSON<{
        success: boolean;
        data: UserToken & { user: any };
      }>('/v1/users/register', {data, isLoading: true})
      .pipe(
        map((res) => {
          this._setAuth(res);
        }),
      );
  }

  loginWithGoogle(data: { token: string }) {
    return this.httpClientService
      .postJSON<{
        success: boolean;
        data: UserToken & { user: any };
      }>('/v1/auth/google', {data, isLoading: true})
      .pipe(
        map((res) => {
          this._setAuth(res);
        }),
      );
  }

  logInWithFacebook(data: { token: string }) {
    return this.httpClientService
      .postJSON<{
        success: boolean;
        data: UserToken & { user: any };
      }>('/v1/auth/facebook', {data, isLoading: true})
      .pipe(
        map((res) => {
          this._setAuth(res);
        }),
      );
  }

  oauthLogin(data: { oauth_access_token: string }) {
    return this.httpClientService
      .postJSON<{
        success: boolean;
        data: UserToken & { user: any };
      }>('/v1/auth/oauth/login', {data, isLoading: true})
      .pipe(
        map((res) => {
          this.localStorageService.set(
            LocalStorageEnum.UserId,
            res.data.user._id!,
          );
          this.localStorageService.set(
            LocalStorageEnum.Token,
            res.data.access_token,
          );
          this.localStorageService.set(
            LocalStorageEnum.RefreshToken,
            res.data.refresh_token,
          );
          this.localStorageService.setArray(
            LocalStorageEnum.userPermissions,
            res.data.user.permissions,
          );
          this.localStorageService.set(
            LocalStorageEnum.ForceChangePassword,
            !!res.data.user.forceChangePassword ? '1' : '',
          );
          this.localStorageService.set(
            LocalStorageEnum.GeneralLedger,
            res.data.user.general_ledger._id,
          );
          this.markForceChangePasswordChange();
          this.markStatusChange();
          return res;
        }),
      );
  }

  refreshToken() {
    return this.httpClientService.postJSON<BaseData<UserToken>>(
      this.refreshTokenPath,
      {},
    );
  }

  isRefreshTokenUrl(url: string) {
    return url == this.httpClientService.getUrl(this.refreshTokenPath);
  }

  logout() {
    if (this.isAuth) {
      this.httpClientService
        .postJSON<{ success: boolean; data: UserToken & { user: any } }>(
          '/v1/auth/logout',
          {
            data: {
              refresh_token: this.localStorageService.get(
                LocalStorageEnum.RefreshToken,
              ),
              access_token: this.localStorageService.get(
                LocalStorageEnum.Token,
              ),
            },
            isLoading: false,
            isAlertError: false,
          },
        )
        .subscribe();
    }
    this.localStorageService.delete(LocalStorageEnum.UserId);
    this.localStorageService.delete(LocalStorageEnum.Token);
    this.localStorageService.delete(LocalStorageEnum.RefreshToken);
    this.localStorageService.delete(LocalStorageEnum.userPermissions);
    this.localStorageService.delete(LocalStorageEnum.ForceChangePassword);
    this.localStorageService.delete(LocalStorageEnum.GeneralLedger);
    this.markStatusChange();
  }

  getProfile(
    data?: {
      populate?: string;
      select?: string;
      [key: string]: any;
    },
    options?: RequestOption,
  ) {
    return this.httpClientService
      .getJSON<BaseData<any>>('/v1/auth/profile', {
        data,
        isAlertError: options?.isAlertError ?? true,
        isLoading: options?.isLoading ?? true,
      })
      .pipe(
        map((res) => {
          this.localStorageService.set(
            LocalStorageEnum.ForceChangePassword,
            !!res.data.forceChangePassword ? '1' : '',
          );
          if (
            typeof res.data.permission_groups?.length &&
            typeof res.data.permission_groups?.[0] === 'object'
          ) {
          }
          return res.data;
        }),
      );
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.httpClientService
      .postJSON('/v1/auth/password', {
        data: {password: oldPassword, newPassword: newPassword},
        isAlertError: true,
        isLoading: true,
      })
      .pipe(
        map((res) => {
          this.localStorageService.set(
            LocalStorageEnum.ForceChangePassword,
            '',
          );
          this.markForceChangePasswordChange();
          return res;
        }),
      );
  }

  private markForceChangePasswordChange() {
    this.forceChangePassword = this._forceChangePassword;
    if (this.forceChangePassword) {
      this.router.navigateByUrl('/v1/change-password');
    }
  }

  private markStatusChange() {
    this.isAuth = this._isAuth;
    this.userId = this._userId;
    this.forceChangePassword = this._forceChangePassword;
    this.permissions = this._permissions;
    this.authChange$.next(this._isAuth);
  }

  private get _isAuth(): boolean {
    return this.localStorageService.get(LocalStorageEnum.Token) !== null ||
      this.localStorageService.get(LocalStorageEnum.RefreshToken) !== null;
  }

  private get _userId(): string | null {
    return this.localStorageService.get(LocalStorageEnum.UserId);
  }

  private get _forceChangePassword(): boolean {
    return !!this.localStorageService.get(LocalStorageEnum.ForceChangePassword);
  }

  private get _permissions(): string[] {
    return this.localStorageService.getArray(LocalStorageEnum.userPermissions);
  }

  private _setAuth(res: any) {
    this.localStorageService.set(
      LocalStorageEnum.UserId,
      res.data.user._id!,
    );
    this.localStorageService.set(
      LocalStorageEnum.Token,
      res.data.access_token,
    );
    this.localStorageService.set(
      LocalStorageEnum.RefreshToken,
      res.data.refresh_token,
    );
    this.localStorageService.set(
      LocalStorageEnum.ForceChangePassword,
      !!res.data.user.forceChangePassword ? '1' : '',
    );
    this.markForceChangePasswordChange();
    this.markStatusChange();
    return res;
  }
}
