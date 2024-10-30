"use client";

import { Suspense, useState, useMemo } from "react";
import { Spin } from "antd";

import SideBar from "@/components/layout/sidebar/sidebar";
import TopBar from "@/components/layout/topbar/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Check if the page is a login page
  const isLoginPage = useMemo(() => {
    return (children as any)?.type?.displayName === "LoginPage";
  }, [children]);

  return (
    <div>
      {isLoginPage ? (
        <div>{children}</div>
      ) : (
        <div className="w-full h-screen flex">
          <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

          <div
            className={`w-full ${
              collapsed ? "ml-20" : "ml-56 2xl:ml-72"
            } overflow-x-hidden`}
            style={{
              maxWidth: collapsed
                ? "calc(100% - 5rem)"
                : "calc(100% - 12rem) 2xl:calc(100% - 16rem)",
            }}
          >
            <TopBar />

            <Suspense
              fallback={
                <div className="fixed z-50 inset-0 gap-4 flex flex-col items-center justify-center bg-opacity-10 backdrop-blur-lg">
                  <Spin size="large" />
                  <h1 className="color-primary text-xl">
                    Мэдээлэл шинэчилж байна түр хүлээнэ үү!
                  </h1>
                </div>
              }
            >
              <div>
                {/* <NotificationModal /> */}

                <div className="p-8">{children}</div>
              </div>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
