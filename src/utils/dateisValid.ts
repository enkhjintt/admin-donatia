import dayjs from "dayjs";

export function isDateValid(date: string) {
  return date && dayjs(date, "YYYY-MM-DD", true).isValid() ? date : "";
}
