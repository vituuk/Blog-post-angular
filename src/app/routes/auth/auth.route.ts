import {Routes} from '@angular/router';


export const authRoute: Routes = [
  {
    path: 'signin',
    loadComponent: () => import('./routes/sign-in/sign-in.component').then(s => s.SignInComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./routes/sign-up/sign-up.component').then(s => s.SignUpComponent)
  }
]
