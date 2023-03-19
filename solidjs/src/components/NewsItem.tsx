import { Show } from "solid-js";
import { NewsItemData } from "../types";
import classes from "./NewsList.module.css";
import cls from "classnames";
import defaultImg from '../assets/favicon.ico'

interface Props {
  data: NewsItemData;
}

export default function NewsItem(props: Props) {
  const { data } = props;

  return (
    <div class={classes.newsListItem}>
      <Show when={props.data.url}>
        <a
          class={cls([classes.newsListItemLink, "full-width"])}
          href={data.url as string}
          target="_blank"
        />
      </Show>
      <img
        src={data.urlToImage || defaultImg}
        alt="image"
        class={classes.newsListItemImage}
      />
      <h5>{data.title}</h5>
      <p>{data.description}</p>
      <h6>{data.author}</h6>
    </div>
  );
}
