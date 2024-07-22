import React, { useContext } from "react";

import style from "./Bag.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";

import { InventoryContext } from "../../app/context/InventoryContext";
import HidingPlace from "../../shared/components/hiddingPlace/HidingPlace";

const Bag = () => {
  const { inventoryData } = useContext(InventoryContext);
  const bagWeight = inventoryData.weight.bag;
  const bagLimit = inventoryData.limit.bag;

  return (
    <div className={style.bag}>
      <div className={style.bagHeader}>
        <h2>Портфель</h2>
        <p
          className={style.weightInfo}
          style={{
            color: `${inventoryData.weightError.bag ? "salmon" : ""}`,
          }}
        >
          {bagWeight.toFixed(1)}/{bagLimit} кг
          <span className={style.errorText}>
            {inventoryData.weightError.bag}
          </span>
        </p>
      </div>
      <div className={style.bagSlots}>
        {Array.from({ length: 20 }).map((_, index) => {
          const isHidingPlace = index === 4;
          return isHidingPlace ? (
            <HidingPlace key={index} section="bagHidingData" index={index} />
          ) : (
            <InventorySlot key={index} section="bag" index={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Bag;
