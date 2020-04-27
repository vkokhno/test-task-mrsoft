import React from "react";
import classnames from "classnames";

import { Button } from "antd";

import { Item as TItem } from "types";

type Props = {
  data: TItem;
  setActiveItem?: (id: number) => void;
  deleteItem?: (id: number) => void;
  reestablishItem?: (id: number) => void;
  deleted?: boolean;
};

const Item = ({
  data,
  setActiveItem,
  deleteItem,
  reestablishItem,
  deleted,
}: Props) => (
  // Для сохранения времени удаления необходимо хранить объекты, а не id. Я сразу задание не заметил, потом было влом переделывать
  <div
    className={classnames("sidebar__item item", { ["item_disabled"]: deleted })}
    onClick={() => {
      if (setActiveItem) setActiveItem(data.id);
    }}
  >
    <span className="item__name">{data.name}</span>
    <span className="item__info">{data.shortInfo}</span>
    <Button
      className="item__button"
      type="link"
      danger
      onClick={(event) => {
        event.stopPropagation();
        const method = deleted ? reestablishItem : deleteItem;
        if (method) method(data.id);
      }}
    >
      {deleted ? "Восстановить" : "Удалить"}
    </Button>
  </div>
);

export default Item;
