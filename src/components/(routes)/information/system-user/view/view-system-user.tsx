"use client";

import { Form } from "antd";
import { UploadFile } from "antd/lib";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import AddressItem from "@/components/items/address-item";
import EmailItem from "@/components/items/email-item";
import UploadImageItem from "@/components/items/image-upload-item";
import NameItem from "@/components/items/name-item";
import PhoneItem from "@/components/items/phone-item";
import SelectPositionItem from "@/components/items/position-select-item";
import RegisterItem from "@/components/items/register-item";
import SelectUserLevelItem from "@/components/items/user-level-select-item";
import Wrapper from "@/components/wrapper";
import SelectOrganizationItem from "@/components/items/project-type-select-item";
import { useNotification } from "@/hooks/use-notification";
import Title from "@/components/title";
import AimagCityItem from "@/components/items/aimag-select-item";
import DistrictItem from "@/components/items/sum-select-item";
import SelectKhorooItem from "@/components/items/khoroo-select-item";
import SelectdriverLicenceType from "@/components/items/select-driver-licence-item";
import dayjs from "dayjs";
import { useUserByID } from "@/hooks/use-users";
import DateItem from "@/components/items/date-item";
import ChevronLeftIcon from "@/components/icons/chevron-left-icon";
import PenIcon from "@/components/icons/pen-icon";

type IProps = {
  id: number;
};

type IFormItem = {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  reg_no: string;
  address: string;
  role_code: string;
  password: string;
  description: string;
  image: UploadFile[];
  position_code: string;
  organization_id: string;
  driver_license_type: string;
  license_number: string;
  graduated_date: string;
  expired_date: string;
  profile_picture_url: string | null;
};

const ViewSystemUserForm: React.FC<IProps> = ({ id }) => {
  const { data: user, isLoading, mutate } = useUserByID(id);
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useNotification();
  const values = Form.useWatch([], form);
  const [isDriver, setIsDriver] = useState<boolean>(false);

  const formatDate = (dateString: string | Date): string => {
    return dayjs(dateString).format("YYYY-MM-DD"); // Using dayjs for consistency
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        phone: user.org_user.User.phone || "",
        email: user.org_user.User.email || "",
        first_name: user.org_user.User.first_name || "",
        last_name: user.org_user.User.last_name || "",
        reg_no: user.org_user.User.reg_no || "",
        aimag_code: user.org_user.User.aimag_code || "",
        sum_code: user.org_user.User.sum_code || "",
        bag_code: user.org_user.User.bag_code || "",
        address_detail: user.org_user.User.address_detail || "",
        role_code: user.roles[0]?.id || "",
        position_code: user.org_user.User.position_code || "",
        organization_id: user.org_user.organization_id || "",
        image: user.org_user.User.profile_picture_url
          ? [
              {
                uid: user.org_user.User.profile_picture_url,
                name: "Profile Image",
                status: "done",
                url: user.org_user.User.profile_picture_url,
              },
            ]
          : [],
      });

      const isDriver = user.org_user.User.position_code === "PC2";
      setIsDriver(isDriver);

      if (isDriver) {
        form.setFieldsValue({
          graduated_date: user.driver.graduated_date
            ? dayjs(user.driver.graduated_date)
            : null,
          expired_date: user.driver.expired_date
            ? dayjs(user.driver.expired_date)
            : null,
          driver_license_type: user.driver.driver_license_type || "",
          license_number: user.driver.license_number || "",
        });
      }
    }
  }, [user]);

  const handlePositionChange = (value: string) => {
    setIsDriver(value === "PC2");
  };

  const handleAimagChange = () => {
    form.setFieldsValue({
      sum_code: undefined,
      bag_code: undefined,
    });
  };

  const handleDistrictChange = () => {
    form.setFieldsValue({
      bag_code: undefined,
    });
  };

  useEffect(() => {
    if (values?.graduated_date) {
      const formattedDate = formatDate(values.graduated_date);
    }
  }, [values?.graduated_date]);

  return (
    <>
      {user && (
        <Form
          form={form}
          disabled={loading}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          className="flex flex-col gap-4"
        >
          <Button
            icon={<ChevronLeftIcon />}
            disabled={loading}
            placeholder="Буцах"
            variant="icon"
            onClick={() => router.back()}
          />
          <div className="w-full h-full flex gap-6">
            <Wrapper className="flex-1 p-6 h-full">
              <div className="flex justify-between"></div>
              <div className="flex">
                <div className="w-1/3">
                  <UploadImageItem name={"image"} />
                </div>
                <div className="w-2/3">
                  <Title level={2} title="Ерөнхий мэдээлэл" />
                  <div className="grid grid-cols-2 gap-x-4 w-full">
                    <NameItem userName name="last_name" label="Овог" disabled />
                    <NameItem
                      userName
                      disabled
                      name="first_name"
                      label="Хэрэглэгчийн нэр"
                    />
                    <RegisterItem required name="reg_no" disabled />
                    <EmailItem required disabled />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-4 w-full h-full">
                <PhoneItem required name="phone" disabled />
                <SelectOrganizationItem name="organization_id" disabled />
                <SelectPositionItem
                  name="position_code"
                  onChange={handlePositionChange}
                  disabled
                />
                <SelectUserLevelItem allowClear name="role_code" disabled />
              </div>
              <div />

              <Title level={2} title="Хаягийн мэдээлэл" />
              <div className="grid grid-cols-3 gap-x-4 w-full h-full">
                <AimagCityItem
                  allowClear
                  onChange={handleAimagChange}
                  disabled
                />
                <DistrictItem
                  allowClear
                  onChange={handleDistrictChange}
                  aimagId={values?.aimag_code || undefined}
                  disabled
                />
                <SelectKhorooItem
                  allowClear
                  name="bag_code"
                  sum={values?.sum_code}
                  aimag={values?.aimag_code}
                  disabled
                />
              </div>
              <AddressItem name="address_detail" required disabled />
              {isDriver && (
                <>
                  <Title level={2} title="Жолоочийн мэдээлэл" />
                  <div className="grid grid-cols-2 gap-x-4 w-full h-full">
                    <SelectdriverLicenceType
                      name="driver_license_type"
                      disabled
                    />
                    <RegisterItem
                      disabled
                      name="license_number"
                      variant="driver"
                      label="Жолооны үнэмлэх дугаар"
                    />
                    <DateItem name="graduated_date" label="Төгссөн огноо" />
                    <DateItem name="expired_date" label="Дуусах огноо" />
                  </div>
                </>
              )}
            </Wrapper>
          </div>
        </Form>
      )}
    </>
  );
};

export default ViewSystemUserForm;
