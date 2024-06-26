import React, { useContext } from "react";

import style from "./Bag.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";

import { InventoryContext } from "../../app/context/InventoryContext";
import { calculateTotalSlots } from "../../utils/CalculateTotalSlots";
import HidingPlace from "../../shared/components/hiddingPlace/HidingPlace";

const Bag = () => {
  const { inventoryData } = useContext(InventoryContext);
  const bagData = inventoryData.bag;
  const bagWeight = inventoryData.weight.bag;
  const bagLimit = inventoryData.limit.bag;

  const totalSlots = calculateTotalSlots({ data: bagData, initialTotal: 19 });

  return (
    <div className={style.bag}>
      <div className={style.bagHeader}>
        <h2>Портфель</h2>
        <p className={style.weightInfo}>
          {bagWeight.toFixed(1)}/{bagLimit} кг
          <span className={style.errorText}>
            {inventoryData.weightError.bag}
          </span>
        </p>
      </div>
      <div className={style.bagSlots}>
        {Array.from({ length: totalSlots }).map((_, index) => (
          <InventorySlot key={index} section="bag" index={index} />
        ))}
        {Array.from({ length: 1 }).map((_, index) => (
          <HidingPlace
            key={index}
            section="bagHidingData"
            index={51}
            gridColumn={5}
            gridRow={1}
          />
        ))}
      </div>
    </div>
  );
};

export default Bag;
