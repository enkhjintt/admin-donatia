export type Project = {
  garchig: string;
  created_at: string;
  tusul_duussan_ognoo: string;
  honog: number;
  dun: number; // Amount related to the project
};

export type ReportFeeIncome = {
  sum_percentage_dun?: number;
  projects: Project;
};
