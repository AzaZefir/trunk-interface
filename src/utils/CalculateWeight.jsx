export const calculateWeight = (data) => {
  return data.reduce(
    (acc, item) => acc + (item && !isNaN(item.weight) ? item.weight : 0),
    0
  );
};
