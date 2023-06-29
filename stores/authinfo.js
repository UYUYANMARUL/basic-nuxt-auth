import { defineStore } from "pinia"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    guardRoutes:["/","/auth/forgot-password"],
    token:useCookie("access-token").value || null
  }),
  getters: {
   getAccessToken: (state)=> state.token,
   getGuardRoutes: (state)=> state.guardRoutes
  },

  actions: {
SetAccessToken(token,remember) {

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    const { exp } = JSON.parse(jsonPayload);
        const setAccessToken = useCookie("access-token", {
            maxAge: remember == true ? exp : exp * 0.1,
            sameSite: "strict",
          })
          setAccessToken.value = token
}

  },
})

