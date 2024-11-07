import { UploadFile } from "antd";
import { TlookUp } from "../common";

export type User = {
  id: number;
  family_name: string;
  last_name: string;
  first_name: string;
  birth_date: string;
  gender_code: string;
  aimag_code: string;
  sum_code: string;
  bag_code: string;
  address_detail: string;
  profile_picture_url: string;
};

export type TUser = {
  role_code: any;
  id: number;
  family_name: string;
  last_name: string;
  first_name: string;
  phone: string;
  email: string;
  password: string;
  birth_date: string;
  reg_no: string;
  civil_id: string;
  gender_code: string;
  profile_picture_url: string;
  position_code: string;
  address_detail: string;
  aimag_code: string;
  sum_code: string;
  bag_code: string;
  gender: string;
  status: TlookUp;
  position: TlookUp[];
  Role: {
    id: number;
    role_code: string;
    client_id: number;
    name: string;
  };
  //view det
  aimag: {
    id: number;
    code: string;
    name: string;
    sequence: number;
  };
  sum: {
    id: number;
    code: string;
    name: string;
    sequence: number;
    aimag_city_code: string;
  };
  bag: {
    id: number;
    aimag_city_code: string;
    code: string;
    name: string;
    sequence: number;
    sum_district_code: string;
  };
};

export type DriverCerf = {
  user_id: number;
  driver_license_type: string;
  license_number: string;
  graduated_date: string;
};

export type UserResponse = {
  User: any;
  driver: {
    user_id: number | null;
    driver_license_type: string | null;
    license_number: string | null;
    graduated_date: string | null;
    expired_date: string | null;
  };
  org_user: {
    organization_id: string;
    user_id: number;
    role_id: number;
    User: TUser;
    aimag: {
      id: number;
      code: string;
      name: string;
      sequence: number;
    };
    sum: {
      id: number;
      code: string;
      name: string;
      sequence: number;
      aimag_city_code: string;
    };
    bag: {
      id: number;
      aimag_city_code: string;
      code: string;
      name: string;
      sequence: number;
      sum_district_code: string;
    };

    Organization: {
      id: number;
      organization_id: string;
      name: string;
      register_number: string;
      type_code: string;
      parent_id: number;
      aimag_code: string;
      sum_code: string;
      bag_code: string;
      address_detail: string;
      email: string;
      status: string;
      created_at: string;
      created_by_id: number;
      updated_at: string;
      updated_by_id: number;
      deleted_at: string;
      parent: string;
      children: string;
      type: string;
      bank: string;
      contacts: string;
      wallet: string;
    };
    Role: string;
    Position: [
      {
        id: number;
        code: string;
        name: string;
      }
    ];
  };
  roles: [
    {
      id: number;
      code: string;
      name: string;
      permissions: string[];
      created_at: string;
      created_by_id: number;
      updated_at: string;
      updated_by_id: number;
      status: string;
      client: string;
      user: string;
    }
  ];
};

//role
export type TSearchV = {
  phone?: string | undefined;
  lastName?: string | undefined;
  first_name?: string | undefined;
  user_id?: number;
  start_date?: string;
  end_date?: string;
};
