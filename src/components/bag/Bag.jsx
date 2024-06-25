import React, { useContext } from "react";

import style from "./Bag.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";

import { InventoryContext } from "../../app/context/InventoryContext";
import { calculateTotalSlots } from "../../utils/InventoryUtils";

const Bag = () => {
  const { inventoryData, moveItem } = useContext(InventoryContext);
  const bagData = inventoryData.bag;

  const handleDrop = (item, targetIndex) => {
    moveItem("bag", "bag", item, targetIndex);
  };

  const totalSlots = calculateTotalSlots({ data: bagData, initialTotal: 20 });

  const specialIndexes = [4,9];

  return (
    <div className={style.bag}>
      <div className={style.bagHeader}>
        <h2>Портфель</h2>
        <p>3.5/25 кг</p>
      </div>
      <div className={style.bagSlots}>
        {Array.from({ length: totalSlots }).map((_, index) => (
          <InventorySlot
            key={index}
            item={bagData[index]}
            section="bag"
            index={index}
            onDrop={(item) => handleDrop(item, index)}
            specialIndexes={specialIndexes}
          />
        ))}
      </div>
    </div>
  );
};

export default Bag;
