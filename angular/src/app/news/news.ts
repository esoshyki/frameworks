import { Component } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  providers: [
    NewsService
  ],
  selector: 'news',
  templateUrl: './news.html',
  styleUrls: [
    './news.css'
  ]
})
export class NewsComponent {
  dataService
  constructor(dataService: NewsService) {
    this.dataService = dataService;
  }

  data() {
    return this.dataService.getData()
  }

  ngOnInit() {
    this.dataService.fetchData()
  }

}