import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-card.component.html',
  styleUrl: './skeleton-card.component.css',
})
export class SkeletonCardComponent {
  @Input() loading: boolean = true;
  @Input() skeletonCount: number = 0;

  skeletonItems: any[] = [];
  cardSkeletons: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'] && this.loading) {
      this.generateSkeletonItems();
      this.generateCardSkeletons();
    }

    if (changes['loading'] && !this.loading) {
      // Reset skeletonItems and cardSkeletons when actual data is loaded
      this.skeletonItems = [];
      this.cardSkeletons = [];
    }
  }

  private generateSkeletonItems(): void {
    this.skeletonItems = Array(this.skeletonCount).fill({});
  }

  private generateCardSkeletons(): void {
    this.cardSkeletons = Array(3).fill({});
  }
}