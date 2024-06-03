<template>

   <pre>abccc{{ users.total }}</pre>
 <pre>{{ users }}</pre>
  </template>
  
  <script setup>
 import {computed, onMounted, ref} from "vue";
import store from "../../../store";

const users = computed(() => store.state.usersindex2);


onMounted(() => {
  getUsers2();

})

function getUsers2(){
 
  store
     .dispatch('getUsers2',users)
     .then((res)=>{
      alert( res.data.name)
   
     })
     
}

  </script>
  
  <style scoped>
  
  </style>
  