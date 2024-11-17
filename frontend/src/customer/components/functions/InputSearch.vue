<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { productInformation } from '@/customer/services/productService';

const search = ref('');
const searchResults = ref([]);
const showResults = ref(false);
const router = useRouter();

async function getProductByName(p_name) {
  try {
    searchResults.value = await productInformation().fetchProductsByName(p_name);
    searchResults.value = [...searchResults.value];
    showResults.value = true;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    searchResults.value = [];
  }
}

watch(search, (newSearch) => {
  if (newSearch.trim()) {
    getProductByName(newSearch);
  } else {
    searchResults.value = [];
    showResults.value = false;
  }
});

function selectProduct(p_id) {
  router.push({ name: 'book', params: { p_id } });
  showResults.value = false;
}

function handleClickOutside(event) {
  const searchContainer = document.querySelector('.search');
  if (searchContainer && !searchContainer.contains(event.target)) {
    showResults.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="search d-flex me-3 mt-2 position-relative">
    <input
      class="search-bar form-control"
      type="text"
      placeholder="Search"
      aria-label="Search"
      v-model="search"
    />
    <ul
      v-if="showResults && searchResults.length"
      class="search-results"
    >
      <li
        v-for="product in searchResults"
        :key="product.p_id"
        class="search-item"
        @click.prevent="selectProduct(product.p_id)"
      >
        <p>
          {{ product.p_name }}
        </p>
      </li>
    </ul>
    <div
      v-if="showResults && search.trim() && !searchResults.length"
      class="no-results"
    >
      <p>No books found</p>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 250px;
}

.search-results {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  list-style-type: none;
  position: absolute;
  padding: 0;
  margin-top: 3rem;
}

.no-results {
  position: absolute;
  background-color: #e3caa5;
  color: black;
  text-align: center;
  padding: 2px 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 3rem;
  width: 100%;
  height: 30px;
}

.search-item {
  color: black;
  padding: 10px 10px 0 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.search-item:hover {
  background-color: black;
  color: white;
}

@media (max-width: 990px) {
}
</style>
