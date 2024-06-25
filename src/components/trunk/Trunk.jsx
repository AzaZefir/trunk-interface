import React, { useContext, useState } from "react";

import style from "./Trunk.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";
import InventoryCloseBtn from "../../shared/components/inventoryCloseBtn/InventoryCloseBtn";

import { InventoryContext } from "../../app/context/InventoryContext";
import { calculateTotalSlots } from "./../../utils/InventoryUtils";

const Trunk = () => {
  const [isTrunkOpen, setIsTrunkOpen] = useState(true);
  const { inventoryData, moveItem } = useContext(InventoryContext);
  const trunkData = inventoryData.trunk;

  const handleDrop = (item, targetIndex) => {
    moveItem("trunk", "trunk", item, targetIndex);
  };

  const totalSlots = calculateTotalSlots({ data: trunkData, initialTotal: 18 });

  const toggleTrunk = () => {
    setIsTrunkOpen((prevState) => !prevState);
  };

  const specialIndexes = [5];

  return (
    <div className={style.trunk}>
      <div className={style.trunkHeader}>
        <h2>Багажник</h2>
        <InventoryCloseBtn />
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
      </div>
      <div className={style.trunkLockedSlots}>
        {Array.from({ length: 24 }).map((_, index) => (
          <InventorySlot key={index} />
        ))}
        {isTrunkOpen && (
          <div className={style.unlockSlots}>
            <span>
              Чтобы разблокировать, улучшите{" "}
              <strong onClick={toggleTrunk}>Багажник</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trunk;
