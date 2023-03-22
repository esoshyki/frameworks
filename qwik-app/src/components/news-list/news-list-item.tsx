import { $, component$ } from "@builder.io/qwik";
import { getSearchMeta } from "~/helpers/getSearchMeta";
import { Meta, NewsItemData } from "~/types";

interface NewsListItemsProps {
  data: NewsItemData
}

export default component$(({ data } : NewsListItemsProps) => {

  return (
    <div class="news-list-item">
      {data.url && <a
        class="news-list-item-link full-width"
        href={data.url as string}
        target="_blank"
        />}
      <img
        src={data.urlToImage || "/favicon.svg"}
        alt="image"
        class="news-list-item-image"
      />
      <h5>{data.title}</h5>
      <p>{data.description}</p>
      <h6>{data.author}</h6>
    </div>
  );

})