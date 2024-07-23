import React from "react";

import style from "./InventoryInterface.module.scss";

import Bag from "./bag/Bag";
import Pocket from "./pocket/Pocket";
import Trunk from "./trunk/Trunk";

const InventoryInterface = () => {
  return (
    <section className={style.inventoryWrapper}>
      <div className={style.inventoryGridWrapper}>
        <Pocket />
        <Bag />
        <Trunk />
      </div>
    </section>
  );
};

export default InventoryInterface;
