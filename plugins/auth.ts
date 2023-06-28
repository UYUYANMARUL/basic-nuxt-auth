import useAccountStore from "@/stores/accountinfo";
import { ToastrPosition, ToastrMessageType } from "./notification";

export default defineNuxtPlugin((nuxtApp) => {
  const app = useNuxtApp();
  const accountstore = useAccountStore();

  function login(res: any) {
    localStorage.setItem("access-token", res.data.access_token);
    accountstore.setAccount(res.data);
  }

  function logout(res: any) {
    localStorage.removeItem("access-token");
  }

  return {
    provide: {
      auth: {
        login,
        logout,
      },
    },
  };
});
