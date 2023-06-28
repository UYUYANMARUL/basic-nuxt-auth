import { ToastrPosition, ToastrMessageType } from "./notification";

export default defineNuxtPlugin((nuxtApp) => {
  const app = useNuxtApp();

  function response(res: any) {
    const data = res.response._data;
    if (data.success) {
      // app.$notify(data.message, "Success", {
      //   timeOut: 5000,
      //   position: ToastrPosition.TopRight,
      //   messageType: ToastrMessageType.Success,
      // });
    } else {
      app.$notify(data.message, "There Are Error", {
        timeOut: 5000,
        position: ToastrPosition.TopRight,
        messageType: ToastrMessageType.Error,
      });
    }
  }

  return {
    provide: {
      ResponseHandler: {
        response,
      },
    },
  };
});
