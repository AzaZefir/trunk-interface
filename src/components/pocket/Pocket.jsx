import React, { useContext } from "react";

import style from "./Pocket.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";

import { InventoryContext } from "../../app/context/InventoryContext";
import { calculateTotalSlots } from "../../utils/CalculateTotalSlots";

const Pocket = () => {
  const { inventoryData, moveItem } = useContext(InventoryContext);
  const pocketData = inventoryData.pocket;
  const pocketWeight = inventoryData.weight.pocket;
  const pocketLimit = inventoryData.limit.pocket;

  const handleDrop = (item, targetIndex) => {
    moveItem("pocket", "pocket", item, targetIndex);
  };

  const totalSlots = calculateTotalSlots({
    data: pocketData,
    initialTotal: 10,
  });

  const specialIndexes = [4];

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
          <InventorySlot
            key={index}
            item={pocketData[index]}
            section="pocket"
            index={index}
            onDrop={(item) => handleDrop(item, index)}
            specialIndexes={specialIndexes}
          />
        ))}
      </div>
    </div>
  );
};

export default Pocket;
