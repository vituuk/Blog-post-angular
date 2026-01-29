import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_CATEGORIES } from '../../constants/card';
import { CategoryProps } from '../../types/category';

@Component({
  selector: 'app-story-interest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-interest.component.html',
  styleUrl: './story-interest.component.scss',
})
export class StoryInterestComponent {
  categories: CategoryProps[] = MOCK_CATEGORIES;
  selectedCategory: string | null = null;

  @Output() categorySelected = new EventEmitter<string | null>();

  onCategoryClick(categoryName: string) {
    // Toggle selection: if same category clicked, deselect it
    if (this.selectedCategory === categoryName) {
      this.selectedCategory = null;
      this.categorySelected.emit(null);
    } else {
      this.selectedCategory = categoryName;
      this.categorySelected.emit(categoryName);
    }
  }

  isSelected(categoryName: string): boolean {
    return this.selectedCategory === categoryName;
  }
}
