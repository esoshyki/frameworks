import { FunctionalComponent, h, getAssetPath } from '@stencil/core';
import { NewsItemData } from '../../types';

interface NewsListItemProps {
  data: NewsItemData;
  defaultImg: string
}

export const NewsListItem: FunctionalComponent<NewsListItemProps> = ({ data, defaultImg }) => {

  console.log(data);

  return (
    <div class="news-list-item">
      {data.url && <a
        class="news-list-item-link full-width"
        href={data.url as string}
        target="_blank"
        />}
      <img
        src={data.urlToImage || defaultImg}
        alt="image"
        class="news-list-item-image"
      />
      <h5>{data.title}</h5>
      <p>{data.description}</p>
      <h6>{data.author}</h6>
    </div>
  );
};
