import React, { useContext } from "react";

import style from "./InventorySlot.module.scss";

import { InventoryContext } from "../../../app/context/InventoryContext";
import { useInventoryDragDrop } from "../../hooks/useInventoryDragDrop";

const InventorySlot = ({ index, section }) => {
  const { inventoryData } = useContext(InventoryContext);
  const item =
    inventoryData && inventoryData[section] && inventoryData[section][index];

  const { dragRef, dropRef, slotStyle } = useInventoryDragDrop(
    index,
    section,
    item,
  );

  return (
    <div ref={dropRef} className={style.inventorySlot} style={slotStyle}>
      {item && (
        <img
          ref={dragRef}
          src={item.data}
          alt={item.name}
          className={style.itemImage}
          style={{
            width: `${
              item?.width !== 2 && item?.height !== 2
                ? "35px"
                : item?.height === 2
                ? "60px"
                : ""
            }`,
          }}
        />
      )}
      <span className={style.inventoryQtyChange}>
        {item ? `x${item?.quantity}` : ""}
      </span>
      <span className={style.inventoryWeight}>
        {item ? `${(item?.weight * item?.quantity).toFixed(1)}` : ""}
      </span>
    </div>
  );
};

export default InventorySlot;
