import { createEffect, createSignal, For } from "solid-js";
import { getSearchMeta } from "../helpers/getSearchMeta";
import { Meta } from "../types";
import styles from './NewsList.module.css';
import cls from 'classnames';

interface Props {
  meta: Meta
  setPage: (v: number) => void
}

export default function NewsListMeta (props: Props) {

  const [numbers, setNumbers] = createSignal(getSearchMeta(props.meta));

  console.log(numbers());

  createEffect(() => {
    setNumbers(getSearchMeta(props.meta))
  }, [props.meta])


  return (
    <div class={styles.meta}>
      <For each={numbers()} fallback={"Loading"}>
        {(item) => (
          <span class={cls({
            [styles.item] : true,
            [styles.selected] : item === props.meta.page
          })} onMouseDown={() => item ? props.setPage(item) : undefined}>
            {item}
          </span>
        )}
      </For>
    </div>    
  )

}