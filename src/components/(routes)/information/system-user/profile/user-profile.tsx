"use client";

import Button from "@/components/button";
import EmailItem from "@/components/items/email-item";
import { Form } from "antd";
import { useState } from "react";
import AimagCityItem from "@/components/items/aimag-select-item";
import SelectKhorooItem from "@/components/items/khoroo-select-item";
import NameItem from "@/components/items/name-item";
import SelectOrganizationItem from "@/components/items/project-type-select-item";
import PhoneItem from "@/components/items/phone-item";
import SelectPositionItem from "@/components/items/position-select-item";
import RegisterItem from "@/components/items/register-item";
import DistrictItem from "@/components/items/sum-select-item";
import SelectUserLevelItem from "@/components/items/user-level-select-item";
import Title from "@/components/title";
import Wrapper from "@/components/wrapper";
import { useProfile } from "@/hooks/use-profile";
import UploadImageItem from "@/components/items/image-upload-item";
import { useRouter } from "next/navigation";
import AddressItem from "@/components/items/address-item";
import PenIcon from "@/components/icons/pen-icon";
type IProps = {};
const UserProfileForm: React.FC<IProps> = ({}) => {
  const { data: user, isLoading: userLoading } = useProfile();
  const [form] = Form.useForm();
  const value = Form.useWatch([], form);

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleAimagChange = () => {
    form.setFieldValue("sum_code", undefined);
    form.setFieldValue("bag_code", undefined);
  };

  const handleDistrictChange = () => {
    form.setFieldValue("bag_code", undefined);
  };
  const id = user?.org_user?.User?.id;
  const handleClick = () => {
    router.push(`/information/system-user/edit-system-user/${id}`);
  };

  return (
    <>
      {user && (
        <Form
          form={form}
          disabled={loading}
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          className="flex flex-col gap-10"
        >
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
                <div className="flex justify-between">
                  <Title level={2} title="Ерөнхий мэдээлэл" />
                  <Button
                    disabled={loading}
                    variant="icon"
                    onClick={handleClick}
                    placeholder="Засах"
                    icon={<PenIcon />}
                  />
                </div>

                <div className="grid grid-cols-2 gap-x-4 w-full ">
                  <NameItem
                    disabled
                    name={"last_name"}
                    label="Хэрэглэгчийн овог"
                    initialValue={
                      user.org_user.User && user.org_user.User.last_name
                    }
                  />
                  <NameItem
                    userName
                    disabled
                    name={"first_name"}
                    initialValue={
                      user.org_user.User && user.org_user.User.first_name
                    }
                  />
                  <RegisterItem
                    disabled
                    name={"reg_no"}
                    initialValue={
                      user.org_user.User && user.org_user.User.reg_no
                    }
                  />

                  <EmailItem
                    disabled
                    initialValue={
                      user.org_user.User && user.org_user.User.email
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-4 w-full h-full">
              <PhoneItem
                disabled
                initialValue={user.org_user.User && user.org_user.User.phone}
              />

              <SelectOrganizationItem
                label="Байгууллага"
                disabled
                name={"organization_id"}
                initialValue={user.org_user.organization_id}
              />

              <SelectPositionItem
                disabled
                name={"position_code"}
                placeholder="Албан тушаал сонгоно уу"
                initialValue={
                  user.org_user.User && user.org_user.User.position_code
                }
              />

              <SelectUserLevelItem
                disabled
                name={"role_code"}
                initialValue={user.roles.length > 0 && user.roles[0].name}
              />
            </div>

            <Title level={2} title="Хаягийн мэдээлэл" />

            <div className="grid grid-cols-3 gap-x-4 w-full h-full">
              <AimagCityItem
                disabled
                allowClear
                initialValue={
                  user.org_user.User && user.org_user.User.aimag_code
                }
                onChange={handleAimagChange}
              />

              {value?.aimag_code ? (
                <DistrictItem
                  disabled
                  allowClear
                  onChange={handleDistrictChange}
                  aimagId={value.aimag_code && value.aimag_code}
                />
              ) : (
                <DistrictItem
                  initialValue={
                    user.org_user.User && user.org_user.User.sum_code
                  }
                />
              )}

              {value?.sum_code && value?.aimag_code ? (
                <SelectKhorooItem
                  disabled
                  allowClear
                  name={"bag_code"}
                  sum={value?.sum_code}
                  aimag={value?.aimag_code}
                  initialValue={
                    user.org_user.User && user.org_user.User.bag_code
                  }
                />
              ) : (
                <SelectKhorooItem
                  initialValue={
                    user.org_user.User && user.org_user.User.bag_code
                  }
                />
              )}
            </div>
            <AddressItem
              disabled
              name={"address_detail"}
              label="Дэлгэрэнгүй хаяг"
              placeholder="Хаягаа оруулна уу"
              initialValue={
                user.org_user.User && user.org_user.User.address_detail
              }
            />
          </Wrapper>
        </Form>
      )}
    </>
  );
};

export default UserProfileForm;
