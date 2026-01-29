import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../components/card/card.component';
import { StoryInterestComponent } from '../../../components/story-interest/story-interest.component';
import { TrendingComponent } from '../../../components/trending/trending.component';
import { MOCK_ARTICLES } from '../../../constants/card';
import { ArticleProps } from '../../../types/article';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    StoryInterestComponent,
    TrendingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  allArticles: ArticleProps[] = MOCK_ARTICLES;
  articles: ArticleProps[] = MOCK_ARTICLES;
  selectedCategory: string | null = null;

  constructor() {}

  onCategoryFilter(categoryName: string | null) {
    this.selectedCategory = categoryName;

    if (!categoryName) {
      // Show all articles when no category is selected
      this.articles = this.allArticles;
    } else {
      // Filter articles by category name
      this.articles = this.allArticles.filter(
        (article) =>
          article.category.name_en.toLowerCase() === categoryName.toLowerCase(),
      );
    }
  }
}
