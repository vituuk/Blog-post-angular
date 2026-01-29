import { Component } from '@angular/core';
import {AuthCardWrapperComponent} from '../../../../components/auth-card-wrapper/auth-card-wrapper.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    AuthCardWrapperComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  title = 'Welcome Back';
  btnText = 'Sign In';
}
