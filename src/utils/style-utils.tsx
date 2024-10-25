export const ScrollClassName =
  "max-w-xs sm:max-w-sm md:max-w-none w-full overflow-x-auto";

export const FocusClassName = "focus-visible-class";

export const TableClassName = `mt-5    border border-x border-gray-200 bg-gray-200 rounded-md`;

export const getStatusClass = (statusCode: string) => {
  switch (statusCode) {
    case "LOST":
      return "bg-error-lighter text-error-dark";
    case "INACTIVE":
      return "bg-gray-400 text-gray-600";
    case "FREEZE":
      return "bg-info-lighter text-info-dark";
    case "DAMAGED":
      return "bg-warning-lighter text-warning-dark";
    case "ACTIVE":
      return "bg-success-light text-success-dark";
    default:
      return "";
  }
};
//
export const getGasStationStyle = (station_type: string | null) => {
  let text = "";

  switch (station_type) {
    case "CONTRACTED":
      text = "Гэрээт";
      break;
    case "NON_CONTRACTED":
      text = "Гэрээт бус";
      break;
    default:
      text = "Тодорхойгүй";
      break;
  }
  return <>{text}</>;
};

//захиалгын төлөв
export const getOrderStatusStyle = (status: string | null) => {
  let style = "";
  let text = "";

  switch (status) {
    case "Confirmed":
      style = "bg-success-normal text-gray-200";
      text = "Шийдвэрлэсэн";
      break;
    case "Cancelled":
      style = "bg-error-normal text-gray-200";
      text = "Цуцалсан";
      break;
    default:
      style = "bg-warning-normal text-gray-200";
      text = "Хүлээгдэж буй";
      break;
  }
  return (
    <span
      className={`py-1 block w-21 text-center  rounded-xl font-normal text-xs leading-3 ${style}`}
    >
      {text}
    </span>
  );
};
export const getRouteStatusStyle = (status: string | null) => {
  let style = "";
  let text = "";

  switch (status) {
    case "A":
      style = "bg-success-normal text-gray-200";
      text = "Энгийн";
      break;
    case "ORDER":
      style = "bg-warning-normal text-gray-200";
      text = "Захиалгын";
      break;
    default:
      style = "bg-gray-400 text-base-white";
      text = "Тодорхойгүй";
      break;
  }
  return (
    <span
      className={`py-2 block w-40 rounded-xl font-medium text-xs  ${style}`}
    >
      {text}
    </span>
  );
};
export const getActiveStatusStyle = (status: string | null) => {
  let style = "";
  let text = "";

  switch (status) {
    case "ACTIVE":
      style = "bg-success-normal text-gray-200";
      text = "Идэвхтэй";
      break;
    case "INACTIVE":
      style = " bg-error-normal text-gray-200";
      text = "Идэвхгүй";
      break;
    default:
      style = "bg-gray-400 text-base-white";
      text = "";
      break;
  }

  return (
    <span
      className={`py-1  text-center rounded-xl font-normal text-xs leading-3 ${style}  block w-20`}
    >
      {text}
    </span>
  );
};
export const getShipmentStatusStyle = (status: string | null) => {
  let style = "";
  let text = "";

  switch (status) {
    case "Take\n":
      style = "bg-success-normal text-gray-200";
      text = "Идэвхтэй";
      break;
    default:
      style = "bg-error-normal text-gray-200";
      text = "Ачаагүй";
      break;
  }

  return (
    <span
      className={`py-1  text-center rounded-xl font-normal text-xs leading-3 ${style}  block w-20`}
    >
      {text}
    </span>
  );
};
export const getBinStatusStyle = (status: string | null) => {
  let style = "";
  let text = "";

  switch (status) {
    case "R":
      style = "bg-success-normal text-gray-200";
      text = "Хэвийн";
      break;
    case "P":
      style = "bg-error-normal text-gray-200";
      text = "Дүүрсэн";
      break;
    case "S":
      style = "bg-warning-normal text-gray-200";
      text = "Шалгах шаардлагатай";
      break;
    default:
      style = "bg-gray-400 text-base-white";
      text = "Тодорхойгүй";
      break;
  }

  return (
    <span
      className={`px-2 py-1 w-46 block text-center rounded-xl font-medium text-xs ${style}`}
    >
      {text}
    </span>
  );
};

export const ColorComponent = (color: string) => {
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="flex gap-2 items-center">
      <span
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: hexToRgb(color) }}
      ></span>

      {color.toUpperCase()}
    </div>
  );
};
