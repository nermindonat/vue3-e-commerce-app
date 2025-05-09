<template>
  <div class="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity z-50">
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <div
            class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
          >
            <h3 class="text-lg font-semibold text-gray-900">Adres Ekle</h3>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form @submit.prevent="submitHandler">
            <div class="px-6 py-4">
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <Input
                    name="name"
                    label="Ad"
                    v-model="name"
                    :errorMessage="nameError"
                    placeholder="Adınızı Giriniz"
                    required
                  />
                  <Input
                    name="surname"
                    label="Soyad"
                    v-model="surname"
                    :errorMessage="surnameError"
                    placeholder="Soyadınızı Giriniz"
                    required
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <Input
                    name="phone"
                    label="Telefon"
                    v-model="phone"
                    :errorMessage="phoneError"
                    placeholder="0 (___) ___ __ __"
                    required
                  />
                  <Select
                    name="city"
                    label="İl"
                    :options="props.cities"
                    v-model="city"
                    @update:modelValue="selectCityHandler"
                    :errorMessage="cityError"
                    required
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <Select
                    name="district"
                    label="İlçe"
                    v-model="district"
                    :options="districts"
                    @update:modelValue="selectDistrictHandler"
                    :errorMessage="districtError"
                    required
                  />
                  <Select
                    name="neighbourhood"
                    label="Mahalle"
                    v-model="neighbourhood"
                    :options="neighbourhoods"
                    :errorMessage="neighbourhoodError"
                    required
                  />
                </div>
                <Textarea
                  name="address"
                  label="Adres"
                  v-model="address"
                  :errorMessage="addressError"
                  placeholder="Cadde, mahalle sokak ve diğer bilgileri giriniz."
                  required
                />
                <Input
                  name="addressTitle"
                  label="Adres Başlığı"
                  v-model="addressTitle"
                  :errorMessage="addressTitleError"
                  placeholder="Adres Başlığı Giriniz"
                  required
                />
              </div>
            </div>
            <div
              class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4"
            >
              <button
                class="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import Input from "../../../components/Input.vue";
import Select from "../../../components/Select.vue";
import Textarea from "../../../components/Textarea.vue";
import { Option } from "../../../types";
import { ref, watch } from "vue";

interface IProps {
  cities: Option[];
}
const props = defineProps<IProps>();

const emit = defineEmits(["close"]);

interface District {
  id: number;
  name: string;
  cityId: number;
}

interface Neighbourhood {
  id: number;
  name: string;
  districtId: number;
}

const districts = ref<Option[]>([]);
const neighbourhoods = ref<Option[]>([]);
const selectedCityId = ref<number | null>(null);
const selectedDistrictId = ref<number | null>(null);

const validationSchema = yup.object({
  name: yup.string().required("Ad alanı zorunludur"),
  surname: yup.string().required("Soyad alanı zorunludur"),
  phone: yup.string().required("Telefon alanı zorunludur"),
  city: yup.string().required("Şehir seçimi zorunludur"),
  district: yup.string().required("Şehir seçimi zorunludur"),
  neighbourhood: yup.string().required("Şehir seçimi zorunludur"),
  address: yup.string().required("Adres alanı zorunludur"),
  addressTitle: yup.string().required("Adres başlığı alanı zorunludur"),
});

const form = useForm({ validationSchema });
const { value: name, errorMessage: nameError } = useField("name");
const { value: surname, errorMessage: surnameError } = useField("surname");
const { value: phone, errorMessage: phoneError } = useField("phone");
const { value: city, errorMessage: cityError } = useField("city");
const { value: district, errorMessage: districtError } = useField("district");
const { value: neighbourhood, errorMessage: neighbourhoodError } =
  useField("neighbourhood");
const { value: address, errorMessage: addressError } = useField("address");
const { value: addressTitle, errorMessage: addressTitleError } =
  useField("addressTitle");

const selectCityHandler = (v: number) => {
  selectedCityId.value = v;
  neighbourhoods.value = [];
};

const selectDistrictHandler = (v: number) => {
  selectedDistrictId.value = v;
};

const fetchDistricts = async (cityId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/districts/city/${cityId}`
    );
    districts.value = response.data.map((district: District) => ({
      value: district.id,
      label: district.name,
    }));
  } catch (error) {
    console.error(
      "An error occurred while fetching district information:",
      error
    );
    districts.value = [];
  }
};

const fetchNeighbourhoods = async (districtId: number) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/neighbourhoods/district/${districtId}`
    );
    neighbourhoods.value = response.data.map(
      (neighbourhood: Neighbourhood) => ({
        value: neighbourhood.id,
        label: neighbourhood.name,
      })
    );
  } catch (error) {
    console.error(
      "An error occurred while fetching neighbourhood information:",
      error
    );
    neighbourhoods.value = [];
  }
};

watch(selectedCityId, (newCityId) => {
  if (newCityId) {
    fetchDistricts(newCityId);
  }
});

watch(selectedDistrictId, (newDistrictId) => {
  if (newDistrictId) {
    fetchNeighbourhoods(newDistrictId);
  }
});

const submitHandler = form.handleSubmit(async (values) => {
  const payload = {
    name: values.name,
    surname: values.surname,
    phone: values.phone,
    cityId: Number(values.city),
    districtId: Number(values.district),
    neighbourhoodId: Number(values.neighbourhood),
    address: values.address,
    addressTitle: values.addressTitle,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/customer-address`,
      payload
    );
    if (response.data) {
      emit("close");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
</script>
