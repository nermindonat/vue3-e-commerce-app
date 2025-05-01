<template>
  <div>
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

    <div class="bg-white shadow rounded-lg">
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="address in addresses"
            :key="address.id"
            class="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors"
          >
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-medium text-gray-900">{{ address.title }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ address.fullName }}</p>
                <p class="mt-1 text-sm text-gray-600">{{ address.address }}</p>
                <p class="mt-1 text-sm text-gray-600">
                  {{ address.district }}/{{ address.city }}
                  {{ address.postalCode }}
                </p>
                <p class="mt-1 text-sm text-gray-600">{{ address.phone }}</p>
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

  <AddEditModal
    v-if="showAddEditModal"
    :cities="cities"
    @close="showAddEditModal = false"
  />
</template>

<script setup lang="ts">
import axios from "axios";
import AddEditModal from "./AddEditModal.vue";
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { Option } from "../../../types";

interface Address {
  id: number;
  title: string;
  fullName: string;
  address: string;
  district: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface City {
  id: number;
  name: string;
}

const showAddEditModal = ref(false);
const cities = ref<Option[]>([]);

const addresses = ref<Address[]>([
  {
    id: 1,
    title: "Ev adresim",
    fullName: "Nermin Donat",
    address: "Flat 2/1, Block B, Sample Street",
    district: "Sample District",
    city: "Sample City",
    postalCode: "34000",
    phone: "0555 555 55 55",
  },
]);

const fetchCities = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/cities`
  );
  cities.value = response.data.map((city: City) => ({
    value: city.id,
    label: city.name,
  }));
};

const openNewAddressModal = () => {
  showAddEditModal.value = true;
};

const editAddress = (address: Address) => {
  console.log("Editing address:", address);
};

const deleteAddress = (addressId: number) => {
  console.log("Deleting address:", addressId);
};

onMounted(fetchCities);
</script>
