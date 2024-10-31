export type DefaultPagination = {
  page_number: number;
  page_size: number;
};

export const defaultPagination = {
  page_number: 1,
  page_size: 10,
};

export const defaultPaginationMax = {
  page_number: 1,
  page_size: 10000000000000,
};

export type TMetaData = {
  total_page: number;
  total_row: number;
} & DefaultPagination;

export type PaginationResponse<T> = {
  items: T[];
} & TMetaData;

export const colorThemeNames = ['light', 'dark'] as const;

// Can't use type ColorThemeName because of circular dependency
export const defaultColorThemeName: (typeof colorThemeNames)[number] = 'light';

// Cookie key for color theme
export const colorThemeCookieName = 'myAppColorTheme';
