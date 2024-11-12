import { Upload as AntdUpload, Form, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

import Avatar from "../../public/image/Avatar.svg";
import CameraIcon from "./icons/camera-icon";
import Image from "next/image";
import Button from "./button";

type IProps = UploadProps & {
  variant?: "image" | "file";
  value?: {
    file: RcFile;
    fileList: UploadProps["fileList"];
  };
};

const ImageContent: React.FC<{
  image: string | null;
  name: string;
}> = ({ image, name }) => (
  <div className="relative -z-10 h-40 w-40">
    {image && (
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover rounded-full"
      />
    )}
  </div>
);

const PlaceholderContent: React.FC = ({}) => {
  return (
    <div className="text-center font-normal text-xs text-gray-500">
      <p>Зургийн өргөтгөл *.jpeg, *.jpg, *.png, *.gif</p>

      <span>Хамгийн ихдээ 8.5 MB</span>
    </div>
  );
};

const UploadButton: React.FC = ({}) => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <Image
        fill
        src={Avatar}
        alt="Avatar"
        className="object-cover rounded-full -z-5"
        priority
      />

      <div className="flex flex-col items-center justify-center">
        <CameraIcon inverse size="larger" />

        <span className="font-normal text-xs text-base-white">
          Update photo
        </span>
      </div>
    </div>
  );
};

const Upload: React.FC<IProps> = ({
  variant = "image",
  value,
  ...restProps
}) => {
  const { status, errors } = Form.Item.useStatus();

  const [fileList, setFileList] = useState<UploadProps["fileList"]>(
    value && value.fileList ? value.fileList : []
  );

  const [image, setImage] = useState<string | null>(
    value && value.fileList && value.fileList[0]?.preview
      ? `${value.fileList[0].preview}` //http//
      : null
  );

  const handleBeforeUpload: UploadProps["beforeUpload"] = async (file) => {
    setFileList([file]);

    const base64 = await getBase64(file);

    setImage(base64);

    return false;
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center">
        <AntdUpload
          maxCount={1}
          fileList={fileList}
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
          listType="picture-circle"
          className={`text-center`}
          {...restProps}
        >
          {variant === "file" ? (
            <Button
              placeholder="Файл сонгох"
              variant="white"
              textvariant="text"
              className="mt-2 w-60 xl:w-80"
            />
          ) : (
            <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center border border-gray-200">
              {fileList?.length !== undefined && fileList?.length > 0 ? (
                <ImageContent image={image} name={fileList[0].name} />
              ) : (
                <UploadButton />
              )}
            </div>
          )}
        </AntdUpload>

        {variant === "image" && <PlaceholderContent />}
      </div>

      <ul role="alert">
        {errors.map((error, index) => (
          <li key={`error-image-${index}`}>
            <div className="text-sm text-error-normal text-center">{error}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Upload;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
