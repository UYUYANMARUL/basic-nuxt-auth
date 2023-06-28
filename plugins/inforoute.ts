import { ToastrMessageType, ToastrPosition } from "./notification";

export default defineNuxtPlugin((nuxtApp) => {
  const app = useNuxtApp();
  const router = useRouter();

  function route(
    notify: boolean,
    route: string,
    message: string,
    messagetype?: ToastrMessageType.Success,
    messageposition?: ToastrPosition.TopCenter,
    title?: string,
    time?: number,
    timenotify?: number
  ) {
    if (notify == true) {
      app.$notify(message, title || "Success", {
        timeOut: 3000,
        position: messageposition || ToastrPosition.TopCenter,
        messageType: messagetype || ToastrMessageType.Success,
      });
    }
    setTimeout(() => {
      router.replace(route);
    }, time || 3000);
  }
 
  return {
    provide: {
      inforoute: {
        route,
      },
    },
  };
});
