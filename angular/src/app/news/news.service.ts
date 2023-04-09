import { Injectable } from '@angular/core';
import { api } from '../../api';
import { Meta, NewsItemData } from '../../types';
import { getNewsItemData } from 'src/dto/NewsItem';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private searchString: string = 'ukraine';
  private error: string = '';
  private data: NewsItemData[] = [];
  private pending: boolean = false;
  private meta: Meta = {
    page: 1,
    pageSize: 20,
    totalResults: 0
  };
  private timer: ReturnType<typeof setTimeout> | null = null;
  constructor() { }

  getData = () => this.data;

  getSearchString = () => this.searchString;

  setSearchString = (s: string) => {
    this.searchString = s;
  }

  getError = () => this.error;

  setError = (error: string) => this.error = error;

  clearTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null
    }
  }

  setPending = (v: boolean) => {
    this.pending = v;
  }

  getPending = () => this.pending

  setData = (d: NewsItemData[]) => {
    this.data = d;
  }

  setMeta = (k: keyof Meta, v: any) => {
    this.meta = {
      ...this.meta,
      [k] : v
    };
  }

  getMeta = () => this.meta;

  fetchData = async () => {
    if (this.pending) return;
    this.setPending(true);
    const respone = await api.getEverething({
      q: this.searchString,
      page: this.meta.page,
      pageSize: this.meta.pageSize
    });
    if (respone.error) {
      this.setError(respone.error)
    } else if (respone.data) {
      this.setData(respone.data.articles.map(getNewsItemData));
      this.setMeta('totalResults', respone.data.totalResults);
    };
    this.setPending(false);
    this.clearTimer();
  }
   
  setPage = (page: number) => {
    this.setMeta('page', page);
    this.fetchData();
  }

  
}
