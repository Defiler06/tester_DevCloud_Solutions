export const dateFromString = (date) => {
  const [day, month, year] = date.split('/');

  const adjustedMonth = parseInt(month, 10) - 1;

  const dateObject = new Date(year, adjustedMonth, day);

  return dateObject;
}
