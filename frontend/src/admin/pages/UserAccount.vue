<script setup>
import { ref, computed, watchEffect } from 'vue';
import HeaderWeb from '../components/HeaderWeb.vue';
import makeUserService from '../services/userServices';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

const filterBy = ref('u_id');
const sortUser = ref('asc');
const users = ref([]);
const queryClient = useQueryClient();
const message = ref('');

const filteredUsers = computed(() => {
  return [...users.value].sort((a, b) => {
    let comparison = 0;
    if (filterBy.value === 'u_id') {
      comparison = a.u_id - b.u_id;
    } else if (filterBy.value === 'u_name') {
      comparison = a.u_name.localeCompare(b.u_name);
    } else if (filterBy.value === 'u_role') {
      comparison = a.u_role - b.u_role;
    }
    return sortUser.value === 'asc' ? comparison : -comparison;
  });
});

async function getUser() {
  try {
    const fetchedUsers = await makeUserService.fetchUsers();
    console.log('Fetched Users: ', fetchedUsers);

    if (Array.isArray(fetchedUsers)) {
      users.value = [...fetchedUsers];
    } else {
      console.error('Fetched data is not an array');
    }
  } catch (error) {
    console.error(error);
  }
}

const deleteUserMutation = useMutation({
  mutationFn: (id) => makeUserService.deleteUser(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    getUser();
    message.value = 'User deleted successfully.';
    alert(message.value);
  },
  onError: (error) => {
    console.error(`Error deleting product: ${error.message}`);
  }
});

function deleteUser(u_id) {
  if (confirm('Are you sure you want to delete this user?')) {
    deleteUserMutation.mutate(u_id);
  }
}

watchEffect(() => {
  getUser();
});
</script>

<template>
  <div>
    <header>
      <HeaderWeb />
    </header>
    <section class="page">
      <h1 class="heading">USER ACCOUNT</h1>
      <div class="filter-section">
        <label for="filterBy">Filter by:</label>
        <select
          id="filterBy"
          v-model="filterBy"
        >
          <option value="u_id">User ID</option>
          <option value="u_name">User name</option>
          <option value="u_role">Role</option>
        </select>
        <label for="sortUser">Sort order:</label>
        <select
          id="sortUser"
          v-model="sortUser"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div class="box-container">
        <div
          v-for="(user, index) in filteredUsers"
          :key="index"
          class="card mb-3"
        >
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title">User ID: {{ user.u_id }}</h5>
              <p class="card-text">Name: {{ user.u_name }}</p>
              <p class="card-text">Email: {{ user.u_email }}</p>
              <p class="card-text">Phone: {{ user.u_phone }}</p>
              <p class="card-text">Address: {{ user.u_address }}</p>
              <p class="card-text">Role: {{ user.u_role }}</p>
            </div>
            <div class="card-button">
              <button
                class="btn btn-danger ms-3"
                @click="deleteUser(user.u_id)"
              >
                Delete
              </button>
            </div>
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
</style>
