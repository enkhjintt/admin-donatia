"use client";

import Button from "@/components/button";
// import RememberItem from "@/components/items/remember-item";
import PasswordItem from "@/components/items/password-item";
import Title from "@/components/title";
import { useNotification } from "@/hooks/use-notification";
import { useRouter } from "next/navigation";
// import { getCookie, setCookie } from "@/utils/cookie";
import { Form, message, type FormInstance } from "antd";
// import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EmailItem from "@/components/items/email-item";

// import { getFCMToken } from "@/utils/firebase";
// import { sendFCMToken } from "@/api/notification";

type TProps = {};

type FormItems = {
  email: string;
  password: string;
  remember?: string;
};

const SubmitButton = ({
  form,
  loading,
  placeholder,
}: {
  form: FormInstance<FormItems>;
  loading: boolean;
  placeholder: string;
}) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values, form]);

  return (
    <Button
      loading={loading}
      placeholder={placeholder}
      variant="primary"
      htmlType="submit"
      padding="secondary"
      className="w-full h-fit mt-8 p-2 text-base "
    />
  );
};

const LoginForm: React.FC<TProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [form] = Form.useForm<FormItems>();

  const { success, error } = useNotification();

  // useEffect(() => {
  //   const remember = getCookie("remember");

  //   if (remember) {
  //     let credentials = getCookie("credentials");

  //     if (credentials) {
  //       try {
  //         const decrypted = CryptoJS.AES.decrypt(
  //           credentials,
  //           "my password"
  //         ).toString(CryptoJS.enc.Utf8);

  //         const { email, password } = JSON.parse(decrypted);

  //         form.setFields([
  //           {
  //             name: "remember",
  //             value: true,
  //           },
  //           {
  //             name: "email",
  //             value: email,
  //           },
  //           {
  //             name: "password",
  //             value: password,
  //           },
  //         ]);
  //       } catch (error) {
  //         console.error("Failed to decrypt credentials", error);
  //       }
  //     }
  //   }
  // }, [form]);

  // const handleLogin = async ({ email, password, remember }: FormItems) => {
  //   setLoading(true);

  //   console.log("form items:", email, password, remember);

  //   const response = await signIn("CredentialProvider", {
  //     redirect: false,
  //     email: email,
  //     password: password,
  //     remember: remember || false,
  //   });

  //   setLoading(false);

  //   if (response?.ok) {
  //     if (remember) {
  //       const fcmToken = await getFCMToken();

  //       if (fcmToken) {
  //         await sendFCMToken(fcmToken);
  //       }

  //       try {
  //         setCookie(
  //           "credentials",
  //           CryptoJS.AES.encrypt(
  //             JSON.stringify({ email, password }),
  //             "my password"
  //           ).toString(),
  //           30
  //         );
  //         setCookie("remember", "true", 30);
  //       } catch (error) {
  //         console.error("Failed to encrypt credentials", error);
  //       }
  //     } else {
  //       setCookie("credentials", "", 0);
  //       setCookie("remember", "", 0);
  //     }
  //     localStorage.setItem("beta-logged", dayjs().format("YYYY-MM-DD"));

  //     success("Амжилттай нэвтэрлээ!");
  //     router.replace("/home");
  //   } else {
  //     error(response?.error || "Нэвтрэхэд алдаа гарлаа");
  //   }
  // };

  return (
    <>
      <Form
        disabled={loading}
        form={form}
        // onFinish={handleLogin}
        requiredMark={false}
        layout="vertical"
        className="w-[460px] p-10 "
      >
        <Title
          className="font-semibold  text-3xl tracking-normal w-8 text-primary-normal "
          title={"Нэвтрэх"}
        />
        <EmailItem required className="border-primary-normal" />

        <PasswordItem name={"password"} required />

        <div className="flex justify-end">
          <Link href="otp-request" className="text-secondary-normal">
            Нууц үгээ мартсан уу?
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <SubmitButton form={form} loading={loading} placeholder={"Нэвтрэх"} />
          <Title title={"Хэрвээ бүртгэл үүсгээгүй бол"} level={0} />
          <Button
            loading={loading}
            placeholder="Бүртгүүлэх"
            variant="text"
            className="w-full"
          />
        </div>
      </Form>
    </>
  );
};

export default LoginForm;