import React from "react";

import { Item, ExtendedItem } from "types";

import "./styles.css";

type Props = {
  basepath: string;
  data: Partial<Item & ExtendedItem>;
};

const Main = ({ basepath, data }: Props) => (
  <main className="main">
    <h1 className="main__name">{data.name}</h1>
    <h2 className="main__info">{data.shortInfo}</h2>
    <h3 className="main__bio">{data.bio}</h3>
    <img src={`${basepath}${data.pic}`} className="main__photo" />
  </main>
);

export default Main;
