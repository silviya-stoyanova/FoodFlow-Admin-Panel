import { checkIsInRange, reverseDate } from "./common";
import { DATE_TYPES } from "./constants";

const { CREATED_DATE, DELIVERED_DATE } = DATE_TYPES;

const filterData = (data, filters, setDisplayData, setPage) => {
  const filteredData = data.filter((item) => {
    for (const key in filters) {
      const { start: startDate, end: endDate } = filters[key];
      const startDateFormatted = startDate && new Date(reverseDate(startDate));
      const endDateFormatted = endDate && new Date(reverseDate(endDate));
      const isInRange = checkIsInRange(
        item[key],
        startDateFormatted,
        endDateFormatted
      );
      const isBeforeStartDate =
        startDate && item[key] < new Date(reverseDate(startDate));
      const isAfterEndDate =
        item[key] > endDateFormatted || item[key].length === 0;
      const areDifferent = item[key].toString() !== filters[key].toString();

      // if column does not store Date
      if (key !== CREATED_DATE && key !== DELIVERED_DATE && areDifferent) {
        return false;
      }
      if (startDate && endDate && !isInRange) {
        return false;
      }
      if (startDate && isBeforeStartDate) {
        return false;
      }
      if (endDate && isAfterEndDate) {
        return false;
      }
    }

    return true;
  });
  setDisplayData(filteredData);

  setPage(0);
};

export default filterData;
