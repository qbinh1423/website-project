<script setup>
import { ref, computed, watchEffect } from 'vue';
import HeaderWeb from '../components/HeaderWeb.vue';
import makeOrderService from '../services/orderServices';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const showDetails = ref([]);
const orders = ref([]);
const queryClient = useQueryClient();
const filterBy = ref('o_id');
const sortOrder = ref('asc');
const message = ref('');

const filteredOrders = computed(() => {
  return [...orders.value].sort((a, b) => {
    let comparison = 0;

    if (filterBy.value === 'o_id') {
      comparison = a.o_id - b.o_id;
    } else if (filterBy.value === 'u_id') {
      comparison = a.userName - b.userName;
    } else if (filterBy.value === 'date') {
      comparison = new Date(a.o_date) - new Date(b.o_date);
    }

    return sortOrder.value === 'asc' ? comparison : -comparison;
  });
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA');
}

async function getOrder() {
  try {
    const fetchedOrders = await makeOrderService.fetchOrders();
    console.log('Fetched Orders:', fetchedOrders);

    if (Array.isArray(fetchedOrders)) {
      orders.value = [...fetchedOrders];
      console.log('Fetched Orders 2:', fetchedOrders);
    } else {
      console.error('Fetched data is not an array');
    }
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    orders.value = [];
  }
}

const deleteOrderMutation = useMutation({
  mutationFn: (o_id) => makeOrderService.deleteOrder(o_id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    getOrder();
    message.value = 'Order deleted successfully.';
    alert(message.value);
  },
  onError: (error) => {
    console.error(`Error deleting order: ${error.message}`);
    alert('Failed to delete the order: ' + error.message);
  }
});

function deleteOrder(o_id) {
  if (confirm('Are you sure you want to delete this order?')) {
    deleteOrderMutation.mutate(o_id);
  }
}

watchEffect(() => {
  getOrder();
});

function toggleDetails(index) {
  showDetails.value[index] = !showDetails.value[index];
}
</script>

<template>
  <div>
    <header>
      <HeaderWeb />
    </header>
    <section class="page">
      <h1 class="heading">PLACED ORDERS</h1>
      <div class="filter-section">
        <label for="filterBy">Filter by:</label>
        <select
          id="filterBy"
          v-model="filterBy"
        >
          <option value="o_id">Order ID</option>
          <option value="u_id">User ID</option>
          <option value="date">Date of Purchase</option>
        </select>
        <label for="sortOrder">Sort Order:</label>
        <select
          id="sortOrder"
          v-model="sortOrder"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div class="box-container">
        <div
          v-if="filteredOrders.length === 0"
          class="no-orders-message"
        >
          No order has been created yet.
        </div>
        <div
          v-else
          v-for="(order, index) in filteredOrders"
          :key="index"
          class="card mb-3"
        >
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title">Order ID: {{ order.o_id }}</h5>
              <h5 class="card-title">User ID: {{ order.userName }}</h5>
              <p class="card-text">Name: {{ order.u_name }}</p>
              <p class="card-text">Email: {{ order.u_email }}</p>
              <p class="card-text">Address: {{ order.u_address }}</p>
              <p class="card-text">Phone: {{ order.u_phone }}</p>
              <p class="card-text">Total price: {{ order.o_total_price }}</p>
              <p class="card-text">Date of purchase: {{ formatDate(order.o_date) }}</p>
            </div>
            <div class="card-button">
              <button
                class="btn btn-primary"
                @click="toggleDetails(index)"
              >
                Detail
              </button>
              <button
                class="btn btn-danger ms-3"
                @click="deleteOrder(order.o_id)"
              >
                Delete
              </button>
            </div>
          </div>
          <div
            v-if="showDetails[index]"
            class="card-body"
          >
            <h5 class="card-subtitle mb-2">Order detail</h5>
            <ul class="list-group">
              <li
                v-for="(order, index) in filteredOrders"
                :key="index"
                class="list-group-item d-flex"
              >
                <div class="details-info d-flex flex-column">
                  <p class="mb-1">Name: {{ order.p_name }}</p>
                  <p class="mb-1">Quantity: {{ order.o_detail_quantity }}</p>
                  <p class="mb-1">Price: {{ order.o_detail_price }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  background-color: #fffbe9;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 1rem;
}

.header-section {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 1rem;
}

.filter-section {
  max-width: 1200px;
  margin: 2rem auto 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.page .heading {
  padding: 5rem 0 0;
  text-align: center;
}

.page .card {
  max-width: 1200px;
  margin: auto;
}

.page .product-image {
  width: 60px;
  height: auto;
  margin-right: 10px;
}

/* Thêm kiểu cho thông báo nếu không có order */
.no-orders-message {
  text-align: center;
  margin: 4rem 0;
  font-size: 24px;
  color: black;
}
</style>
