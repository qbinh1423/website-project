<script setup>
import { ref } from 'vue';
import ProductForm from '../components/ProductForm.vue';
import HeaderWeb from '../components/HeaderWeb.vue';
import makeProductService from '@/admin/services/productServices';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();
const product = ref({
  p_name: '',
  p_author: '',
  p_publish_date: '',
  p_description: '',
  p_category: '',
  p_price: '',
  p_quantity: '',
  p_image: ''
});

const message = ref('');
const error = ref('');

const createProductMutation = useMutation({
  mutationFn: (productFormData) => makeProductService.createProduct(productFormData),
  onSuccess: () => {
    message.value = 'Product added successfully.';
    alert(message.value);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
  onError: () => {
    error.value = errorResponse?.message || 'Product added failed.';
    alert(error.value);
  }
});

function createProduct(productFormData) {
  console.log(productFormData);
  createProductMutation.mutate(productFormData);
}
</script>

<template>
  <header>
    <HeaderWeb />
  </header>
  <div
    v-if="product"
    class="page"
  >
    <h3>ADD PRODUCT</h3>
    <ProductForm
      :product="product"
      @submit:product="createProduct"
    />
  </div>
</template>

<style scoped>
.page h3 {
  text-align: center;
  padding-top: 6rem;
  background-color: #fffbe9;
}
</style>