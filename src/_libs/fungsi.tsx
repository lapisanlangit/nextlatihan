import { format } from "date-fns";
export const formatNumber = () => {
  return new Intl.NumberFormat("de-DE");
};

export const formatDate = (date: Date | string | number): string => {
  return format(date, "dd-MM-yyyy");
};
