import { useAuthStore } from "~/stores/authinfo"

export default defineNuxtRouteMiddleware((to, from) => {
  const AuthStore = useAuthStore()
  if (!AuthStore.getAccessToken && AuthStore.getGuardRoutes.includes(to.path)){
    return navigateTo("/auth/login")

} 

})
