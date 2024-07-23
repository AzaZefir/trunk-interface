import React, { useContext, useEffect } from "react";
import { useInventoryDragDrop } from "../../hooks/useInventoryDragDrop";
import { InventoryContext } from "../../../app/context/InventoryContext";
import style from "./HidingPlace.module.scss";

const HidingPlace = ({ index, section }) => {
  const {
    inventoryData,
    isBagHidenPlaceOverweight,
    isPocketHidenPlaceOverweight,
    isTrunkHidenPlaceOverweight,
    setIsBagHidenPlaceOverweight,
    setIsPocketHidenPlaceOverweight,
    setIsTrunkHidenPlaceOverweight,
  } = useContext(InventoryContext);
  const item = inventoryData?.[section]?.[index] || null;

  const { dragRef, dropRef } = useInventoryDragDrop(index, section, item);

  useEffect(() => {
    if (isBagHidenPlaceOverweight) {
      const timer = setTimeout(() => {
        setIsBagHidenPlaceOverweight(false);
      }, 500);

      return () => clearTimeout(timer);
    }
    if (isPocketHidenPlaceOverweight) {
      const timer = setTimeout(() => {
        setIsPocketHidenPlaceOverweight(false);
      }, 500);

      return () => clearTimeout(timer);
    }
    if (isTrunkHidenPlaceOverweight) {
      const timer = setTimeout(() => {
        setIsTrunkHidenPlaceOverweight(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [
    isBagHidenPlaceOverweight,
    isPocketHidenPlaceOverweight,
    isTrunkHidenPlaceOverweight,
  ]);

  return (
    <div
      className={style.specialSlot}
      ref={dropRef}
      style={{
        background: `${
          section === "bagHidingData"
            ? isBagHidenPlaceOverweight
              ? "salmon"
              : ""
            : section === "pocketHidingData"
            ? isPocketHidenPlaceOverweight
              ? "salmon"
              : ""
            : section === "trunkHidingData"
            ? isTrunkHidenPlaceOverweight
              ? "salmon"
              : ""
            : ""
        }`,
        transition: "background-color 0.1s ease-in-out",
      }}
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
        {item ? (item?.quantity !== 1 ? `x${item?.quantity}` : "") : ""}
      </span>
      <span className={style.inventoryWeight}>
        {item ? `${(item?.weight * item?.quantity).toFixed(1)}` : ""}
      </span>
    </div>
  );
};

export default HidingPlace;
