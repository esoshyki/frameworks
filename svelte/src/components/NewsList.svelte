<script>
  import { onMount, tick } from "svelte";
  import { api } from "../api";
  import { getNewsData } from "../dto";
  import NewsItem from "./NewsItem.svelte";
  import NewsListMeta from "./NewsListMeta.svelte";

  $: input = "ukraine";
  $: error = "";
  $: data = [];
  $: loading = false;
  $: meta = {
    page: 1,
    pageSize: 20,
    totalResults: 0,
  };
  $: searchTimeout = undefined;

  const onChange = (e) => {
    console.log(e.target.value);

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    input = e.target.value;
    if (e.target.value.length > 3) {
      searchTimeout = setTimeout(fetchData, 1000);
    }
  };

  const fetchData = async () => {
    if (loading) return;
    loading = true;
    const response = await api.getEverething({
      q: input,
      page: meta.page,
      pageSize: meta.pageSize,
    });
    if (response.error) {
      error = response.error;
      data = [];
    } else if (response.data) {
      data = response.data.articles.map(getNewsData);
      meta.totalResults = response.data.totalResults;
    }
    loading = false;
  };

  const setPage = (page) => {
    meta = {
      ...meta,
      page,
    };
    fetchData();
  };

  onMount(fetchData);
</script>

<div class="container-flex-col full-width">
  <h2>Поиск новостей</h2>
  <input class="main-input" on:input={onChange} value={input} />

  <NewsListMeta {meta} {setPage} />

  {#if loading}
    <h5>Loading...</h5>
  {/if}

  {#key data}
    <div class="news-list">
      {#each data as item}
        <NewsItem {...item} />
      {/each}
    </div>
  {/key}

  <NewsListMeta {meta} {setPage} />
</div>

<style>
  .news-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, 320px);
    gap: 20px;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }

  .main-input {
    max-width: 80vw;
    margin: 20px auto;
    width: 100%;
  }
</style>
