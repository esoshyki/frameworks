import { getSearchMeta } from "../helpers/getSearchMeta";
import type { Meta } from "../types";
import cls from "classnames";
import { useState } from "react";

interface Props {
  meta: Meta;
  setPage: (v: number) => void;
}

export default function NewsListMeta(props: Props) {
  const [numbers, setNumbers] = useState(getSearchMeta(props.meta));

  return (
    <div className="meta">
      {numbers.map((item) => (
        <span
          key={item}
          className={cls({
            "item": true,
            "selected": item === props.meta.page,
          })}
          onMouseDown={() => (item ? props.setPage(item) : undefined)}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
