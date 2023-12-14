const formatCellWithDate = (cell) =>
  cell instanceof Date && cell.toLocaleDateString("en-GB", "dd/MM/YYYY");

const convertToTitleCase = (text) => {
  const words = text.replace(/([A-Z])/g, " $1").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const reverseDate = (date) => date.split("/").reverse().join("/");

const checkIsInRange = (date, startDate, endDate) =>
  date >= startDate && date <= endDate;

export { formatCellWithDate, reverseDate, checkIsInRange, convertToTitleCase };
