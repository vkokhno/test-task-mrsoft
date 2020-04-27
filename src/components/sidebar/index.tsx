import React, { useState, useEffect, useMemo } from "react";
import { xor } from "lodash-es";

import { Input } from "antd";
import Item from "./item";

import { Item as TItem } from "types";

import "./styles.css";

type Props = {
  list: Array<TItem>;
  deletedItems: Array<number>;
  setActiveItem: (id: number) => void;
  deleteItem: (id: number) => void;
  reestablishItem: (id: number) => void;
};

const Sidebar = ({
  list,
  deletedItems,
  setActiveItem,
  deleteItem,
  reestablishItem,
}: Props) => {
  const [filteredList, setFilteredList] = useState(list);
  const existingList = useMemo(
    () =>
      filteredList.filter((fItem) => {
        if (deletedItems.length)
          return !deletedItems.find((item) => fItem.id === item);
        return true;
      }),
    [deletedItems, filteredList]
  );
  const deletedList = useMemo(() => xor(filteredList, existingList), [
    existingList,
    filteredList,
  ]);

  useEffect(() => setFilteredList(list), [list]);

  return (
    <aside className="sidebar">
      <Input
        className="sidebar__input"
        placeholder="Search"
        onChange={(value) => {
          setFilteredList(
            list?.filter(
              (item) => item.name?.indexOf(value.currentTarget.value) + 1
            )
          );
        }}
      />
      {Boolean(filteredList?.length) ? (
        <>
          {existingList?.map((data) => (
            <Item
              data={data}
              setActiveItem={setActiveItem}
              deleteItem={deleteItem}
              key={data.id}
            />
          ))}
          {deletedList?.map((data) => (
            <Item
              data={data}
              reestablishItem={reestablishItem}
              deleted
              key={data.id}
            />
          ))}
        </>
      ) : (
        <span>No items</span>
      )}
    </aside>
  );
};

export default Sidebar;
