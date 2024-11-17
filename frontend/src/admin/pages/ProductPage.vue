<script setup>
import HeaderWeb from '../components/HeaderWeb.vue';
import makeProductService from '@/admin/services/productServices';
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const router = useRouter();
const queryClient = useQueryClient();
const product = ref([]);
const fetchProducts = async () => {
  try {
    const fetchedProducts = await makeProductService.fetchProducts();
    console.log('Fetched products: ', fetchedProducts);
    if (fetchedProducts && fetchedProducts.products) {
      product.value = fetchedProducts.products;
      console.log('Product data: ', product.value);
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.log('Error fetching product: ', error);
  }
};

watchEffect(() => {
  fetchProducts();
});

function addProduct() {
  router.push({ name: 'add-product' });
}

function updateProduct(id) {
  console.log(id);
  router.push({ name: 'edit-product', params: { productId: id } });
}

const deleteProductMutation = useMutation({
  mutationFn: (id) => makeProductService.deleteProduct(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
    fetchProducts();
  },
  onError: (error) => {
    console.error(`Error deleting product: ${error.message}`);
  }
});

function deleteProduct(id) {
  if (confirm('Are you sure to want delete this product?')) {
    deleteProductMutation.mutate(id);
  }
}

const $emit = defineEmits(['update:selectedIndex']);
</script>
<template>
  <header>
    <HeaderWeb />
  </header>
  <section class="products">
    <h1 class="text-center">LIST OF PRODUCTS</h1>
    <button
      class="btn-add btn"
      @click="addProduct"
    >
      <i class="fa-solid fa-plus"></i> Add new product
    </button>
    <div class="box-container">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center">
        <div
          class="col card"
          v-for="product in product"
          style="width: 18rem"
        >
          <img
            :src="product.p_image"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-name">{{ product.p_name }}</h5>
            <h4 class="card-title">${{ product.p_price }}</h4>
            <div class="card-button d-flex justify-content-around">
              <button
                class="btn btn-primary"
                @click="updateProduct(product.p_id)"
              >
                Update
              </button>
              <button
                class="btn btn-danger"
                @click="deleteProduct(product.p_id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.products {
  background-color: #fffbe9;
  min-height: 100vh;
  height: 100%;
}

.products .box-container {
  margin: 3rem auto 0;
}

.products h1 {
  padding: 5rem 0 2rem;
}

.products .btn-add {
  border-radius: 5px;
  border: none;
  width: 180px;
  background-color: #e3caa5;
  position: absolute;
  right: 30px;
}
.products .btn-add:hover {
  background-color: #cab392;
}

.products .card {
  margin: 2rem;
  height: 100%;
}

.products .card .card-name {
  height: 80px;
  overflow-y: auto;
}

.products .card .card-img-top {
  border-radius: 5px;
  margin-top: 1rem;
  width: 260px;
  height: 360px;
}

.products .card .card-title {
  color: red;
  margin-bottom: 1rem;
}
</style>
