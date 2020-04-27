import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash-es";

import Sidebar from "components/sidebar";
import Main from "components/main";

import { Item, Response, ExtendedItem } from "types";

import "antd/dist/antd.css";
import "./styles.css";

const App = () => {
  const [basepath, setBasepath] = useState<string>("");
  const [list, setList] = useState<Array<Item>>([]);
  const [deletedItems, setDeletedItems] = useState<Array<number>>([]);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [activeItemInfo, setActiveItemInfo] = useState<
    Partial<Item & ExtendedItem>
  >({});

  useEffect(() => {
    fetch("http://localhost:8181/https://mrsoft.by/tz20/list.json")
      .then((response) => response.json())
      .then((response: Response) => {
        setBasepath(response.basepath);
        setList(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (activeItem) {
      const item = list.find((item) => item.id === activeItem) || ({} as Item);
      fetch(`http://localhost:8181/${basepath}${item.more}`)
        .then((response) => response.json())
        .then((response: Response) =>
          setActiveItemInfo({ ...item, ...response })
        )
        .catch((error) => console.error(error));
    }
  }, [activeItem]);

  const deleteItem = (id: number) => setDeletedItems([...deletedItems, id]);
  const reestablishItem = (id: number) =>
    setDeletedItems(deletedItems.filter((item) => item === id));

  return (
    <div className="app">
      <Sidebar
        list={list}
        deletedItems={deletedItems}
        setActiveItem={setActiveItem}
        deleteItem={deleteItem}
        reestablishItem={reestablishItem}
      />
      {!isEmpty(activeItemInfo) && (
        <Main basepath={basepath} data={activeItemInfo} />
      )}
    </div>
  );
};

export default App;
