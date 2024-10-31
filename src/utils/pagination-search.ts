import { DefaultPagination, TMetaData } from "../constants/index";
import filterUndefinedProperties, { AnyObject } from "./empty-filter";

export const generateParams = <T>(
  pagination?: DefaultPagination,
  search?: T
): URLSearchParams => {
  const cleanedData = filterUndefinedProperties(search as AnyObject);

  const params = new URLSearchParams(cleanedData);

  if (pagination) {
    params.set("page_number", pagination.page_number?.toString() || "");
    params.set("page_size", pagination.page_size?.toString() || "");
  }

  return params;
};

export const getMetaData = <T extends TMetaData>(
  data?: T
): TMetaData | undefined => {
  if (data) {
    const { page_number, page_size, total_page, total_row } = data;
    return {
      page_number,
      page_size,
      total_page,
      total_row,
    };
  }
  return undefined;
};

export const getSearchParams = (id: string): URLSearchParams => {
  const cleanedData = filterUndefinedProperties({ id } as AnyObject);
  const params = new URLSearchParams(cleanedData);
  return params;
};
