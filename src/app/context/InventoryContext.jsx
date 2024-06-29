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

      if (sourceIndex === -1) {
        return prevData; // Предмет не найден в исходной секции
      }

      const sourceItem = sourceData[sourceIndex];
      const targetItemIndex = targetData.findIndex(
        (invItem) => invItem?.itemId === item.itemId
      );

      // Если в целевой ячейке уже есть предмет, меняем их местами
      const targetItem = targetData[targetIndex];

      if (targetItem && sourceIndex !== -1) {
        sourceData[sourceIndex] = targetItem;
        targetData[targetIndex] = sourceItem;
      } else {
        // Проверка веса при перемещении между секциями
        if (source !== target) {
          const newWeight = updatedData.weight[target] + (item.weight || 0);
          if (newWeight > updatedData.limit[target]) {
            return {
              ...prevData,
              weightError: {
                ...prevData.weightError,
                [target]: "Вес превышен!",
              },
            };
          }

          updatedData.weightError = {
            ...updatedData.weightError,
            [target]: "",
          };

          // Логика для перемещения между разными секциями
          if (sourceItem.quantity > 1) {
            sourceItem.quantity -= 1;
          } else {
            sourceData[sourceIndex] = null;
          }

          if (targetItemIndex !== -1) {
            targetData[targetItemIndex].quantity += 1;
          } else {
            targetData[targetIndex] = {
              ...item,
              quantity: 1,
            };
          }
        } else {
          // Логика для перемещения внутри одной секции
          if (sourceIndex !== targetIndex) {
            if (sourceItem.quantity === 3 || sourceItem.quantity === 2) {
              // Перемещение предмета с quantity === 3 без изменения количества
              sourceData[sourceIndex] = null;
              targetData[targetIndex] = {
                ...item,
                quantity: sourceItem.quantity,
              };
            } else {
              // Обычное перемещение внутри одной секции
              if (sourceItem.quantity > 1) {
                sourceItem.quantity -= 1;
              } else {
                sourceData[sourceIndex] = null;
              }

              if (targetData[targetIndex]) {
                targetData[targetIndex].quantity += 1;
              } else {
                targetData[targetIndex] = {
                  ...item,
                  quantity: 1,
                };
              }
            }
          }
        }
      }

      updatedData[source] = sourceData; // Удаление null элементов
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
