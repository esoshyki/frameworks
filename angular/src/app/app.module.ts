import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news';
import { NewsItemComponent } from './news/news-item';
import { NewsService } from './news/news.service';
import { NewsItemMeta } from './news/news-list-meta';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsItemComponent,
    NewsItemMeta
  ],
  imports: [
    BrowserModule
  ],
  providers: [NewsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
