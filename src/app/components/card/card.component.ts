import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleProps } from '../../types/article';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() article!: ArticleProps;

  getAuthorUsername(): string {
    return '@' + (this.article.author?.name?.replace(/\s+/g, '') || 'user');
  }

  getFormattedDate(): string {
    const date = new Date(this.article.published_at);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  }
}
