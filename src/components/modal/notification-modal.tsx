// import dayjs from "dayjs";
// import { Modal } from "antd";
// import { useEffect, useState } from "react";

// import Button from "../button";
// import { getFCMToken } from "@/utils/firebase";
// import { useProfile } from "@/hooks/use-profile";
// import { sendFCMToken } from "@/api/notification";

// type IProps = {};

// const NotificationModal: React.FC<IProps> = ({}) => {
//   const [permission, setPermission] =
//     useState<NotificationPermission>("denied");

//   const { data: profile } = useProfile();

//   function handleDeny() {
//     localStorage.setItem(
//       "NOTIFICATION_EXPIRE_DATE",
//       dayjs().add(1, "week").toISOString()
//     );

//     setPermission("denied");
//   }

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.Notification) {
//       switch (window.Notification.permission) {
//         case "default":
//           const expireDate = dayjs(
//             localStorage.getItem("NOTIFICATION_EXPIRE_DATE")
//           );

//           if (!expireDate.isValid() || expireDate.isBefore(dayjs())) {
//             setPermission("default");
//           }

//           break;
//         case "granted":
//           getFCMToken().then(async (fcmToken) => {
//             if (!fcmToken) {
//               return;
//             }

//             // if (fcmToken !== profile.fcm_token) {
//             if (fcmToken && profile) {
//               sendFCMToken(fcmToken);

//               // user mutate
//               // mutate();
//             }
//           });

//           break;

//         case "denied":
//           break;
//       }
//     }
//   }, [permission]);

//   return (
//     <>
//       {typeof window !== "undefined" && window.Notification && (
//         <Modal footer={false} open={permission === "default"} title="Мэдэгдэл">
//           <div>
//             Мэдэгдэл хүлээн авахын тулд brower-ийн notification-ийг зөвшөөрнө
//             үү!
//           </div>

//           <div className="flex items-center justify-end gap-2 mt-4">
//             <Button
//               onClick={() => {
//                 window.Notification.requestPermission().then((result) => {
//                   setPermission(result);
//                 });

//                 handleDeny();
//               }}
//               placeholder="Тийм"
//             />
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default NotificationModal;
