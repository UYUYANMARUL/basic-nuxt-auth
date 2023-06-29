<template>
  <div>

    <slot :form="form" :submiterror="submiterror" :Pipes="props.Pipes"></slot>
    <slot name="button"></slot>
    

  </div>
</template>

<script setup>
import { ToastrMessageType, ToastrPosition } from '~/plugins/notification';


const {$FormValidation,$notify} = useNuxtApp()



const props = defineProps({
  FormType:{
    type:Boolean,
    default:true
  },
  Pipes:{
   type:Object,
   default:{}
  },
  FormV: {
    type: Object,
    default: {},
  },
  Submitted:{
  type:Boolean,
  },
  ExternalFormData:{
    type: Object,
    default: {},
  }
})



const form = reactive({...props.ExternalFormData})
const errors  = computed(()=>$FormValidation.GetFormErrors(form,props.FormV))



const emit = defineEmits("FailedSubmit","Submit")

const Submitted = computed(()=>props.Submitted) 


watch(Submitted, () => {
  if (Submitted.value==true) {
  submit()
}}, { immediate: true })


const disabled = ref(true)
const submiterror = ref(false)

watch(errors,() => {
  if (errors.value == undefined) {
  disabled.value=false
}
else
{
  disabled.value = true
}
})

function test() {
  $http.Test()
}


function submit() {


if (disabled.value == true) {
  submiterror.value = true
  $notify("you must fill inputs correctly","There Are Errors",{position:ToastrPosition.TopRight,messageType:ToastrMessageType.Error})
  emit("FailedSubmit")
}
  if (disabled.value == false) {


    // aşağıdakı kodda ınput olarak girilen değerleri gönderirken props olarak aldığımız pipe leri backenddeki endpointlerin formatına uyması için uyguluyoruz
  Object.entries(props.Pipes).forEach(element => {
    form[element[0]] = element[1](form[element[0]])
});



if (props.FormType) {
const data = new FormData()
Object.entries(form).forEach(element => {
  data.append(element[0], element[1])
});
emit("Submit",data)
} else {
 const data =  form
  emit("Submit",data)
}



  }



    }

</script>