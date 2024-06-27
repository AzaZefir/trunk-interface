export const calculateTotalSlots = (props) => {
  const { data, initialTotal } = props;
  let total = initialTotal;
  data?.forEach((item) => {
    if (item && item?.width > 1) {
      total -= item?.width - 1;
    }
    if (item && item?.height > 1) {
      total -= item?.height - 1;
    }
  });
  return total;
};
