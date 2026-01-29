import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../services/loading.service';
import { LanguageEnum } from '../../types/enums/language.enum';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading = signal(false);
  loadingTimeout?: any;
  previousUrl?: string;
  currentUrl?: string;
  isBrowser = false;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    public loadingService: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.translateService.addLangs(Object.values(LanguageEnum));
    const savedLang = LanguageEnum.KM;
    this.translateService.setDefaultLang(savedLang);
    this.translateService.use(savedLang);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url.split('?').reverse().pop();
      }
      if (this.currentUrl && this.currentUrl !== this.previousUrl) {
        if (event instanceof NavigationStart) {
          this.loadingService.forceStop();
          this.loadingService.setLoading(true);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.previousUrl = this.router.url.split('?').reverse().pop();
          setTimeout(() => {
            this.loadingService.setLoading(false);
          }, 100);
        }
      }
    });

    this.loadingService.isLoading$.subscribe((loading) => {
      if (this.isBrowser) {
        if (loading) {
          document.body.classList.add('app-is-loading');
        } else {
          document.body.classList.remove('app-is-loading');
        }
        if (this.loadingTimeout) {
          clearTimeout(this.loadingTimeout);
        }
        this.loadingTimeout = setTimeout(() => {
          this.isLoading.set(loading);
          this.loadingTimeout = undefined;
        }, 200);
      }
    });
  }
}
