import { format } from "date-fns";

export const formatDate = (date: Date): string => {
  return format(new Date(date), "yyyy年MM月dd日");
};
