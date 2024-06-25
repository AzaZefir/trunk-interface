import React, { useContext } from "react";

import style from "./Pocket.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";

import { InventoryContext } from "../../app/context/InventoryContext";
import { calculateTotalSlots } from "../../utils/InventoryUtils";

const Pocket = () => {
  const { inventoryData, moveItem } = useContext(InventoryContext);
  const pocketData = inventoryData.pocket;

  const handleDrop = (item, targetIndex) => {
    moveItem("pocket", "pocket", item, targetIndex);
  };

  const totalSlots = calculateTotalSlots({ data:pocketData, initialTotal: 10 });

  const specialIndexes = [4];

  return (
    <div className={style.pocket}>
      <div className={style.pocketHeader}>
        <h2>Карман</h2>
        <p>0.2/8 кг</p>
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
