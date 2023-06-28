import { defineStore } from "pinia"

export const useAccountStore = defineStore("useraccount",{
  state: () => ({
    loading: true,
    info: {
        firstname: "",
        lastname: "",
        gender: "",
        birthday: "1989-04-10T00:00:00.000000Z",
        phone: "+905555551125",
        is_whatsapp: false,
        email: "",
        apple_id: null,
        google_id: null,
        facebook_id: null,
        old_id: null,
        store_id: null,
        creator_id: null,
        is_email_verified: false,
        is_phone_verified: false,
    },
    token:String
  }),
  getters: {
    getInfo: (state) => state.info,

  },
  actions: {
    setAccount(data) {
      this.info = {
        firstname: data?.user?.firstname,
        lastname: data?.user?.lastname,
        gender: data?.user?.gender,
        birthday: data?.user?.birthday,
        phone: data?.user?.phone,
        is_whatsapp: data?.user?.is_whatsapp,
        email: data?.user?.email,
        apple_id: data?.user?.apple_id,
        google_id: data?.user?.google_id,
        facebook_id: data?.user?.facebook_id,
        old_id: data?.user?.old_id,
        store_id:data?.user?.store_id,
        creator_id:data?.user?.creator_id,
        is_email_verified:data?.user?.is_email_verified,
        is_phone_verified:data?.user?.is_phone_verified,
      }
      this.token = data?.access_token
    },
  },
})

export default useAccountStore
