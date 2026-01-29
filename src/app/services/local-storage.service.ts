import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LocalStorageEnum} from '../types/enums/local-storage.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get(key: LocalStorageEnum): string | null {
    if (!this.isBrowser) return null;
    const prefix = btoa(key).replace(/=/g, '');
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      const base64 = atob(item).replace(prefix, '');
      return atob(base64);
    } catch {
      return '';
    }
  }

  set(key: LocalStorageEnum, value: string) {
    if (!this.isBrowser) return;
    const prefix = btoa(key).replace(/=/g, '');
    const base64 = btoa(value);
    localStorage.setItem(key, btoa(prefix + base64));
  }

  setArray(key: LocalStorageEnum, values: string[]) {
    if (!this.isBrowser) return;
    this.set(key, values.toString());
  }

  getArray(key: LocalStorageEnum): string[] {
    if (!this.isBrowser) return [];
    const value = this.get(key);
    return value ? value.split(',') : [];
  }

  delete(key: LocalStorageEnum) {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }
}
