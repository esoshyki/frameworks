<script>
  import { getSearchMeta } from "../helpers/getSearchMeta";
  import { afterUpdate, beforeUpdate } from "svelte";
  const { setPage } = $$props;

  $: numbers = getSearchMeta($$props.meta);

  beforeUpdate(() => {
    numbers = getSearchMeta($$props.meta);
  });

  afterUpdate(() => {
    console.log($$props.meta);
  })

</script>

<div class="news-list-meta">
  {#each numbers as number}
      <span
        on:mousedown={() => setPage(number)}
        class:item={true}
        class:selected={number === $$props.meta.page}>{number || "..."}</span
      >
  {/each}
</div>

<style>
  .news-list-meta {
    margin: 20px 0;
  }

  .item {
    margin: 10px;
    cursor: pointer;
  }

  .selected {
    color: red;
  }
</style>
