<template>
  
Email onaylaniyor
  
  
    </template>
    
    <script setup>
import { ToastrMessageType } from '~/plugins/notification';

const {$http,$ResponseHandler,$inforoute} = useNuxtApp()
const route = useRoute()
const router = useRouter()
const data = route.query.token
const form = new FormData()

form.append("token",data)
$http.Post("/auth/verify-email",{body:form,onResponse:(res)=>{
    $ResponseHandler.response(res)
}}).then(()=>{
    $inforoute.route("/auth/login","Email Successfully Confirmed")
},
()=>{ $inforoute.route("/","Email Cant Confirmed",ToastrMessageType.Error)}
)

    </script>
  