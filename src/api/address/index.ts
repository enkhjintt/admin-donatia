export type CityResponse = {
  id: number;
  code: string;
  name: string;
  status: string;
  sequence: number;
};

export type DistrictResponse = {
  id: number;
  code: string;
  name: string;
  status: string;
  sequence: number;
  aimag_city_code: string;
};
