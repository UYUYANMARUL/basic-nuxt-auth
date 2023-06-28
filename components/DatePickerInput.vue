<template>

<VueDatePicker ref="dpRef" :on-click-outside="onClickOutside" v-model="model"  :enable-time-picker="false" placeholder="Select Date" auto-apply></VueDatePicker>
<div v-if="errorcondition || props.submiterror" v-for="(item, index) in errors" :key="index">
                  {{ item }}
                </div>
</template>

<script setup>
import { validate } from '@babel/types';
import { ZodObject, boolean } from 'zod';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref } from 'vue';


const dpRef = ref();

const onClickOutside = () => {
  errorcondition.value=true
  if (dpRef.value) dpRef.value.closeMenu();
}


const props = defineProps({
modelValue: {
required: true,
},
type: {
type: String,
default: "text",
},
label: {
type: String,
},
name: {
type: String,
required: true,
},
disabled: {
type: Boolean,
default: false,
},
errors: {
type: Object,
default: {},
},
Placeholder:{
type :String,
default: ""
},
submiterror:{
type:Boolean,
default:false
}
})
const emit = defineEmits(["update:modelValue", "validate"])


const errorcondition = ref(false);
const model = computed({
get: () => props.modelValue,
set: (value) => emit("update:modelValue", value),
})


</script>