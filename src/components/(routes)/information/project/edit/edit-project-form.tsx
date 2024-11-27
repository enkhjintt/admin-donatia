"use client";

import { Form } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@/components/button";
import InputItem from "@/components/items/input-item";
import TextAreaItem from "@/components/items/input-text-area-item";
import SelectProjectClassItem from "@/components/items/project-class-select-item";
import AimagCityItem from "@/components/items/aimag-select-item";
import DistrictItem from "@/components/items/sum-select-item";
import SelectKhorooItem from "@/components/items/khoroo-select-item";
import InputNumberItem from "@/components/items/input-number-item";
import SelectProjectTypeItem from "@/components/items/project-type-select-item";
import Wrapper from "@/components/wrapper";
import Title from "@/components/title";
import { useNotification } from "@/hooks/use-notification";
import { useProjectById } from "@/hooks/use-projects";
import { ProjectResponse, UpdateProject } from "@/api/information/projects";
import SelectProjectFeeItem from "@/components/items/project-fee-select-item";
import SelectProjectStatusItem from "@/components/items/project-status-select-item";

type IProps = {
  id: number;
};

const EditProjectForm: React.FC<IProps> = ({ id }) => {
  const { data, mutate: editMutate } = useProjectById(id);
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { success, error } = useNotification();
  const values = Form.useWatch([], form);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        garchig: data.garchig,
        ded_garchig: data.ded_garchig,
        sanhuujiltiin_dun: data.sanhuujiltiin_dun,
        ersdel: data.ersdel,
        tuuh: data.tuuh,
        delgerengui: data.delgerengui,
        // zurag: data.zurag,
        tusul_turul_id: data.tusul_turul_id,
        tusul_angilal_id: data.tusul_angilal_id,
        uilchilgeenii_huraamj_id: data.uilchilgeenii_huraamj_id,
        aimag_code: data.aimag_code,
        sum_code: data.sum_code,
        horoo_code: data.horoo_code,
        tusul_tuluv_id: data.tusul_tuluv_id,
        // hereglegch_id: data.hereglegch_id,
        // cover_zurag: data.cover_zurag,
      });
    }
  }, [form, data]);

  const handleSubmit = async (values: ProjectResponse) => {
    setLoading(true);

    // Ensure 'zurag' and 'hereglegch_id' are never undefined
    const newData = {
      ...values,
      zurag: data?.zurag || "", // Default to empty string if undefined
      hereglegch_id: data?.hereglegch_id ?? 0, // Default to 0 if undefined
    };

    const response = await UpdateProject(id, newData);

    if (response.success) {
      success("Төсөл амжилттай засагдлаа!");

      editMutate();

      setTimeout(() => {
        router.replace("/information/project");
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

  const handleAimagChange = () => {
    form.setFieldsValue({ sum_code: undefined, horoo_code: undefined });
  };

  const handleDistrictChange = () => {
    form.setFieldsValue({ horoo_code: undefined });
  };

  return (
    <Form
      form={form}
      disabled={loading}
      layout="vertical"
      requiredMark={false}
      autoComplete="off"
      // className="flex flex-col gap-4"
      onFinish={handleSubmit}
    >
      <Wrapper className="px-20 py-10">
        <span className="text-gray-600 text-lg font-normal mb-1">
          Төслийн мэдээллүүдийг шаардлагын дагуу хянан шаардлагатай тохиолдолд
          `Төслийн төлөв`-г өөрчилнө үү
        </span>
        <Title level={2} title="Төслийн ерөнхий мэдээлэл" />
        <div className="grid grid-cols-1 gap-x-4 w-full">
          <SelectProjectStatusItem name={"tusul_tuluv_id"} />
          <SelectProjectFeeItem readonly name={"uilchilgeenii_huraamj_id"} />
          <InputItem name="garchig" label="Гарчиг" disabled />
          <InputItem name="ded_garchig" label="Дэд гарчиг" disabled />

          <span className="text-gray-600 text-sm font-light mb-1">
            Төслийн зураг
          </span>
          <img
            className="object-cover rounded-b-lg"
            src={data?.zurag}
            alt={data?.garchig}
          />

          <SelectProjectClassItem disabled name={"tusul_angilal_id"} />
          <div className="grid grid-cols-3 gap-x-4 w-full h-full">
            <AimagCityItem allowClear onChange={handleAimagChange} disabled />
            {values?.aimag_code ? (
              <DistrictItem
                disabled
                allowClear
                onChange={handleDistrictChange}
                aimagId={values.aimag_code}
              />
            ) : (
              <DistrictItem disabled />
            )}
            {values?.sum_code && values?.aimag_code ? (
              <SelectKhorooItem
                disabled
                allowClear
                name="horoo_code"
                sum={values.sum_code}
                aimag={values.aimag_code}
              />
            ) : (
              <SelectKhorooItem name="horoo_code" disabled />
            )}
          </div>
        </div>
        <Title level={2} title="Төслийн дэлгэрэнгүй мэдээлэл" />
        <div className="grid grid-cols-1 gap-4 w-full">
          <TextAreaItem
            name="delgerengui"
            label="Төслийн дэлгэрэнгүй"
            readonly
            showCounter
            maxLength={900}
          />
          <TextAreaItem
            name="ersdel"
            label="Төслийн эрсдэл"
            readonly
            showCounter
            maxLength={900}
          />
          <TextAreaItem
            name="tuuh"
            label="Төслийн түүх"
            readonly
            showCounter
            maxLength={900}
          />
        </div>
        <Title level={2} title="Төслийн санхүүжилтын мэдээлэл" />
        <SelectProjectTypeItem name={"tusul_turul_id"} disabled />
      
        <InputNumberItem
          name="sanhuujiltiin_dun"
          label="Санхүүжилтын дүн"
          disabled
          maxLength={8}
        />

        <div className="flex gap-5 justify-end">
          <Button
            disabled={loading}
            placeholder="Болих"
            padding="double"
            variant="text"
            className="rounded-2xl"
            onClick={() => router.replace("/information/project")}
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
    </Form>
  );
};

export default EditProjectForm;
