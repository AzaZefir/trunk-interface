import React from "react";

import style from "./InventoryInterface.module.scss";

import Bag from "./bag/Bag";
import Pocket from "./pocket/Pocket";
import Trunk from "./trunk/Trunk";

import { InventoryProvider } from "../app/context/InventoryContext";

const InventoryInterface = () => {
  return (
    <section className={style.inventoryWrapper}>
      <div className={style.inventoryGridWrapper}>
        <InventoryProvider>
          <Pocket />
          <Bag />
          <Trunk />
        </InventoryProvider>
      </div>
    </section>
  );
};

export default InventoryInterface;
