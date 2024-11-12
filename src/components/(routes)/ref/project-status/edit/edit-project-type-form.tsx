"use client";

import { Form } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Wrapper from "@/components/wrapper";
import { useNotification } from "@/hooks/use-notification";
import Title from "@/components/title";
import ChevronLeftIcon from "@/components/icons/chevron-left-icon";
import NameItem from "@/components/items/name-item";

import InputNumberItem from "@/components/items/input-number-item";
import { useProjectStatus, useProjectStatusById } from "@/hooks/use-project-status";
import { ProjectStatusResponse, UpdateProjectStatus } from "@/api/ref/project-status";

type IProps = {
  id: number;
};

const EditProjectStatusForm: React.FC<IProps> = ({ id }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useNotification();
  const { mutate } = useProjectStatus();

  const { data, mutate: editMutate } = useProjectStatusById(id);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ner: data.ner,
        tailbar: data.tailbar,
      });
    }
  }, [form, data]);

  const handleSubmit = async (values: ProjectStatusResponse) => {
    setLoading(true);
    const newData = { ...values, cost: Number(values.ner) };

    const response = await UpdateProjectStatus(id, newData);

    if (response.success) {
      success("Төслийн төлөв амжилттай засагдлаа!");
      mutate();
      editMutate();

      setTimeout(() => {
        router.replace("/ref/project-status");
      }, 100);

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
    <Form
      form={form}
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
      <Wrapper className="p-6 w-full ">
        <Title level={2} title={"Ерөнхий мэдээлэл"} />

        <div className="grid grid-cols-2 gap-x-4 w-full h-full">
          <NameItem required name={"ner"} label="Төслийн төлөв нэр" />
          <NameItem required name={"tailbar"} label="Тайлбар" />
        </div>
        <div className="mt-10 mb-5 flex gap-5 justify-end ">
          <Button
            padding="double"
            disabled={loading}
            placeholder="Болих"
            variant="text"
            className="rounded-2xl"
            onClick={() => router.push("/ref/project-status")}
          />

          <Button
            disabled={loading}
            htmlType="submit"
            padding="double"
            className="rounded-2xl"
            placeholder="Хадгалах"
          />
        </div>
      </Wrapper>
    </Form>
  );
};

export default EditProjectStatusForm;
