import React, { useContext } from "react";

import style from "./Trunk.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";
import InventoryCloseBtn from "../../shared/components/inventoryCloseBtn/InventoryCloseBtn";

import { InventoryContext } from "../../app/context/InventoryContext";
import { calculateTotalSlots } from "./../../utils/CalculateTotalSlots";

const Trunk = () => {
  const { inventoryData, moveItem, unlockTrunk } = useContext(InventoryContext);
  const trunkData = inventoryData.trunk;

  const handleDrop = (item, targetIndex) => {
    moveItem("trunk", "trunk", item, targetIndex);
  };

  const totalSlots = calculateTotalSlots({ data: trunkData, initialTotal: 42 });

  const specialIndexes = [5];

  return (
    <div className={style.trunk}>
      <div className={style.trunkHeader}>
        <h2>Багажник</h2>
        <InventoryCloseBtn inventoryError={inventoryData.weightError.trunk} />
      </div>
      <div className={style.trunkSlots}>
        {Array.from({ length: totalSlots }).map((_, index) => (
          <InventorySlot
            key={index}
            item={trunkData[index]}
            section="trunk"
            index={index}
            onDrop={(item) => handleDrop(item, index)}
            specialIndexes={specialIndexes}
          />
        ))}
        <div className={style.trunkLockedSlots}>
          {inventoryData.locked && (
            <div className={style.unlockSlots}>
              <span>
                Чтобы разблокировать, улучшите{" "}
                <strong onClick={unlockTrunk}>Багажник</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trunk;
