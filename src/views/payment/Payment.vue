<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Ödeme Bilgileri</h1>
        <p class="mt-2 text-gray-600">Siparişinizi tamamlamak için ödeme bilgilerinizi giriniz</p>
      </div>

      <!-- Payment Options Tabs -->
      <div class="mb-8">
        <div class="grid grid-cols-2 gap-4">
          <!-- Credit Card Tab -->
          <div 
            @click="activeTab = 'credit-card'"
            :class="[
              'cursor-pointer rounded-lg p-4 text-center border transition-all duration-200',
              activeTab === 'credit-card' 
                ? 'bg-white border-indigo-500 shadow-md' 
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            ]"
          >
            <h3 class="text-lg font-medium" :class="[
              activeTab === 'credit-card' ? 'text-indigo-600' : 'text-gray-700'
            ]">
              Banka/Kredi Kartı
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              ile ödemenizi güvenle yapabilirsiniz.
            </p>
          </div>

          <!-- Shopping Credit Tab -->
          <div 
            @click="activeTab = 'shopping-credit'"
            :class="[
              'cursor-pointer rounded-lg p-4 text-center border transition-all duration-200',
              activeTab === 'shopping-credit' 
                ? 'bg-white border-indigo-500 shadow-md' 
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            ]"
          >
            <h3 class="text-lg font-medium" :class="[
              activeTab === 'shopping-credit' ? 'text-indigo-600' : 'text-gray-700'
            ]">
              Alışveriş Kredisi
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              ile ödemenizi güvenle yapabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <!-- Payment Form -->
      <div v-if="activeTab === 'credit-card'" class="bg-white rounded-lg shadow-lg p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Card Information -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900">Kart Bilgileri</h2>
            
            <!-- Card Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Kart Numarası</label>
              <div class="mt-1 relative">
                <input
                  type="text"
                  v-model="cardNumber"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="1234 5678 9012 3456"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <img src="" alt="Card types" class="h-6" />
                </div>
              </div>
            </div>

            <!-- Card Details Row -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Expiry Date -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Son Kullanma Tarihi</label>
                <input
                  type="text"
                  v-model="expiryDate"
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="MM/YY"
                />
              </div>

              <!-- CVV -->
              <div>
                <label class="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  v-model="cvv"
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="123"
                />
              </div>
            </div>

            <!-- Card Holder Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
              <input
                type="text"
                v-model="cardHolderName"
                class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ad Soyad"
              />
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t border-gray-200 pt-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Ara Toplam</span>
                <span class="font-medium">₺199.99</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Kargo</span>
                <span class="font-medium">₺29.99</span>
              </div>
              <div class="flex justify-between text-lg font-bold">
                <span>Toplam</span>
                <span>₺229.98</span>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ödemeyi Tamamla
            </button>
          </div>
        </form>
      </div>

      <!-- Shopping Credit Form -->
      <div v-if="activeTab === 'shopping-credit'" class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center py-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Alışveriş Kredisi</h2>
          <p class="text-gray-600">Bu ödeme yöntemi için bankalarla görüşme sağlanacaktır.</p>
        </div>
      </div>

      <!-- Security Info -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          <svg class="inline-block h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          256-bit SSL ile güvenli ödeme
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('credit-card')
const cardNumber = ref('')
const expiryDate = ref('')
const cvv = ref('')
const cardHolderName = ref('')

const handleSubmit = () => {
  // Handle payment submission
  console.log('Payment submitted')
}
</script>
