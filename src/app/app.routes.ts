import { Routes } from '@angular/router';
import { RootContainerComponent } from './components/root-container/root-container.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: RootContainerComponent,
    data: { animation: 'HomePage' },
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '',
        data: { animation: 'HomePage' },
        loadChildren: () =>
          import('./routes/home/manage-home-routes').then(
            (c) => c.manageHomeRoutes,
          ),
      },
      {
        path: 'auth',
        data: { animation: 'AuthPage' },
        loadChildren: () =>
          import('./routes/auth/auth.route').then((c) => c.authRoute),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { animation: 'NotFoundPage' },
  },
];
