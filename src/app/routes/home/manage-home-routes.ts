import {Routes} from '@angular/router';

export const manageHomeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home.component').then(c => c.HomeComponent)
  }
]
