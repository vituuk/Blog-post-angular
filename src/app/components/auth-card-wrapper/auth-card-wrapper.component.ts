import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {
  MatFormField,
  MatInput,
  MatPrefix,
  MatSuffix,
} from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-auth-card-wrapper',
  imports: [
    MatFormField,
    MatFormField,
    MatInput,
    MatFormField,
    MatButton,
    RouterLink,
    RouterLink,
    MatIconButton,
    MatIcon,
    NgIf,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './auth-card-wrapper.component.html',
  styleUrl: './auth-card-wrapper.component.scss',
})
export class AuthCardWrapperComponent {
  @Input() title!: string;
  @Input() btnText!: string;
   @Input() form!: FormGroup;
   @Input() isSignUp = false;
   @Output() formSubmitted = new EventEmitter<void>();
   @Output() googleClicked = new EventEmitter<void>();

  hidePassword = signal(true);

  togglePasswordVisibility(event: MouseEvent): void {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.form?.valid) {
      this.formSubmitted.emit();
    }
  }

  onGoogleClick() {
    this.googleClicked.emit();
  }
}
