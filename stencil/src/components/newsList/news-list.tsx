import { Component, h, State, Method, Watch, getAssetPath } from '@stencil/core';
import { api } from '../../api';
import { getNewsItemData } from '../../dto/NewsItem';
import { Meta, NewsItemData } from '../../types';
import { NewsListItem } from './news-list-item';
import { NewsListMeta } from './news-list-meta';

@Component({
  tag: 'news-list',
  styleUrl: 'news-list.css',
})
export class NewsList {
  @State() input: string = 'ukraine';
  @State() error: string = '';
  @State() data: NewsItemData[] = [];
  @State() loading: boolean = false;
  @State() meta: Meta = {
    page: 1,
    pageSize: 20,
    totalResults: 0,
  };
  @State() timer: ReturnType<typeof setTimeout> | null = null;

  componentWillLoad() {
    console.log('load');
    this.fetchData();
  }

  clearTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  @Method()
  async fetchData() {
    if (this.loading) return;
    this.loading = true;
    const response = await api.getEverething({
      q: this.input,
      page: this.meta.page,
      pageSize: this.meta.pageSize,
    });

    if (response.error) {
      this.error = response.error;
    } else if (response.data) {
      this.data = response.data.articles.map(getNewsItemData);
      this.meta = {
        ...this.meta,
        totalResults: response.data.totalResults,
      };
    }
    this.loading = false;
    this.clearTimer();
  }

  setPage = (page: number) => {
    console.log(page)
    this.meta = {
      ...this.meta,
      page,
    };
    setTimeout(this.fetchData.bind(this));
  };

  changeInput(e: any) {
    this.input = e.target.value;
    if (this.timer) {
      this.clearTimer();
    }
    this.timer = setTimeout(this.fetchData.bind(this), 1000);
  }

  render() {
    return (
      <div class="container-flex-col full-width">
        <h2>Поиск новостей</h2>
        <input class="main-input" value={this.input} onInput={this.changeInput.bind(this)} />
        <NewsListMeta meta={this.meta} setPage={this.setPage} />

        <div class="news-list">
          {this.data.map(el => (
            <NewsListItem data={el} defaultImg={getAssetPath("/assets/icon/icon.png")}/>
          ))}
        </div>

        <NewsListMeta meta={this.meta} setPage={this.setPage} />
      </div>
    );
  }
}
