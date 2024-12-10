export type Success = {
  garchig: string;
  created_at: string;
  tusul_duussan_ognoo: string;
  tusul_turul_ner: string;
  shimtgel_huvi: number;
  percentage_dun: number;
};

export type ReportSuccessIncome = {
  sum_percentage_dun?: number;
  projects: Success;
};
