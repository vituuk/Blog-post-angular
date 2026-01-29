import {Component, inject} from '@angular/core';
import {AuthCardWrapperComponent} from '../../../../components/auth-card-wrapper/auth-card-wrapper.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    AuthCardWrapperComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  title = 'Welcome Back';
  btnText = 'Sign In';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.authService.login(this.form.getRawValue()).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  onGoogle() {
    // placeholder for future Google integration
  }
}
