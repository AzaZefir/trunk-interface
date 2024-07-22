import React, { useContext } from "react";

import style from "./Trunk.module.scss";

import InventorySlot from "../../shared/components/inventorySlot/InventorySlot";
import InventoryCloseBtn from "../../shared/components/inventoryCloseBtn/InventoryCloseBtn";

import { InventoryContext } from "../../app/context/InventoryContext";
import HidingPlace from "../../shared/components/hiddingPlace/HidingPlace";

const Trunk = () => {
  const { inventoryData, unlockTrunk } = useContext(InventoryContext);

  return (
    <div className={style.trunk}>
      <div className={style.trunkHeader}>
        <h2>Багажник</h2>
        <InventoryCloseBtn inventoryError={inventoryData.weightError.trunk} />
      </div>
      <div className={style.trunkWrapper}>
        <div className={style.trunkSlots}>
          {Array.from({ length: 42 }).map((_, index) => {
            const isHidingPlace = index === 5 || index === 11;
            return isHidingPlace ? (
              <HidingPlace
                key={index}
                section="trunkHidingData"
                index={index}
              />
            ) : (
              <InventorySlot key={index} section="trunk" index={index} />
            );
          })}
        </div>
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
