<template>
  merhaba

  <button @click="test">sa</button>
  
  </template>
  
  <script setup>
import useAccountStore from '~/stores/accountinfo';


const {$FormValidation,$http} = useNuxtApp()
const accountstore = useAccountStore()


function test() {
 console.log(accountstore.getInfo)
}

const date = ref()
  </script>
