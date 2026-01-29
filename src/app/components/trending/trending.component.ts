import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRENDING_ARTICLES } from '../../constants/card';
import { ArticleProps } from '../../types/article';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent {
  trendingArticles: ArticleProps[] = TRENDING_ARTICLES;
  changeColor: any = signal('#09DE13');
  change = 0.56;
  absChange = Math.abs(this.change);
  changePrefix: any = signal('');

  constructor() {
    this.changePrefix.set(this.change > 0 ? '+' : '-');
    }

  protected getAuthorUsername(article: ArticleProps): string {
    return '@' + (article.author?.name?.replace(/\s+/g, '') || 'user');
  }

  protected getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  }
}
