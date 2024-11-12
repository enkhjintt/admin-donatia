"use client";

import { Form } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { useNotification } from "@/hooks/use-notification";
import Wrapper from "@/components/wrapper";

import ChevronLeftIcon from "@/components/icons/chevron-left-icon";
import NameItem from "@/components/items/name-item";

import InputNumberItem from "@/components/items/input-number-item";
import { CreateProjectFee, ProjectFeeResponse } from "@/api/ref/project-fee";

type IProps = {};

const AddProjectFeeForm: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useNotification();

  const handleSubmit = async (values: ProjectFeeResponse) => {
    setLoading(true);
    const newData = { ...values };

    const response = await CreateProjectFee(newData);

    if (response.success) {
      success("Төслийн төрөл амжилттай үүслээ!");

      setTimeout(() => {
        router.push("/ref/project-fee");
      }, 1000);
      setTimeout(() => {
        form.resetFields();
        setLoading(false);
      }, 1200);
    } else {
      error(response.error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        autoComplete="off"
        className="flex flex-col gap-10"
        onFinish={handleSubmit}
      >
        <Button
          icon={<ChevronLeftIcon />}
          disabled={loading}
          placeholder="Буцах"
          variant="icon"
          onClick={() => router.back()}
        />
        <Wrapper className="px-6 w-full ">
          <div className="flex items-center justify-center mt-5">
            <div className="grid grid-cols-2 gap-x-4 w-full h-full">
              <NameItem required name={"ner"} label="Төслийн төрөл нэр" />
              <InputNumberItem
                name={"shimtgel_huvi"}
                required
                label="Дүн"
                maxLength={2}
              />
            </div>
          </div>
          <div className="mt-10 mb-5 flex gap-5 justify-end">
            <Button
              padding="double"
              disabled={loading}
              placeholder="Болих"
              variant="text"
              onClick={() => router.push("/ref/project-fee")}
              className="rounded-2xl"
            />

            <Button
              disabled={loading}
              variant="primary"
              htmlType="submit"
              padding="double"
              className="rounded-2xl"
              placeholder="Хадгалах"
            />
          </div>
        </Wrapper>
      </Form>
    </>
  );
};

export default AddProjectFeeForm;
