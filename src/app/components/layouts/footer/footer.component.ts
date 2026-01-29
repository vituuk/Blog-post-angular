import {Component} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';

const SOCIALS: { icon: string, url: string }[] = [
  {
    icon: '/icons/footer/facebook.svg',
    url: 'https://www.facebook.com/ltngnews'
  },
  {
    icon: '/icons/footer/telegram.svg',
    url: 'https://t.me/ltngnews157'
  }
];

@Component({
  selector: 'app-footer',
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  socials: { icon: string, url: string }[] = [];
  phoneNumber: string;
  year: number = new Date().getFullYear();

  constructor() {
    this.socials = SOCIALS;
    this.phoneNumber = '+855 123 456 789';
  }
}
