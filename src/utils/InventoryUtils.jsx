export const calculateTotalSlots = (props) => {
  const { data, initialTotal } = props;
  let total = initialTotal;
  data?.forEach((item) => {
    if (item && item?.Width > 1) {
      total -= item?.Width - 1;
    }
    if (item && item?.Height > 1) {
      total -= item?.Height - 1;
    }
  });
  return total;
};
