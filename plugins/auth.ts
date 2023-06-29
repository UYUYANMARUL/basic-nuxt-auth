import useAccountStore from "@/stores/accountinfo";
import { ToastrPosition, ToastrMessageType } from "./notification";
import { useAuthStore } from "~/stores/authinfo";

export default defineNuxtPlugin((nuxtApp) => {
  const app = useNuxtApp();
  const accountstore = useAccountStore();
  const authstore = useAuthStore();

  async function login(res: any) {
    accountstore.setAccount(res.data);
    authstore.SetAccessToken(res.data.access_token);
  }

  function logout(res: any) {
    const accesstoken = useCookie("access-token");
    accesstoken.value = "";
    accountstore.setAccount({});
  }

  async function getcredentials() {}

  return {
    provide: {
      auth: {
        login,
        logout,
      },
    },
  };
});
