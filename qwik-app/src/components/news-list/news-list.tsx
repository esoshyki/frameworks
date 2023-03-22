import {
  component$,
  QwikChangeEvent,
  useSignal,
  useStylesScoped$,
  $,
  useTask$,
  useTaskQrl,
  useVisibleTask$,
} from "@builder.io/qwik";
import { api } from "~/api";
import { getNewsItemData } from "~/dto/NewsItem";
import { Meta, NewsItemData } from "~/types";
import NewsListItem from "./news-list-item";
import NewsListMeta from "./news-list-meta";
import styles from "./news-list.css?inline";

export default component$(() => {
  const input = useSignal("ukraine");
  const timer = useSignal<ReturnType<typeof setTimeout> | null>(null);
  const data = useSignal<NewsItemData[]>([]);
  const loading = useSignal(false);
  const error = useSignal("");
  const meta = useSignal<Meta>({
    page: 1,
    pageSize: 20,
    totalResults: 0,
  });

  const clearTimer = $(() => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  });

  const fetchData = $(async () => {
    if (loading.value) return;
    loading.value = true;
    const response = await api.getEverething({
      q: input.value,
      page: meta.value.page,
      pageSize: meta.value.pageSize,
    });

    if (response.error) {
      error.value = response.error;
    } else if (response.data) {
      data.value = response.data.articles.map(getNewsItemData);
      meta.value = { ...meta.value, totalResults: response.data.totalResults };
    }

    loading.value = false;
    clearTimer();
  });

  const setPage = $((v: number) => {
    meta.value = {
      ...meta.value,
      page: v,
    };
    setTimeout(fetchData, 1000);
  });

  const changeInput = $((e: any) => {
    input.value = e.target.value;
    if (timer.value) {
      clearTimer();
    }
    timer.value = setTimeout(fetchData, 1000);
  });

  useVisibleTask$(({ track }) => {
    track(() => false);
    fetchData();
  });

  return (
    <div class="container-flex-col full-width">
      {loading.value && <h5>Loading...</h5>}
      <input class="main-input" onInput$={changeInput} value={input.value} />
      <NewsListMeta meta={meta.value} setPage={setPage} />
      <div class="news-list">
        {data.value.map((el, idx) => (
          <NewsListItem data={el} key={idx}/>
        ))}
      </div>
      <NewsListMeta meta={meta.value} setPage={setPage} />
    </div>
  );
});
