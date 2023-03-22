import { $, component$ } from "@builder.io/qwik";
import { getSearchMeta } from "~/helpers/getSearchMeta";
import { Meta } from "~/types";

interface NewsListMetaProps {
  meta: Meta;
  setPage: (page: number) => void;
}

export default component$(({ meta, setPage } : NewsListMetaProps) => {

  const numbers = getSearchMeta(meta);

  const onClick = $((v: number| null) => {
    if (v) {
      setPage(v)
    }
  })


  return (
    <div class="meta">
      {numbers.map(el => (
        <span 
          key={el}
          onClick$={() => onClick(el)} 
          class={el === meta.page ? 'news-list-meta-item news-list-meta-item-selected' : 'news-list-meta-item'}
          >
          {el || '...'}
        </span>
      ))}
    </div>
  )

})