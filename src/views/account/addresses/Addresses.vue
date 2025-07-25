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
                <h3 class="font-medium text-gray-900">
                  {{ address.addressTitle }}
                </h3>
                <div class="flex flex-row items-center">
                  <p class="mt-1 text-sm text-gray-600">{{ address.name }}</p>
                  <p class="mt-1 ml-2 text-sm text-gray-600">
                    {{ address.surname }}
                  </p>
                </div>
                <p class="mt-1 text-sm text-gray-600">{{ address.address }}</p>
                <p class="mt-1 text-sm text-gray-600">
                  {{ address.neighbourhood.name }} /
                  {{ address.district.name }} / {{ address.city.name }}
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
    <SuccessModal
      :open="showSuccessModal"
      message="Adres başarıyla silindi"
      @close="showSuccessModal = false"
    />
  </div>

  <AddEditModal
    v-if="showAddEditModal"
    :cities="cities"
    :addressToEdit="selectedAddress"
    @close="showAddEditModal = false"
    @saved="getCustomerAddresses"
  />
</template>

<script setup lang="ts">
import axios from "axios";
import AddEditModal from "./AddEditModal.vue";
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { Option } from "../../../types";
import SuccessModal from "../../../components/SuccessModal.vue";

interface LocationInfo {
  id: number;
  name: string;
}

export interface Address {
  id: number;
  addressTitle: string;
  name: string;
  surname: string;
  address: string;
  neighbourhood: LocationInfo;
  district: LocationInfo;
  city: LocationInfo;
  phone: string;
}

interface City {
  id: number;
  name: string;
}

const showAddEditModal = ref(false);
const showSuccessModal = ref(false);
const cities = ref<Option[]>([]);
const addresses = ref<Address[]>([]);
const selectedAddress = ref<Address>();

const getCustomerAddresses = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/customer-address`
    );
    addresses.value = response.data;
  } catch (error) {
    console.error("Error fetching customers");
  }
};

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
  selectedAddress.value = address;
  showAddEditModal.value = true;
};

const deleteAddress = async (addressId: number) => {
  try {
    await axios.delete(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/customer-address/delete/${addressId}`
    );
    showSuccessModal.value = true;
    getCustomerAddresses();
  } catch (error) {
    console.error("An error occurred while deleting the address:", error);
  }
};

onMounted(async () => {
  fetchCities();
  getCustomerAddresses();
});
</script>
