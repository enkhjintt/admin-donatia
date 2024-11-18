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
import { editSystemUser } from "@/api/user/system-user";
import { useUserByID } from "@/hooks/use-users";
import DateItem from "@/components/items/date-item";
import ChevronLeftIcon from "@/components/icons/chevron-left-icon";

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
  // password: string;
  description: string;
  image: UploadFile[];
  position_code: string;
  organization_id: string;
  driver_license_type: string;
  license_number: string;
  graduated_date: string;
  expired_date: string;
};

const EditSystemUserForm: React.FC<IProps> = ({ id }) => {
  const { data: user, isLoading, mutate } = useUserByID(id);
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useNotification();
  const values = Form.useWatch([], form);
  const [isdriver, setIsdriver] = useState<boolean>(false);

  const formatDate = (dateString: string | Date): string => {
    let date: Date;

    if (typeof dateString === "string") {
      date = new Date(dateString);
    } else {
      date = dateString;
    }

    return date.toISOString().split("T")[0]; // Format to yyyy-mm-dd
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        phone: user.org_user.User.phone,
        email: user.org_user.User.email,
        first_name: user.org_user.User.first_name,
        last_name: user.org_user.User.last_name,
        reg_no: user.org_user.User.reg_no,
        aimag_code: user.org_user.User.aimag_code,
        sum_code: user.org_user.User.sum_code,
        bag_code: user.org_user.User.bag_code,
        address_detail: user.org_user.User.address_detail,
        role_code: user.roles[0].id,
        position_code: user.org_user.User.position_code,
        organization_id: user.org_user.organization_id,
      });

      const isdriver = user.org_user.User.position_code === "PC2";
      setIsdriver(isdriver);

      if (isdriver) {
        const graduatedDate = user.driver.graduated_date
          ? dayjs(user.driver.graduated_date).isValid()
            ? dayjs(user.driver.graduated_date)
            : null
          : null;

        const expiredDate = user.driver.expired_date
          ? dayjs(user.driver.expired_date).isValid()
            ? dayjs(user.driver.expired_date)
            : null
          : null;

        form.setFieldsValue({
          graduated_date: graduatedDate,
          expired_date: expiredDate,
          driver_license_type: user.driver.driver_license_type,
          license_number: user.driver.license_number,
        });
      }
    }
  }, [user]);

  const handleSubmit = async (values: IFormItem) => {
    setLoading(true);

    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      if (key === "graduated_date" || key === "expired_date") {
        formData.append(key, formatDate(value as string));
        continue;
      } else if (typeof value === "string" || typeof value === "number") {
        formData.append(key, value);
        continue;
      }

      if (value?.[0].originFileObj) {
        formData.append("image", value[0].originFileObj);
      }
    }

    const response = await editSystemUser(formData, id);

    if (response.success) {
      mutate();

      success("Хэрэглэгч амжилттай засагдлаа!");

      form.resetFields();

      router.push("/information/system-user");
    } else {
      error(response.error.message);
    }

    setLoading(false);
  };

  const handlePositionChange = (value: string) => {
    setIsdriver(value === "PC2");
  };

  const handleAimagChange = () => {
    form.setFieldValue("sum_code", undefined);
    form.setFieldValue("bag_code", undefined);
  };

  const handleDistrictChange = () => {
    form.setFieldValue("bag_code", undefined);
  };

  useEffect(() => {
    if (values?.graduated_date) {
      const date = new Date(values.graduated_date);
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
    }
  }, [values?.graduated_date]);

  return (
    user && (
      <Form
        form={form}
        disabled={loading}
        layout="vertical"
        requiredMark={false}
        autoComplete="off"
        className="flex flex-col gap-4"
        onFinish={handleSubmit}
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
            <div className="flex">
              <div className="w-1/3">
                <UploadImageItem
                  name={"image"}
                  value={
                    user && user?.org_user?.User?.profile_picture_url
                      ? {
                          file: {
                            uid:
                              user.org_user.User.profile_picture_url ||
                              "no-image",
                            type: "image/png",
                            size: 1024,
                            name:
                              user.org_user.User.profile_picture_url
                                .split("/")
                                .pop() || "image",
                            url: user.org_user.User.profile_picture_url,
                            preview: user.org_user.User.profile_picture_url,
                          },
                          fileList: [
                            {
                              uid:
                                user.org_user.User.profile_picture_url ||
                                "no-image",
                              type: "image/png",
                              size: 1024,
                              name:
                                user.org_user.User.profile_picture_url
                                  .split("/")
                                  .pop() || "image",
                              url: user.org_user.User.profile_picture_url,
                              preview: user.org_user.User.profile_picture_url,
                            },
                          ],
                        }
                      : undefined
                  }
                />
              </div>
              <div className="w-2/3">
                <Title level={2} title="Ерөнхий мэдээлэл" />
                <div className="grid grid-cols-2 gap-x-4 w-full ">
                  <NameItem userName name={"last_name"} label="Овог" required />
                  <NameItem
                    userName
                    required
                    name={"first_name"}
                    label="Хэрэглэгчийн нэр"
                  />
                  <RegisterItem required name={"reg_no"} />
                  <EmailItem required />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-4 w-full h-full">
              <PhoneItem required name={"phone"} />
              <SelectOrganizationItem required name={"organization_id"} />
              <SelectPositionItem
                required
                name={"position_code"}
                onChange={handlePositionChange}
              />
            </div>
            <div />

            <SelectUserLevelItem required allowClear name={"role_code"} />

            <Title level={2} title="Хаягийн мэдээлэл" />

            <div className="grid grid-cols-3 gap-x-4 w-full h-full">
              <AimagCityItem allowClear onChange={handleAimagChange} />

              {values?.aimag_code ? (
                <DistrictItem
                  allowClear
                  onChange={handleDistrictChange}
                  aimagId={values.aimag_code && values.aimag_code}
                />
              ) : (
                <DistrictItem />
              )}

              {values?.sum_code && values?.aimag_code ? (
                <SelectKhorooItem
                  allowClear
                  name={"bag_code"}
                  sum={values?.sum_code}
                  aimag={values?.aimag_code}
                />
              ) : (
                <SelectKhorooItem name={"bag_code"} />
              )}
            </div>

            <AddressItem name="address_detail" required />
            {isdriver && (
              <>
                <Title level={2} title="Жолоочийн мэдээлэл" />
                <div className="grid grid-cols-2 gap-x-4 w-full h-full">
                  <SelectdriverLicenceType
                    required
                    name={"driver_license_type"}
                  />

                  <RegisterItem
                    required
                    name={"license_number"}
                    variant="driver"
                    label="Жолооны үнэмлэх дугаар"
                  />
                  <DateItem name="graduated_date" label="Төгссөн огноо" />
                  <DateItem name="expired_date" label="Дуусах огноо" />
                </div>
              </>
            )}
            <div className="mt-10 mb-5 flex gap-5 justify-end">
              <Button
                disabled={loading}
                placeholder="Болих"
                padding="double"
                variant="text"
                className="rounded-2xl"
                onClick={() => router.push("/information/system-user")}
              />

              <Button
                disabled={loading}
                variant="primary"
                padding="double"
                htmlType="submit"
                placeholder="Хадгалах"
                className="rounded-2xl"
              />
            </div>
          </Wrapper>
        </div>
      </Form>
    )
  );
};

export default EditSystemUserForm;
