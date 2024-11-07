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
import { useProjectType, useProjectTypeById } from "@/hooks/use-project-type";
import { ProjectTypeResponse, UpdateProjectType } from "@/api/ref/project-type";

type IProps = {
  id: number;
};

const EditProjectTypeForm: React.FC<IProps> = ({ id }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useNotification();
  const { mutate } = useProjectType();

  const { data, mutate: editMutate } = useProjectTypeById(id);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ner: data.ner,
      });
    }
  }, [form, data]);

  const handleSubmit = async (values: ProjectTypeResponse) => {
    setLoading(true);
    const newData = { ...values, cost: Number(values.ner) };

    const response = await UpdateProjectType(id, newData);

    if (response.success) {
      success("Төслийн ангилал амжилттай засагдлаа!");
      mutate();
      editMutate();

      setTimeout(() => {
        router.replace("/ref/project-type");
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

        <div className="grid grid-cols-3 gap-x-4 w-full h-full">
          <NameItem required name={"ner"} label="Төслийн ангилал нэр" />
        </div>
        <div className="mt-10 mb-5 flex gap-5 justify-end ">
          <Button
            padding="double"
            disabled={loading}
            placeholder="Болих"
            variant="text"
            className="rounded-2xl"
            onClick={() => router.push("/ref/project-type")}
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

export default EditProjectTypeForm;
