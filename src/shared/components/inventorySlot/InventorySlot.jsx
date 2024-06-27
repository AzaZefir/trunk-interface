import React, { useContext } from "react";

import style from "./InventorySlot.module.scss";

import { InventoryContext } from "../../../app/context/InventoryContext";
import { useInventoryDragDrop } from "../../hooks/useInventoryDragDrop";

const InventorySlot = ({ index, section, specialIndexes }) => {
  const { inventoryData } = useContext(InventoryContext);
  const item =
    inventoryData && inventoryData[section] && inventoryData[section][index];

  const { dragRef, dropRef, slotStyle } = useInventoryDragDrop(
    index,
    section,
    item,
    specialIndexes
  );

  return (
    <div ref={dropRef} className={style.inventorySlot} style={slotStyle}>
      {item && (
        <img
          ref={dragRef}
          src={item.data}
          alt={item.name}
          className={style.itemImage}
        />
      )}
    </div>
  );
};

export default InventorySlot;
