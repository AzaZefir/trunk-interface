import React, { useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { InventoryContext } from "../../app/context/InventoryContext";
import { ItemTypes } from "./../inventoryItemTypes/InventoryItemTypes";

export const useInventoryDragDrop = (index, section, item) => {
  const { moveItem } = useContext(InventoryContext);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.INVENTORY_SLOT,
    item: {
      itemId: item?.itemId,
      name: item?.name,
      quantity: item?.quantity,
      data: item?.data,
      width: item?.width,
      height: item?.height,
      weight: item?.weight,
      section: section,
      index: index,
      type: item?.type,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INVENTORY_SLOT,
    drop: (droppedItem) => {
      moveItem(droppedItem.section, section, droppedItem, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const slotStyle = {
    gridColumnEnd: `span ${item?.width || 1}`,
    width: `${item?.width === 2 ? "160px" : "80px"}`,
    height: `${item?.height === 2 ? "160px" : "80px"}`,
    gridRowEnd: `span ${item?.height || 1}`,
    cursor: `${item ? "pointer" : ""}`,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isOver ? "rgba(57, 57, 57, 1)" : "transparent",
  };

  return {
    dragRef: drag,
    dropRef: drop,
    isDragging,
    slotStyle,
  };
};
