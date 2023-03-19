import { createEffect, createSignal, For, JSX, onMount, Show } from "solid-js";
import { api } from "../api";
import { getNewsItemData } from "../dto/NewsItem";
import { Meta, NewsItemData } from "../types";
import NewsItem from "./NewsItem";
import classes from "./NewsList.module.css";
import NewsListMeta from "./NewsListMeta";

export default function NewsList() {
  const [input, setInput] = createSignal("ukraine");
  const [error, setError] = createSignal("");
  const [data, setData] = createSignal<NewsItemData[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [getMeta, setMeta] = createSignal<Meta>({
    page: 1,
    pageSize: 20,
    totalResults: 0,
  });
  const [searchTimeout, setSearchTimout] = createSignal<number | null>(null);

  const clearTimer = () => {
    const timout = searchTimeout();
    if (timout) {
      clearTimeout(timout);
      setSearchTimout(null)
    }
  }

  const fetchData = async () => {
    const isLoading = loading();

    if (isLoading) return;

    setLoading(true);
    const meta = getMeta();
    const response = await api.getEverething({
      q: input(),
      page: meta.page,
      pageSize: meta.pageSize,
    });

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setData(response.data.articles.map(getNewsItemData));
      console.log(response.data.totalResults);
      setMeta(prev => ({
        ...prev,
        totalResults: response.data?.totalResults || 0
      }))
    }
    setLoading(false);
    clearTimer()
  };

  const onChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const timeout = searchTimeout();
    setInput(e.currentTarget.value);
    console.log(timeout);
    if (timeout) {
      clearTimer()
    } else {
      setSearchTimout(setTimeout(fetchData, 1000));
    }
  };

  const setPage = (page: number) => {
    console.log(page);
    setMeta((prev) => ({
      ...prev,
      page,
    }));
    setTimeout(fetchData)
  };

  onMount(() => {
    fetchData();
  });

  return (
    <div class="container-flex-col full-width">
      <h2>Поиск новостей</h2>
      <input class="main-input" onInput={onChange} value={input()} />
      <Show when={loading()}>
        <div>Loding...</div>
      </Show>

      <div class={classes.newsList}>
        <For each={data()}>{(item) => <NewsItem data={item} />}</For>
      </div>

      <NewsListMeta setPage={setPage} meta={getMeta()} />
    </div>
  );
}
