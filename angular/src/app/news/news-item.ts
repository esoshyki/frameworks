import { Component, Input } from '@angular/core';
import { NewsService } from './news.service';
import { NewsItemData } from 'src/types';

@Component({
  providers: [
    NewsService
  ],
  selector: 'news-item',
  templateUrl: './news-item.html',
  styleUrls: [
    './news.css'
  ]
})
export class NewsItemComponent {
  @Input() data!: NewsItemData;
  constructor() {
    this.data = {} as NewsItemData
  }
}