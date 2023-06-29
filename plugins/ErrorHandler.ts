import { ToastrPosition, ToastrMessageType } from "./notification";

export default defineNuxtPlugin((nuxtApp) => {
  const app = useNuxtApp();

  function responseError(res: any) {
    const data = res.response._data;
    if (!data.success) {
      app.$notify(data.message, "There Are Error", {
        timeOut: 5000,
        position: ToastrPosition.TopRight,
        messageType: ToastrMessageType.Error,
      });
    }
  }

  return {
    provide: {
      ErrorHandler: {
        responseError,
      },
    },
  };
});
