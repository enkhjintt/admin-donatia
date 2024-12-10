export type Year = {
  orlogo_type: string;
  ognoo: string;
  ognoo_sum: number;
};

export type ReportYearIncome = {
  sum_percentage_dun?: number;
  projects: Year;
};
