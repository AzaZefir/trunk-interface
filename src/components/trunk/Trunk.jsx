import React, { useContext } from "react";

import style from "./Trunk.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";
import InventoryCloseBtn from "../../shared/components/inventoryCloseBtn/InventoryCloseBtn";

import { InventoryContext } from "../../app/context/InventoryContext";
import { calculateTotalSlots } from "./../../utils/CalculateTotalSlots";
import HidingPlace from "../../shared/components/hiddingPlace/HidingPlace";

const Trunk = () => {
  const { inventoryData, unlockTrunk } = useContext(InventoryContext);
  const trunkData = inventoryData.trunk;

  const totalSlots = calculateTotalSlots({ data: trunkData, initialTotal: 40 });

  return (
    <div className={style.trunk}>
      <div className={style.trunkHeader}>
        <h2>Багажник</h2>
        <InventoryCloseBtn inventoryError={inventoryData.weightError.trunk} />
      </div>
      <div className={style.trunkSlots}>
        {Array.from({ length: totalSlots }).map((_, index) => (
          <InventorySlot key={index} section="trunk" index={index} />
        ))}
        {Array.from({ length: 1 }).map((_, index) => (
          <HidingPlace
            key={index}
            section="trunkHidingData"
            index={52}
            gridColumn={6}
            gridRow={1}
          />
        ))}
        {Array.from({ length: 1 }).map((_, index) => (
          <HidingPlace
            key={index}
            section="trunkHidingData"
            index={53}
            gridColumn={6}
            gridRow={2}
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
