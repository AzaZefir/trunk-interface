import React, { createContext, useEffect, useState } from "react";
import {
  bagData,
  inventoryData as initialInventoryData,
  trunkData,
} from "../../data/index";
import { calculateWeight } from "../../utils/CalculateWeight";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventoryData, setInventoryData] = useState({
    pocket: initialInventoryData,
    bag: bagData,
    trunk: trunkData,
    weight: {
      trunk: 0,
      pocket: 0,
      bag: 0,
    },
    limit: {
      trunk: 30,
      pocket: 8,
      bag: 25,
    },
    locked: true,
    weightError: {
      pocket: "",
      bag: "",
      trunk: "",
    },
  });

  useEffect(() => {
    setInventoryData((prevData) => ({
      ...prevData,
      weight: {
        trunk: calculateWeight(prevData.trunk),
        pocket: calculateWeight(prevData.pocket),
        bag: calculateWeight(prevData.bag),
      },
    }));
  }, [inventoryData.trunk, inventoryData.pocket, inventoryData.bag]);

  const unlockTrunk = () => {
    setInventoryData((prevData) => ({
      ...prevData,
      locked: false,
    }));
  };

  const moveItem = (source, target, item, targetIndex) => {
    setInventoryData((prevData) => {
      const updatedData = { ...prevData };
      const sourceData = updatedData[source];
      const targetData = updatedData[target];

      const sourceIndex = sourceData.findIndex(
        (invItem) => invItem?.itemId === item.itemId
      );

      // Если источник и цель совпадают, разрешаем перемещение без проверок веса
      if (source !== target) {
        // Если вес больше лимита, устанавливаем сообщение об ошибке и возвращаемся
        const newWeight = updatedData.weight[target] + (item.weight || 0);
        if (newWeight > updatedData.limit[target]) {
          return {
            ...prevData,
            weightError: {
              ...prevData.weightError,
              [target]: `Вес превышен!`,
            },
          };
        }
      }

      // Удаляем сообщение об ошибке, если все в порядке
      updatedData.weightError = {
        ...updatedData.weightError,
        [target]: "",
      };

      // Удаляем предмет из источника
      if (sourceIndex !== -1) {
        sourceData[sourceIndex] = null;
      }

      // Если в целевой ячейке уже есть предмет, меняем их местами
      const targetItem = targetData[targetIndex];
      if (targetItem && sourceIndex !== -1) {
        sourceData[sourceIndex] = targetItem;
      }

      // Перемещаем предмет в целевую ячейку
      targetData[targetIndex] = {
        ...item,
        itemId: item.itemId,
        name: item.name,
        quantity: item.quantity,
        data: item.data,
        width: item.width,
        height: item.height,
      };

      updatedData[source] = sourceData;
      updatedData[target] = targetData;

      // Пересчитываем вес
      updatedData.weight[source] = calculateWeight(sourceData);
      updatedData.weight[target] = calculateWeight(targetData);

      return updatedData;
    });
  };

  return (
    <InventoryContext.Provider value={{ inventoryData, moveItem, unlockTrunk }}>
      {children}
    </InventoryContext.Provider>
  );
};
