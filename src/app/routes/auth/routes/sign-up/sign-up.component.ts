import {Component, inject} from '@angular/core';
import {AuthCardWrapperComponent} from '../../../../components/auth-card-wrapper/auth-card-wrapper.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    AuthCardWrapperComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    title = 'Join Us Today!';
    btnText = 'Sign Up';

    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    form = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      otp: [''],
    });

    onSubmit() {
      if (this.form.invalid) return;
      this.authService.register(this.form.getRawValue()).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }

    onGoogle() {
      // placeholder for future Google integration
    }
}
