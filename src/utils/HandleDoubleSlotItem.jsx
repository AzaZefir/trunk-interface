// Function to handle moving items with height 2
export const handleMoveHeight2 = (
  source,
  target,
  item,
  sourceData,
  targetData,
  sourceIndex,
  targetIndex,
  targetItem
) => {
  // Определяем ширину секции
  const sourceWidth = source === "trunk" ? 6 : 5;
  const targetWidth = target === "trunk" ? 6 : 5;

  // Определяем индекс элемента ниже целевого индекса
  const targetItemBelowIndex = targetIndex + targetWidth;

  // Проверяем, чтобы индексы не выходили за границы
  if (targetItemBelowIndex >= targetData.length) {
    return;
  }

  const targetItemBelow = targetData[targetItemBelowIndex];

  // Обновляем данные для исходной и целевой секций
  sourceData[sourceIndex] = targetItem || null;
  sourceData[sourceIndex + sourceWidth] = targetItemBelow || null;

  targetData[targetIndex] = { ...item, isFirstCopy: true };
  targetData[targetItemBelowIndex] = {
    ...item,
    isCopy: true,
    isFirstCopy: false,
  };
};

// Function to handle moving items with width 2
export const handleMoveWidth2 = (
  item,
  sourceData,
  targetData,
  sourceIndex,
  targetIndex,
  targetItem
) => {
  const targetItemNext = targetData[targetIndex + 1];

  sourceData[sourceIndex] = targetItem || null;
  sourceData[sourceIndex + 1] = targetItemNext || null;

  targetData[targetIndex] = { ...item, isFirstCopy: true };
  targetData[targetIndex + 1] = {
    ...item,
    isCopy: true,
    isFirstCopy: false,
  };
};
