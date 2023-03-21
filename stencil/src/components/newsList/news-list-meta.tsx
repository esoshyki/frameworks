import { FunctionalComponent, h } from '@stencil/core';
import { getSearchMeta } from '../../helpers/getSearchMeta';
import { Meta } from '../../types';

interface NewsListMetaProps {
  meta: Meta;
  setPage: (page: number) => void;
}

export const NewsListMeta: FunctionalComponent<NewsListMetaProps> = ({ meta, setPage }) => {
  const numbers = getSearchMeta(meta);

  return (
    <div class="meta">
      {numbers.map(el => (
        <span 
          onClick={() => (el ? setPage(el) : undefined)} 
          class={el === meta.page ? 'news-list-meta-item news-list-meta-item-selected' : 'news-list-meta-item'}
          >
          {el || '...'}
        </span>
      ))}
    </div>
  );
};
