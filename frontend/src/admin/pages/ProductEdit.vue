<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import HeaderWeb from '../components/HeaderWeb.vue';
import ProductForm from '../components/ProductForm.vue';
import makeProductService from '@/admin/services/productServices';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const props = defineProps({
  productId: { type: String, required: true }
});
const router = useRouter();
const product = ref(null);
const message = ref('');

const queryClient = useQueryClient();

async function getProduct(id) {
  try {
    product.value = await makeProductService.fetchProduct(id);
  } catch (error) {
    console.error(error);
    router.replace({ name: 'notfound' });
  }
}

const updateProductMutation = useMutation({
  mutationFn: (productFormData) =>
    makeProductService.updateProduct(props.productId, productFormData),

  onSuccess: () => {
    message.value = 'Product updated successfully.';
    alert(message.value);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
  onError: () => {
    error.value = errorResponse?.message || 'Product updated failed.';
    alert(error.value);
  }
});

function updateProduct(productFormData) {
  updateProductMutation.mutate(productFormData);
}

getProduct(props.productId);
</script>
<template>
  <header>
    <HeaderWeb />
  </header>
  <div
    class="page"
    v-if="product"
  >
    <h3>EDIT PRODUCT</h3>
    <ProductForm
      :product="product"
      @submit:product="updateProduct"
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
