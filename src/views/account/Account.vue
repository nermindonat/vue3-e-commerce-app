<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="grid grid-cols-12 gap-6">
        <!-- Sidebar -->
        <div class="col-span-3 space-y-4">
          <!-- User Info Card -->
          <div class="bg-white shadow rounded-lg p-4">
            <div class="text-sm text-gray-600 truncate">{{ authStore.user?.email }}</div>
          </div>
          <!-- Account & Help Card -->
          <div class="bg-white shadow rounded-lg p-4">
            <div class="font-medium text-gray-900 mb-3">Hesabım & Yardım</div>
            <nav class="space-y-2">
              <a 
                v-for="(item, index) in accountMenuItems" 
                :key="index"
                :href="item.href"
                class="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                :class="currentPage === item.id ? 'text-orange-500' : 'text-gray-700'"
              >
                <Icon :icon="item.icon" class="h-5 w-5 mr-3" />
                {{ item.name }}
              </a>
            </nav>
          </div>

          <!-- Orders Card -->
          <div class="bg-white shadow rounded-lg p-4">
            <div class="font-medium text-gray-900 mb-3">Siparişlerim</div>
            <nav class="space-y-2">
              <a 
                v-for="(item, index) in orderMenuItems" 
                :key="index"
                :href="item.href"
                class="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                :class="currentPage === item.id ? 'text-orange-500' : 'text-gray-700'"
              >
                <Icon :icon="item.icon" class="h-5 w-5 mr-3" />
                {{ item.name }}
                <span v-if="item.badge" class="ml-auto px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                  {{ item.badge }}
                </span>
              </a>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-span-9">
          <!-- Address Header Card -->
          <div class="bg-white shadow rounded-lg mb-4">
            <div class="px-6 py-4 flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Adres Bilgilerim</h2>
              <button
                @click="openNewAddressModal"
                class="flex items-center px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50 rounded-md"
              >
                <Icon icon="mdi:plus" class="h-5 w-5 mr-2" />
                Yeni Adres Ekle
              </button>
            </div>
          </div>

          <!-- Address List Card -->
          <div class="bg-white shadow rounded-lg">
            <div class="p-6">
              <div  class="space-y-4">
                <div
                  class="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors"
                >
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="font-medium text-gray-900">Ev adresim</h3>
                      <p class="mt-1 text-sm text-gray-600">Nermin Donat</p>
                      <p class="mt-1 text-sm text-gray-600">Flat 2/1, Block B, Sample Street</p>
                      <p class="mt-1 text-sm text-gray-600">
                        Sample District/Sample City 34000
                      </p>
                      <p class="mt-1 text-sm text-gray-600">0555 555 55 55</p>
                    </div>
                    <div class="flex space-x-2">
                      <button
                        @click="editAddress(address)"
                        class="text-gray-400 hover:text-gray-500"
                      >
                        <Icon icon="mdi:pencil" class="h-5 w-5" />
                      </button>
                      <button
                        @click="deleteAddress(address.id)"
                        class="text-gray-400 hover:text-red-500"
                      >
                        <Icon icon="mdi:trash" class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '../../stores/auth'

interface Address {
  id: number
  title: string
  fullName: string
  address: string
  district: string
  city: string
  postalCode: string
  phone: string
}

interface MenuItem {
  id: string
  name: string
  href: string
  icon: string
  badge?: string
}

const authStore = useAuthStore()
const currentPage = ref('addresses')

// Menu Items
const orderMenuItems: MenuItem[] = [
  { id: 'orders', name: 'Tüm Siparişlerim', href: '/account/orders', icon: 'mdi:shopping-outline' },
  { id: 'reviews', name: 'Değerlendirmelerim', href: '/account/reviews', icon: 'mdi:star-outline' },
  { id: 'messages', name: 'Satıcı Mesajlarım', href: '/account/messages', icon: 'mdi:message-outline', badge: '2' },
  { id: 'repurchase', name: 'Tekrar Satın Al', href: '/account/repurchase', icon: 'mdi:refresh' }
]

const accountMenuItems: MenuItem[] = [
  { id: 'profile', name: 'Kullanıcı Bilgilerim', href: '/account/profile', icon: 'mdi:account-outline' },
  { id: 'addresses', name: 'Adres Bilgilerim', href: '/account/addresses', icon: 'mdi:map-marker-outline' },
  { id: 'cards', name: 'Kayıtlı Kartlarım', href: '/account/cards', icon: 'mdi:credit-card-outline' },
  { id: 'returns', name: 'Duyuru Tercihlerim', href: '/account/returns', icon: 'mdi:bell-outline' },
  { id: 'help', name: 'Yardım', href: '/account/help', icon: 'mdi:help-circle-outline' }
]


const openNewAddressModal = () => {
  console.log('Opening new address modal')
}

const editAddress = (address: Address) => {
  console.log('Editing address:', address)
}

const deleteAddress = (addressId: number) => {
  console.log('Deleting address:', addressId)
}
</script> 