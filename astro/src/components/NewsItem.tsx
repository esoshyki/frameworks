import cls from "classnames";
import defaultImg from '../assets/favicon.ico'
import type { NewsItemData } from "../types";

interface Props {
  data: NewsItemData;
}

export default function NewsItem(props: Props) {
  const { data } = props;

  return (
    <div className="news-list-item">
      {data.url && <a
          className={cls(["news-list-item-link", "full-width"])}
          href={data.url as string}
          target="_blank"
        />}
      <img
        src={data.urlToImage || defaultImg}
        alt="image"
        className="news-list-item-image"
      />
      <h5>{data.title}</h5>
      <p>{data.description}</p>
      <h6>{data.author}</h6>
    </div>
  );
}
