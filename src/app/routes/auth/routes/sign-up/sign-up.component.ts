import { Component } from '@angular/core';
import {AuthCardWrapperComponent} from '../../../../components/auth-card-wrapper/auth-card-wrapper.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    AuthCardWrapperComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    title = 'Join Us Today!';
    btnText = 'Sign Up';
}

