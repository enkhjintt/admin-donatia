"use client";

import { Form } from "antd";
import { UploadFile } from "antd/lib";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";
import PasswordInput from "@/components/input-password";
import AddressItem from "@/components/items/address-item";
import EmailItem from "@/components/items/email-item";
import FormItem from "@/components/items/form-item";
import UploadImageItem from "@/components/items/image-upload-item";
import NameItem from "@/components/items/name-item";
import PasswordItem from "@/components/items/password-item";
import PhoneItem from "@/components/items/phone-item";
import SelectPositionItem from "@/components/items/position-select-item";
import RegisterItem from "@/components/items/register-item";
import SelectUserLevelItem from "@/components/items/user-level-select-item";
import Wrapper from "@/components/wrapper";
import SelectDriverLicenceType from "@/components/items/select-driver-licence-item";
import AimagCityItem from "@/components/items/aimag-select-item";
import SelectKhorooItem from "@/components/items/khoroo-select-item";
import DistrictItem from "@/components/items/sum-select-item";
import Title from "@/components/title";
import SelectOrganizationItem from "@/components/items/org-select-item";
import { addSystemUser } from "@/api/user/system-user";
import { useNotification } from "@/hooks/use-notification";
import DateItem from "@/components/items/date-item";
import ChevronLeftIcon from "@/components/icons/chevron-left-icon";

type IProps = {};

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
};

const AddSystemUserForm: React.FC<IProps> = ({}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useNotification();
  const values = Form.useWatch([], form);
  const [isDriver, setIsDriver] = useState<boolean>(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format to yyyy-mm-dd
  };
  const handleSubmit = async (values: IFormItem) => {
    setLoading(true);
    ("");

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

    const response = await addSystemUser(formData);

    setLoading(false);

    if (response.success) {
      success("Хэрэглэгч амжилттай нэмэгдлээ!");
      router.push("/information/system-user");
      form.resetFields();
    } else {
      error(response.error.message);
    }
  };

  const handleAimagChange = () => {
    form.setFieldValue("sum_code", undefined);
    form.setFieldValue("bag_code", undefined);
  };

  const handleDistrictChange = () => {
    form.setFieldValue("bag_code", undefined);
  };
  const handlePositionChange = (value: string) => {
    setIsDriver(value === "PC2");
  };

  return (
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
              <UploadImageItem name={"image"} />
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

          <div className="flex col-span-2 gap-4">
            <PasswordItem required className="w-full" name={"password"} />

            <FormItem
              className="w-full"
              label="Нууц үг давтан оруулах"
              name={"password_again"}
              dependencies={["password"]}
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error("Нууц үг таарахгүй байна"));
                  },
                }),
                {
                  required: true,
                  message: "Нууц үг заавал давтан оруулна уу",
                },
              ]}
            >
              <PasswordInput />
            </FormItem>
          </div>

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

          <AddressItem name="address_detail" />
          {isDriver && (
            <>
              <Title level={2} title="Жолоочийн мэдээлэл" />
              <div className="grid grid-cols-2 gap-x-4 w-full h-full">
                <SelectDriverLicenceType
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
        </Wrapper>
      </div>

      <div className="flex gap-5 justify-end">
        <Button
          disabled={loading}
          placeholder="Болих"
          padding="double"
          variant="text"
          className="rounded-2xl"
          onClick={() => router.replace("/information/system-user")}
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
    </Form>
  );
};

export default AddSystemUserForm;
