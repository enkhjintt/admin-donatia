import dayjs from "dayjs";

// export const convertDateFormat = (inputDate: string): string =>
//   dayjs(inputDate).format("YYYY-MM-DD HH:mm:ss");
export const convertDateFormat = (inputDate: string | undefined): string => {
  if (inputDate === undefined) {
    return "";
  }

  return dayjs(inputDate).format("YYYY-MM-DD");
};

export const formatCount = (
  expireCount: number | null,
  totalCount: number | null
): string => {
  return expireCount !== null && totalCount !== null
    ? `${expireCount}/${totalCount}`
    : "";
};

export const formatNumberToTugrik = (
  value: number = 0,
  locale: string = "mn-MN",
  flag: boolean = true
): string => {
  const formattedValue = new Intl.NumberFormat(locale).format(value);
  return `${flag === true ? "₮" : ""}${formattedValue}${
    flag === true ? ".00" : ""
  }`;
};

export const shortenString = (str: string): string => {
  if (str) {
    if (str.length > 12) {
      return `${str.substring(0, 10)}...${str.substring(str.length - 3)}`;
    }
    return str;
  }
  return "";
};

const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { target } = e;
  const { selectionStart, selectionEnd } = target as HTMLInputElement;
  const { value } = target as HTMLInputElement;

  if (
    selectionStart !== null &&
    selectionEnd !== null &&
    selectionStart === selectionEnd &&
    selectionStart > 0
  ) {
    const newValue: string =
      value.slice(0, selectionStart - 1) + value.slice(selectionEnd);
    (target as HTMLInputElement).value = newValue;
    (target as HTMLInputElement).setSelectionRange(
      selectionStart - 1,
      selectionStart - 1
    );
    e.preventDefault();
  }
};

export const inputConverterToNumber = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  const isBackspace: boolean = e.key === "Backspace";
  const isValidKey: boolean = /^\d$/.test(e.key);

  // Allow copying
  if (e.ctrlKey || e.metaKey) return;

  if (!isBackspace && !isValidKey) {
    e.preventDefault(); // Prevent non-numeric input
    return;
  }

  // if (isBackspace) {
  //   handleBackspace(e);
  // }
};

export const inputConverterToFloat = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  const isBackspace: boolean = e.key === "Backspace";
  const isValidKey: boolean = /^\d$/.test(e.key);
  const isDecimalPoint: boolean = e.key === ".";

  // Allow copying
  if (e.ctrlKey || e.metaKey) return;

  if (!isBackspace && !isValidKey && !isDecimalPoint) {
    e.preventDefault(); // Prevent non-numeric input
    return;
  }

  if (isDecimalPoint) {
    const input = e.currentTarget.value;
    if (input.includes(".")) {
      e.preventDefault(); // Prevent multiple decimal points
      return;
    }
  }
};
