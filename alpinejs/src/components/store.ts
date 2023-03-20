import { Meta, NewsItemData } from "../types";
import Alpine, { Alpine as AlpineType } from 'alpinejs';
import { api } from "../api";
import { getNewsItemData } from "../dto/NewsItem";
import { getSearchMeta } from "../helpers/getSearchMeta";

const initialData = {
  input: "ukraine",
  error: "",
  data: [] as NewsItemData[],
  loading: false,
  meta: {
    page: 1,
    pageSize: 20,
    totalResults: 0
  } as Meta,
  timer: null as null | number,
  numbers: [] as Array<null | number>
}

export const createNewsStore = () => {
  Alpine.store("news", {
    ...initialData,
    setPage(page: number) {
      this.meta.page = page;
      this.fetchData();
    },
    
    setMeta(meta: Meta) {
      this.meta = meta;
    },
  
    setInput(v: string) {
      console.log(this);
      this.input = v;
      if (this.timer) {
        this.clearTimer();
      }
      this.timer = setTimeout(this.fetchData.bind(this), 1000)
    },

    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },

    async fetchData () {

      this.loading = true;
      const meta = this.meta;
      const response = await api.getEverething({
        q: this.input,
        page: meta.page,
        pageSize: meta.pageSize,
      });
  
      if (response.error) {
        this.error = response.error;
      } else if (response.data) {
        this.data = response.data.articles.map(getNewsItemData);
        console.log(response.data.totalResults);
        this.meta = {
          ...this.meta,
          totalResults: response.data?.totalResults || 0
        }
        this.numbers = getSearchMeta(this.meta);
      }
      this.loading = false;
      this.clearTimer()
    },
  
    setLoading(v: boolean) {
      this.loading = v;
    }
  
  })

}

