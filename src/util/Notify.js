/** @format */

import { notification } from "antd";

const Notify = {
  success: (message) => {
    notification.success({ message: message });
  },
  error: (message) => {
    notification.error({ message: message });
  },
  // error : notification.error({message :message})
  // notification[type]({
  //     message: 'Notification Title',
  //     description:
  //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  //   });
};

export { Notify };
