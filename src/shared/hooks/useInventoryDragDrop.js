import React, { useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { InventoryContext } from "../../app/context/InventoryContext";
import { ItemTypes } from "./../inventoryItemTypes/InventoryItemTypes";

export const useInventoryDragDrop = (index, section, item, specialIndexes) => {
  const { moveItem } = useContext(InventoryContext);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.INVENTORY_SLOT,
    item: {
      id: item?.ItemId,
      name: item?.Name,
      quantity: item?.Quantity,
      data: item?.Data,
      width: item?.Width,
      height: item?.Height,
      section: section,
      index: index,
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
    gridColumnEnd: `span ${item?.Width || 1}`,
    width: `${item?.Width === 2 ? "initial" : "6.875rem"}`,
    height: `${item?.Height === 2 ? "initial" : "6.875rem"}`,
    gridRowEnd: `span ${item?.Height || 1}`,
    cursor: `${item ? "pointer" : ""}`,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isOver ? "rgba(57, 57, 57, 1)" : "transparent",
    ...(specialIndexes?.includes(index) && { backgroundColor: "rgba(201, 157, 62, 0.4)" }),
  };

  return {
    dragRef: drag,
    dropRef: drop,
    isDragging,
    slotStyle,
  };
};
