import { For } from "solid-js";
import { getSearchMeta } from "../helpers/getSearchMeta";
import { Meta } from "../types";
import styles from './NewsList.module.css';
import cls from 'classnames';

interface Props {
  meta: Meta
  setPage: (v: number) => void
}

export default function NewsListMeta (props: Props) {

  const { meta, setPage } = props;

  const numbers = getSearchMeta(meta);

  return (
    <div class={styles.meta}>
      <For each={numbers} fallback={"Loading"}>
        {(item) => (
          <span class={cls({
            [styles.item] : true,
            [styles.selected] : item === meta.page
          })} onMouseDown={() => item ? setPage(item) : undefined}>
            {item}
          </span>
        )}
      </For>
    </div>    
  )

}