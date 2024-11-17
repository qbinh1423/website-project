<script setup>
import HeaderWeb from '../components/HeaderWeb.vue';
import makeProductService from '../services/productServices';
import makeUserService from '../services/userServices';
import { ref, watchEffect } from 'vue';

const products = ref([]);
const productAdded = ref(0);
const productQuantity = ref(0);
const users = ref([]);
const totalUsers = ref(0);
const admin = ref(0);
const customer = ref(0);

async function getAllProduct() {
  try {
    const fetchedProducts = await makeProductService.fetchProducts();
    if (fetchedProducts && fetchedProducts.products && Array.isArray(fetchedProducts.products)) {
      products.value = fetchedProducts.products;
      productAdded.value = products.value.filter((products) => products.p_id).length;
    }
    console.log('Products:', products.value);
    console.log('Product added:', productAdded.value);
  } catch (error) {
    console.error(error);
  }
}

async function getAmountProduct() {
  try {
    const fetchedProductsQuantity = await makeProductService.fetchProducts();
    if (
      fetchedProductsQuantity &&
      fetchedProductsQuantity.products &&
      Array.isArray(fetchedProductsQuantity.products)
    ) {
      products.value = fetchedProductsQuantity.products;
      productQuantity.value = products.value.reduce((total, product) => {
        const quantity = parseInt(product.p_quantity, 10);
        if (!isNaN(quantity)) {
          return total + quantity;
        }
        return total;
      }, 0);
    }

    console.log('Products:', products.value);
    console.log('Total Product Quantity:', productQuantity.value);
  } catch (error) {
    console.error(error);
  }
}

async function getUser() {
  try {
    const fetchedUsers = await makeUserService.fetchUsers();
    console.log('Fetched Users: ', fetchedUsers);

    if (Array.isArray(fetchedUsers)) {
      users.value = [...fetchedUsers];
    } else {
      console.error('Fetched data is not an array');
    }
    totalUsers.value = users.value.filter((user) => user.u_id).length;
    admin.value = users.value.filter((user) => user.u_role === 1).length;
    customer.value = users.value.filter((user) => user.u_role === 0).length;

    console.log('Users: ', users.value);
    console.log('Total users: ', totalUsers.value);
    console.log('Admin: ', admin.value);
    console.log('Customer: ', customer.value);
  } catch (error) {
    console.error(error);
  }
}

watchEffect(() => {
  getAllProduct();
  getAmountProduct();
  getUser();
});
</script>

<template>
  <header>
    <HeaderWeb />
  </header>
  <section class="dashboard">
    <h1 class="title">DASHBOARD</h1>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center">
        <div class="col m-2">
          <h3>{{ productQuantity }}</h3>
          <p>Total Products</p>
        </div>
        <div class="col m-2">
          <h3>20</h3>
          <p>Order placed</p>
        </div>
        <div class="col m-2">
          <h3>{{ productAdded }}</h3>
          <p>Products Added</p>
        </div>
        <div class="col m-2">
          <h3>{{ totalUsers }}</h3>
          <p>Total Users</p>
        </div>
        <div class="col m-2">
          <h3>{{ customer }}</h3>
          <p>Customers</p>
        </div>
        <div class="col m-2">
          <h3>{{ admin }}</h3>
          <p>Admins</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  background-color: #f5efe6;
  min-height: 100vh;
  height: 100%;
  overflow: hidden;
}

.dashboard .title {
  padding: 5rem 0 3rem;
  text-align: center;
}

.dashboard .container .col {
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: #e4c59e;
  box-shadow: 0 1px 2px black;
  border: none;
  text-align: center;
}

.dashboard .container p {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff5e0;
  color: purple;
  font-size: 18px;
  border-radius: 1rem;
  box-shadow: inset 2px 4px 6px rgba(0, 0, 0, 0.4);
}
</style>
