import React, { useEffect } from "react";
import { Form, Modal } from "antd";
import Button from "../button";
import WarningIcon from "../icons/warning-icon";
import SelectStatusItem from "../items/status-select-item";

type DeleteConfirmationModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  type?: "gps" | "user" | "kiosk";
  textLabel?: string;
  variant?: "status" | "delete";
  blackListText?: string;
  showStatus?: boolean;
  selectedStatus?: (value: string | undefined) => void;
  formStatusData?: any;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  type = "user",
  variant = "delete",
  textLabel,
  blackListText,
  onCancel,
  selectedStatus,
  onConfirm,
  showStatus = false,
  formStatusData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("status_code", formStatusData);
  }, [formStatusData]);

  let style = "text-error-dark";
  let text = "Устгахдаа";

  switch (variant) {
    case "delete":
      break;
    case "status":
      text = "Өөрчлөхдөө";
      style = "text-warning-dark";
      break;
  }
  const handler = async () => {
    const result = await form.validateFields();

    if (result) {
      onConfirm();
      form.resetFields();
    }
  };

  const hanldeCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title={
        <div className="px-5 font-bold text-lg">Анхааруулах мессеж!!!</div>
      }
      open={visible}
      closable={false}
      footer={false}
      onCancel={hanldeCancel}
      className="w-[600px]"
    >
      <div className="px-5 mt-6 flex gap-4 items-center">
        <WarningIcon />
        <p className="font-semibold text-sm">
          {blackListText ? (
            blackListText
          ) : (
            <span>
              Энэ{" "}
              {textLabel ? textLabel : type === "gps" ? "GPS" : "хэрэглэгчийн"}{" "}
              мэдээллийг{" "}
              <span className={`${style} uppercase font-semibold text-sm`}>
                &ldquo;{text}&rdquo;
              </span>{" "}
              итгэлтэй байна уу?
            </span>
          )}
        </p>
      </div>

      {showStatus && selectedStatus && (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="flex pt-5 px-5 items-center justify-center "
        >
          <SelectStatusItem
            required
            onChange={(values) => selectedStatus(values)}
            allowClear
            isFull
          />
        </Form>
      )}

      <div className="flex items-center justify-end gap-2 mt-4">
        <Button
          placeholder="Үгүй"
          variant="text"
          // textVariant="white"
          onClick={onCancel}
        />

        <Button onClick={handler} placeholder="Тийм" />
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
