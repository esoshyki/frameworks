import { Component, Input } from '@angular/core';
import { NewsService } from './news.service';
import { Meta, NewsItemData } from 'src/types';
import { getSearchMeta } from 'src/helpers/getSearchMeta';

@Component({
  providers: [
    NewsService
  ],
  selector: 'news-item-meta',
  templateUrl: './news-item-meta.html',
  styleUrls: [
    './news.css'
  ]
})
export class NewsItemMeta {
  setPage: (v: number | null) => void
  constructor() {
    this.setPage = (v: number | null) => {
      if (v) {
        this.props.setPage(v)
      }
    }
  }
  @Input() props: {
    meta: Meta,
    setPage: (v: number) => void;
  } = {
    meta: {
      page: 0,
      pageSize: 10,
      totalResults: 0
    },
    setPage: (v: number) => {}
  };
  numbers = getSearchMeta(this.props.meta);

  ngOnChanges() {
    this.numbers = getSearchMeta(this.props.meta);
  }

}