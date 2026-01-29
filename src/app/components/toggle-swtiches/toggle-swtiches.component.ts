import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-toggle-swtiches',
  imports: [],
  templateUrl: './toggle-swtiches.component.html',
  styleUrl: './toggle-swtiches.component.scss'
})
export class ToggleSwtichesComponent implements OnInit {
  private isBrowser: boolean;

  constructor(
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      const checkbox = document.getElementById('input') as HTMLInputElement;
      if (checkbox) {
        // Set initial checkbox state based on current theme
        checkbox.checked = this.themeService.theme() === 'dark';
        // Listen for checkbox changes
        checkbox.addEventListener('change', () => {
          this.themeService.toggleTheme();
        });
      }
    }
  }
}
