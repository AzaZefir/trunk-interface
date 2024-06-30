import React, { useContext } from "react";

import style from "./Pocket.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";

import { InventoryContext } from "../../app/context/InventoryContext";
import { calculateTotalSlots } from "../../utils/CalculateTotalSlots";
import HidingPlace from "../../shared/components/hiddingPlace/HidingPlace";

const Pocket = () => {
  const { inventoryData } = useContext(InventoryContext);
  const pocketData = inventoryData.pocket;
  const pocketWeight = inventoryData.weight.pocket;
  const pocketLimit = inventoryData.limit.pocket;

  const totalSlots = calculateTotalSlots({
    data: pocketData,
    initialTotal: 9,
  });

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
        {Array.from({ length: totalSlots }).map((_, index) => (
          <InventorySlot key={index} section="pocket" index={index} />
        ))}
        {Array.from({ length: 1 }).map((_, index) => (
          <HidingPlace
            key={index}
            section="pocketHidingData"
            index={50}
            gridColumn={5}
            gridRow={1}
          />
        ))}
      </div>
    </div>
  );
};

export default Pocket;
