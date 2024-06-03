<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold">Category</h1>
      <router-link :to="{name: 'CategoryModal'}"
                   class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add new Category
      </router-link>
    </div>
    <CategoryTable/>
  </template>
  
  <script setup>
  import {computed} from "vue";
  import store from "../../../store";
  import CategoryTable from "./CategoryTable.vue";
  
  const categorys = computed(() => store.state.categorys);
  
  </script>
  
  <style scoped>
  
  </style>
  