import React, { useContext } from "react";

import style from "./Pocket.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";

import { InventoryContext } from "../../app/context/InventoryContext";
import HidingPlace from "../../shared/components/hiddingPlace/HidingPlace";

const Pocket = () => {
  const { inventoryData } = useContext(InventoryContext);
  const pocketWeight = inventoryData.weight.pocket;
  const pocketLimit = inventoryData.limit.pocket;

  return (
    <div className={style.pocket}>
      <div className={style.pocketHeader}>
        <h2>Карман</h2>
        <p
          className={style.weightInfo}
          style={{
            color: `${inventoryData.weightError.pocket ? "salmon" : ""}`,
          }}
        >
          {pocketWeight.toFixed(1)}/{pocketLimit} кг
          <span className={style.errorText}>
            {inventoryData.weightError.pocket}
          </span>
        </p>
      </div>
      <div className={style.pocketSlots}>
        {Array.from({ length: 10 }).map((_, index) => {
          const isHidingPlace = index === 4;
          return isHidingPlace ? (
            <HidingPlace key={index} section="pocketHidingData" index={index} />
          ) : (
            <InventorySlot key={index} section="pocket" index={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Pocket;
