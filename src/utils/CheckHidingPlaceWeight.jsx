export const checkHidingPlaceWeight = (
  target,
  item,
  targetData,
  targetItem,
  source,
  setIsPocketHidenPlaceOverweight,
  setIsBagHidenPlaceOverweight,
  setIsTrunkHidenPlaceOverweight
) => {
  const hidingPlaceWeight = targetData.reduce(
    (total, invItem) =>
      total + (invItem?.weight || 0) * (invItem?.quantity || 1),
    0
  );
  if (
    target === "pocketHidingData" ||
    target === "bagHidingData" ||
    target === "trunkHidingData" ||
    (source !== "bag" &&
      source !== "pocket" &&
      source !== "trunk" &&
      targetItem &&
      targetItem.weight * targetItem.quantity > 0.5)
  ) {
    const newHidingPlaceWeight = hidingPlaceWeight + (item.weight || 0);

    if (newHidingPlaceWeight > 0.5) {
      if (
        target === "pocketHidingData" ||
        (target === "trunk" && source === "pocketHidingData") ||
        (target === "pocket" && source !== "bagHidingData") ||
        (target === "bag" && source === "pocketHidingData")
      ) {
        setIsPocketHidenPlaceOverweight(true);
      } else if (
        target === "bagHidingData" ||
        target === "bag" ||
        (target === "trunk" && source === "bagHidingData") ||
        (target === "pocket" && source === "bagHidingData")
      ) {
        setIsBagHidenPlaceOverweight(true);
      } else if (
        target === "trunkHidingData" ||
        target === "bag" ||
        target === "pocket" ||
        (target === "trunk" && source === "trunkHidingData")
      ) {
        setIsTrunkHidenPlaceOverweight(true);
      }
      return false;
    }
  }

  return true;
};
