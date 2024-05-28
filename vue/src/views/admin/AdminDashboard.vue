<template>



  <div class="relative md:flex h-screen overflow-hidden">
     <div class="min-w-[160px] w-[160px] h-full transition-all bg-gray-500 text-white py-4 px-2">
    <router-link :to="{name: 'UserDashboard'}"
                 class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
      <span class="mr-2 text-gray-300">
        <HomeIcon class="w-5"/>
      </span>
      <span class="text-xs">
        Dashboard
      </span>
    </router-link>
    <router-link :to="{name: 'UserDashboard'}"
                 class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
      <span class="mr-2 text-gray-300">
        <BellIcon class="w-5"/>
      </span>
      <span class="text-xs">
        Category
      </span>
    </router-link>
    <router-link :to="{name: 'UserDashboard'}"
                 class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
      <span class="mr-2 text-gray-300">
        <UsersIcon class="w-5"/>
      </span>
      <span class="text-xs">
        Users
      </span>
    </router-link>
    <router-link :to="{name: 'UserDashboard'}"
                 class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
      <span class="mr-2 text-gray-300">
        <ChartBarIcon class="w-5"/>
      </span>
      <span class="text-xs">
        Reports
      </span>
    </router-link>
   
   </div>
   
      <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
      <div class="w-full h-full rounded border-dashed border-2 border-gray-300">
          <!-- Place your content here -->
      </div>
 
 </div>
  </template>
  
  <script setup>
   
    import { Bars3Icon, BellIcon, XMarkIcon,HomeIcon,UsersIcon,ChartBarIcon} from '@heroicons/vue/24/outline'
  
  </script>
  
  <style scoped>
  
  </style>
  