import {
  Component,
  Inject,
  Injector,
  OnInit,
  PLATFORM_ID,
  signal,
  effect,
} from '@angular/core';
import {isPlatformBrowser, NgForOf, NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MenuItemModel} from '../../../types/menu-item';
import {MatIconButton} from '@angular/material/button';
import {fromEvent} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {BaseCrudService} from '../../../services/base-crud.service';
import {CategoryProps} from '../../../types/category';
import {LanguageEnum} from '../../../types/enums/language.enum';
import {ToggleSwtichesComponent} from '../../toggle-swtiches/toggle-swtiches.component';
import {MatDivider} from '@angular/material/divider';
import {ThemeService} from '../../../services/theme.service';
import {Theme} from '../../../types/theme';
import {MatDivider} from '@angular/material/divider';

const MENUS: MenuItemModel[] = [
  {
    title: {
      en: 'Home',
      km: 'ទំព័រដើម',
    },
    route: 'home',
  },
  {
    title: {
      en: 'Contact',
      km: 'ទំនាក់ទំនង',
    },
    route: 'contact',
  },
];

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon,
    TranslateModule,
    ToggleSwtichesComponent,
    MatDivider,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent
  extends BaseCrudService<CategoryProps>
  implements OnInit {
  private isBrowser: boolean;
  avatar = '';
  returnUrl: string = '';
  menus: MenuItemModel[] = [];
  prevScroll: number = 0;
  isScrolled?: boolean;
  activeMenuRoute = '';
  user = signal<any>(null);
  currentLang = signal<string>(LanguageEnum.EN);
  currentTheme = signal<Theme>('light');

  constructor(
    injector: Injector,
    private authService: AuthService,
    private router: Router,
    protected translateService: TranslateService,
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    super(injector);
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.currentLang.set(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((event) =>
      this.currentLang.set(event.lang),
    );
    this.activeMenuRoute = this.router.url.split('/')[1];

    // Track theme changes
    this.currentTheme.set(this.themeService.theme());
    effect(() => {
      this.currentTheme.set(this.themeService.theme());
    });

    if (this.authService.isAuth) {
      this.authService.getProfile().subscribe((res) => {
        this.avatar = res.avatar;
        this.user.set(res);
      });
    }
  }

  openDialog(): void {
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.menus = MENUS;

      fromEvent(window, 'scroll').subscribe(() => {
        const appHeader = document.querySelector('app-header');
        const currentScroll = window.scrollY;
        this.isScrolled = currentScroll >= 16;
        if (
          currentScroll > this.prevScroll &&
          currentScroll > 164 &&
          window.innerWidth <= 992
        )
          appHeader?.classList.add('hide');
        else appHeader?.classList.remove('hide');
        this.prevScroll = currentScroll;
      });
    }
  }

  onMenuClick(route: string, categoryId?: string) {
    if (this.user() && categoryId) {
      this.create(<any>{}).subscribe();
    }
    this.router.navigate([`/${route}`]);
  }

  onLogout() {
    this.authService.logout();
    this.user.set(null);
  }

  onImageError() {
    this.avatar = '/imgs/avatar.png';
  }

  checkIsActive(param: string, route: string) {
    return param === route;
  }
}
