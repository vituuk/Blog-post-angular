import {Component, Input, signal} from '@angular/core';
import {
  MatFormField,
  MatInput,
  MatPrefix,
  MatSuffix,
} from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgOptimizedImage } from '@angular/common';

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
    NgOptimizedImage,
    NgIf,
    MatPrefix,
    MatSuffix,
  ],
  templateUrl: './auth-card-wrapper.component.html',
  styleUrl: './auth-card-wrapper.component.scss',
})
export class AuthCardWrapperComponent {
  @Input() title!: string;
  @Input() btnText!: string;

  hidePassword = signal(true);

  togglePasswordVisibility(event: MouseEvent): void {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }
}
