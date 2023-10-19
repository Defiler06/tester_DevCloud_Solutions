import {dateFromString} from "@/helpers/dateFromString";

export const formattedDate = (date) => {
  const formattedDate = dateFromString(date);

  if(isNaN(formattedDate)) return 'Неккоректная дата';

  const day = formattedDate.getDate();
  const month = formattedDate.getMonth() + 1;
  const year = formattedDate.getFullYear();

  return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
};
