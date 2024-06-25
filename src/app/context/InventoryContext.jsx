import React, { createContext, useState } from "react";
import { inventoryData as initialInventoryData } from "../../data/index";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventoryData, setInventoryData] = useState({
    pocket: initialInventoryData,
    bag: Array(20).fill(null),
    trunk: Array(18).fill(null),
  });

  const moveItem = (source, target, item, targetIndex) => {
    setInventoryData((prevData) => {
      const updatedData = { ...prevData };
      const sourceIndex = updatedData[source].findIndex(
        (invItem) => invItem?.ItemId === item.id
      );

      // Удаляем предмет из источника
      if (sourceIndex !== -1) {
        updatedData[source][sourceIndex] = null;
      }

      // Если в целевой ячейке уже есть предмет, меняем их местами
      const targetItem = updatedData[target][targetIndex];
      if (targetItem) {
        updatedData[source][sourceIndex] = targetItem;
      }

      // Перемещаем предмет в целевую ячейку
      updatedData[target][targetIndex] = {
        ...item,
        ItemId: item.id,
        Name: item.name,
        Quantity: item.quantity,
        Data: item.data,
        Width: item.width,
        Height: item.height,
      };

      return updatedData;
    });
  };

  return (
    <InventoryContext.Provider value={{ inventoryData, moveItem }}>
      {children}
    </InventoryContext.Provider>
  );
};
