import { KeyboardEvent, useEffect, useState } from "react";
import { api } from "../api";
import { getNewsItemData } from "../dto/NewsItem";
import type { Meta, NewsItemData } from "../types";
import NewsItem from "./NewsItem";
import NewsListMeta from "./NewsListMeta";

export default function NewsList() {
  const [input, setInput] = useState("ukraine");
  const [error, setError] = useState("");
  const [data, setData] = useState<NewsItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    pageSize: 20,
    totalResults: 0,
  });
  const [searchTimeout, setSearchTimout] = useState<number | null>(null);

  const clearTimer = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimout(null)
    }
  }

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    const response = await api.getEverething({
      q: input,
      page: meta.page,
      pageSize: meta.pageSize,
    });

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setData(response.data.articles.map(getNewsItemData));
      setMeta(prev => ({
        ...prev,
        totalResults: response.data?.totalResults || 0
      }))
    }
    setLoading(false);
    clearTimer()
  };

  const onChange = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    const timeout = searchTimeout;
    setInput(e.currentTarget.value);
    console.log(timeout);
    if (timeout) {
      clearTimer()
    } else {
      setSearchTimout(setTimeout(fetchData, 1000));
    }
  };

  const setPage = (page: number) => {
    setMeta((prev) => ({
      ...prev,
      page,
    }));
    setTimeout(fetchData)
  };

  useEffect(() => {
    console.log('data', data);
  }, [data])

  fetchData();

  return (
    <div className="container-flex-col full-width">
      <h2>Поиск новостей</h2>
      <input className="main-input" onInput={onChange} value={input} />
      {loading && <div>Loding...</div>}
      <div className="news-list">
        {data.map((el, idx) => (
          <NewsItem data={el} key={idx} />
        ))}
      </div>

      <NewsListMeta setPage={setPage} meta={meta} />
    </div>
  );
}
