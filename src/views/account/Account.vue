<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="grid grid-cols-12 gap-6">
        <!-- Sidebar -->
        <div class="col-span-3 space-y-4">
          <div class="bg-white shadow rounded-lg p-4">
            <div class="text-sm text-gray-600 truncate">{{ authStore.customer?.email }}</div>
          </div>
          <!-- Account & Help Card -->
          <div class="bg-white shadow rounded-lg p-4">
            <div class="font-medium text-gray-900 mb-3">Hesabım</div>
            <nav class="space-y-2">
              <router-link 
                v-for="(item, index) in accountMenuItems" 
                :key="index"
                :to="item.href"
                class="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                :class="$route.path === item.href ? 'text-orange-500' : 'text-gray-700'"
              >
                <Icon :icon="item.icon" class="h-5 w-5 mr-3" />
                {{ item.name }}
              </router-link>
            </nav>
          </div>

          <!-- Orders Card -->
          <div class="bg-white shadow rounded-lg p-4">
            <div class="font-medium text-gray-900 mb-3">Siparişlerim</div>
            <nav class="space-y-2">
              <router-link 
                v-for="(item, index) in orderMenuItems" 
                :key="index"
                :to="item.href"
                class="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                :class="$route.path === item.href ? 'text-orange-500' : 'text-gray-700'"
              >
                <Icon :icon="item.icon" class="h-5 w-5 mr-3" />
                {{ item.name }}
                <span v-if="item.badge" class="ml-auto px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                  {{ item.badge }}
                </span>
              </router-link>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-span-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useAuthStore } from '../../stores/auth'
import { orderMenuItems, specialMenuItems, serviceMenuItems, accountMenuItems } from '../../constants/menuItems'

const authStore = useAuthStore()
</script> 