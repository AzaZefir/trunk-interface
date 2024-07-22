import React, { useContext } from "react";
import { useInventoryDragDrop } from "../../hooks/useInventoryDragDrop";
import { InventoryContext } from "../../../app/context/InventoryContext";
import style from "./HidingPlace.module.scss";

const HidingPlace = ({ index, section }) => {
  const { inventoryData } = useContext(InventoryContext);
  const item = inventoryData?.[section]?.[index] || null;

  const { dragRef, dropRef } = useInventoryDragDrop(index, section, item);

  return (
    <div
      className={style.specialSlot}
      ref={dropRef}
    >
      {item && (
        <img
          ref={dragRef}
          src={item.data}
          alt={item.name}
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
        {item ? (item?.quantity !== 1 ? `x${item?.quantity}` : "") : ''}
      </span>
      <span className={style.inventoryWeight}>
        {item ? `${(item?.weight * item?.quantity).toFixed(1)}` : ""}
      </span>
    </div>
  );
};

export default HidingPlace;
