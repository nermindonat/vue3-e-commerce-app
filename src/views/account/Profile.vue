<template>
  <div>
    <!-- Header -->
    <div class="bg-white shadow rounded-lg mb-4">
      <div class="px-6 py-4 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Kullanıcı Bilgilerim</h2>
        <button class="text-orange-500 hover:text-orange-600">
          <Icon icon="mdi:dots-vertical" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Email Verification Banner -->
    <div class="bg-green-50 rounded-lg p-4 mb-4 flex items-center justify-between">
      <div class="flex items-center">
        <Icon icon="mdi:check-circle" class="h-5 w-5 text-green-500 mr-2" />
        <span class="text-sm text-green-700">E-Posta Adresinizi Doğrulamanız Gerekmektedir</span>
      </div>
      <button class="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
        Doğrula
      </button>
    </div>

    <!-- User Info Form -->
    <div class="bg-white shadow rounded-lg">
      <div class="p-6">
        <div class="grid grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ad</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="nermingurses21@gmail.com" readonly />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Doğum Tarihiniz</label>
              <div class="grid grid-cols-3 gap-4">
                <select class="px-3 py-2 border border-gray-300 rounded-md">
                  <option>Gün</option>
                </select>
                <select class="px-3 py-2 border border-gray-300 rounded-md">
                  <option>Ay</option>
                </select>
                <select class="px-3 py-2 border border-gray-300 rounded-md">
                  <option>Yıl</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cep Telefonu</label>
              <div class="flex">
                <select class="w-24 px-3 py-2 border border-gray-300 rounded-l-md">
                  <option>+90</option>
                </select>
                <input type="tel" class="flex-1 px-3 py-2 border border-gray-300 rounded-r-md border-l-0" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kurumsal</label>
              <div class="flex items-center">
                <input type="checkbox" class="h-4 w-4 text-orange-500 border-gray-300 rounded" />
                <span class="ml-2 text-sm text-gray-600">İş yeri alışverişlerim için fırsatlardan haberdar olmak istiyorum.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Password Update Section -->
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Şifre Güncelleme</h3>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Şu Anki Şifre</label>
              <div class="relative">
                <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <button class="absolute right-2 top-2 text-gray-400">
                  <Icon icon="mdi:eye-off" class="h-5 w-5" />
                </button>
              </div>
            </div>
            <div></div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
              <div class="relative">
                <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <button class="absolute right-2 top-2 text-gray-400">
                  <Icon icon="mdi:eye-off" class="h-5 w-5" />
                </button>
              </div>
              <p class="mt-1 text-sm text-gray-500">Şifreniz en az 10 karakter olmalı. 1 büyük harf, 1 küçük harf ve rakam içermelidir.</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre (Tekrar)</label>
              <div class="relative">
                <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <button class="absolute right-2 top-2 text-gray-400">
                  <Icon icon="mdi:eye-off" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Two Factor Auth -->
        <div class="mt-8">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">İKİ ADIMLI DOĞRULAMA</h3>
              <p class="text-sm text-gray-500 mt-1">İki adımlı doğrulama yöntemini etkinleştirdiğinizde, kişisel şifrelerinize ek olarak kayıtlı cep telefonunuza gelen doğrulama koduyla oturum açarsınız.</p>
            </div>
            <div class="relative inline-block w-12 h-6">
              <input type="checkbox" class="peer sr-only" />
              <span class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-orange-500"></span>
              <span class="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow"></span>
            </div>
          </div>
        </div>

        <!-- Update Button -->
        <div class="mt-8">
          <button class="w-full bg-gray-200 text-gray-500 py-3 rounded-md font-medium">
            Güncelle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script> 