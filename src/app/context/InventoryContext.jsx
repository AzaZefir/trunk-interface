import React, { createContext, useEffect, useState } from "react";
import {
  bagData,
  inventoryData as initialInventoryData,
  trunkData,
} from "../../data/index";
import { calculateWeight } from "../../utils/CalculateWeight";
import { weightLimitCheck } from "../../utils/WeightLimitCheck";
import { checkHidingPlaceWeight } from "../../utils/CheckHidingPlaceWeight";
import {
  handleMoveHeight2,
  handleMoveWidth2,
} from "../../utils/HandleDoubleSlotItem";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventoryData, setInventoryData] = useState({
    pocket: initializeItems(initialInventoryData, [4]),
    pocketHidingData: [],
    bag: initializeItems(bagData, [4]),
    bagHidingData: [],
    trunk: initializeItems(trunkData, [5, 11], "trunk"),
    trunkHidingData: [],
    weight: {
      trunk: 0,
      pocket: 0,
      bag: 0,
    },
    limit: {
      trunk: 50,
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

  const [isBagHidenPlaceOverweight, setIsBagHidenPlaceOverweight] = useState(false)
  const [isPocketHidenPlaceOverweight, setIsPocketHidenPlaceOverweight] = useState(false)
  const [isTrunkHidenPlaceOverweight, setIsTrunkHidenPlaceOverweight] = useState(false)

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
      const sourceItem = sourceData[sourceIndex];
      const targetItemIndex = targetData.findIndex(
        (invItem) => invItem?.itemId === item.itemId
      );
      const targetItem = targetData[targetIndex];

      if (sourceIndex === -1) {
        return prevData; // Предмет не найден в исходной секции
      }

      // Проверка веса для тайника
      if (
        !checkHidingPlaceWeight(
          target,
          item,
          targetData,
          targetItem,
          source,
          setIsPocketHidenPlaceOverweight,
          setIsBagHidenPlaceOverweight,
          setIsTrunkHidenPlaceOverweight
        )
      ) {
        return prevData;
      }

      // Проверка веса при перемещении между секциями
      if (source !== target) {
        const { weightError, isValid } = weightLimitCheck(
          source,
          target,
          item,
          targetItem,
          updatedData
        );
        if (!isValid) {
          return {
            ...prevData,
            weightError,
          };
        }
        updatedData.weightError = weightError;
      }

      updatedData.weightError = {
        ...updatedData.weightError,
        [target]: "",
      };

      const isTwoSlotItem = (idx) => {
        return (
          targetData[idx] &&
          (targetData[idx].width === 2 || targetData[idx].height === 2)
        );
      };

      const isDraggedItemTwoSlot = () => {
        return item.width === 2 || item.height === 2;
      };

      if (isDraggedItemTwoSlot() && isTwoSlotItem(targetIndex)) {
        console.log("Cannot swap two-slot items");
        return prevData;
      }

      if (
        (target === "bagHidingPlace" || target === "pocketHidingPlace") &&
        item.weight > 0.5
      ) {
        console.log(
          "Cannot place item in hiding place as it exceeds weight limit"
        );
        return prevData;
      }

      if (item.width === 2 || item.height === 2) {
        const rowIndex = Math.floor(targetIndex / (target === "trunk" ? 6 : 5));

        const isAtRightEdge =
          (rowIndex < 1 && targetIndex % 5 === 3) ||
          (rowIndex >= 1 && targetIndex % 5 === 4);

        const isAtRightEdgeTrunk =
          (rowIndex < 2 && targetIndex % 6 === 4) ||
          (rowIndex >= 2 && targetIndex % 6 === 5);

        if (
          (targetIndex < targetData.length - 1 &&
            isTwoSlotItem(targetIndex + 1) &&
            item.height !== 2) ||
          (target === "trunk"
            ? targetIndex < targetData.length - 6 &&
              isTwoSlotItem(targetIndex + 6) &&
              item.width !== 2
            : targetIndex < targetData.length - 5 &&
              isTwoSlotItem(targetIndex + 5) &&
              item.width !== 2) ||
          (item.width === 2 && isAtRightEdge && target === "bag") ||
          (item.width === 2 && isAtRightEdgeTrunk && target === "trunk") ||
          (item.width === 2 && isAtRightEdge && target === "pocket") ||
          (item.height === 2 && targetIndex >= 15 && target === "bag") ||
          (item.height === 2 && targetIndex >= 5 && target === "pocket") ||
          (item.height === 2 && targetIndex >= 36 && target === "trunk") ||
          (inventoryData.locked &&
            target === "trunk" &&
            item.height === 2 &&
            targetIndex >= 12)
        ) {
          console.log("Cannot drop item here due to constraints");
          return prevData;
        }
      }

      if (targetItem && (targetItem.width === 2 || targetItem.height === 2)) {
        console.log("Cannot swap with a two-slot item");
        return prevData;
      }

      if (
        targetItem &&
        sourceIndex !== -1 &&
        targetItem.name !== sourceItem.name
      ) {
        sourceData[sourceIndex] = targetItem;
        targetData[targetIndex] = sourceItem;
      } else {
        // Проверка веса при перемещении между секциями
        if (source !== target) {
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
      // Новая логика для предметов с шириной 2 или высотой 2
      if (item.width === 2) {
        handleMoveWidth2(
          item,
          sourceData,
          targetData,
          sourceIndex,
          targetIndex,
          targetItem
        );
      } else if (item.height === 2) {
        handleMoveHeight2(
          source,
          target,
          item,
          sourceData,
          targetData,
          sourceIndex,
          targetIndex,
          targetItem
        );
      }
      updatedData[source] = sourceData; // Удаление null элементов
      updatedData[target] = targetData;

      // Пересчитываем вес
      updatedData.weight[source] = calculateWeight(sourceData);
      updatedData.weight[target] = calculateWeight(targetData);

      return updatedData;
    });
  };

  // Function to initialize items in the inventory
  function initializeItems(data, skipIndices = [], source) {
    const items = new Array(source === "trunk" ? 42 : 20).fill(null);
    let currentIndex = 0;
    const sourceTrunk = source === "trunk" ? 6 : 5;
    data.forEach((item) => {
      if (item.width === 2) {
        while (
          skipIndices.includes(currentIndex) ||
          skipIndices.includes(currentIndex + 1) ||
          items[currentIndex] !== null ||
          items[currentIndex + 1] !== null
        ) {
          currentIndex += 1;
        }
        if (currentIndex < items.length) {
          items[currentIndex] = { ...item, isFirstCopy: true };
          if (currentIndex + 1 < items.length) {
            items[currentIndex + 1] = {
              ...item,
              isCopy: true,
              isFirstCopy: false,
            };
          }
          currentIndex += 2;
        }
      } else if (item.height === 2) {
        while (
          skipIndices.includes(currentIndex) ||
          skipIndices.includes(currentIndex + sourceTrunk) ||
          items[currentIndex] !== null ||
          items[currentIndex + sourceTrunk] !== null
        ) {
          currentIndex += 1;
        }
        if (currentIndex < items.length) {
          items[currentIndex] = { ...item, isFirstCopy: true };
          if (currentIndex + sourceTrunk < items.length) {
            items[currentIndex + sourceTrunk] = {
              ...item,
              isCopy: true,
              isFirstCopy: false,
            };
          }
          currentIndex += 1;
        }
      } else {
        while (
          skipIndices.includes(currentIndex) ||
          items[currentIndex] !== null
        ) {
          currentIndex += 1;
        }
        if (currentIndex < items.length) {
          items[currentIndex] = item;
          currentIndex += 1;
        }
      }
    });

    return items;
  }

  return (
    <InventoryContext.Provider
      value={{
        inventoryData,
        moveItem,
        unlockTrunk,
        isBagHidenPlaceOverweight,
        isPocketHidenPlaceOverweight,
        isTrunkHidenPlaceOverweight,
        setIsBagHidenPlaceOverweight,
        setIsPocketHidenPlaceOverweight,
        setIsTrunkHidenPlaceOverweight,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
