<script setup>
import { ref, watchEffect, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productInformation } from '../services/productService';
import { useMutation } from '@tanstack/vue-query';
import { Cart } from '../services/cartService';
import HeaderWeb from '../components/functions/HeaderWeb.vue';

const product = ref(null);
const relatedProducts = ref([]);
const router = useRouter();
const route = useRoute();

const props = defineProps({
  productItem: {
    type: Object,
    required: false
  }
});

const fetchProduct = async (p_id) => {
  try {
    const fetchedProduct = await productInformation().getProductwithCategory(p_id);
    if (fetchedProduct && fetchedProduct.product) {
      product.value = fetchedProduct.product;
      console.log('Product data:', product.value);
      if (product.value.categoryName) {
        await fetchRelatedProducts(product.value.categoryName);
      }
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.log('Error fetching product:', error);
  }
};

const fetchRelatedProducts = async (categoryName) => {
  try {
    const fetchProduct = await productInformation().getProductbyCategory(categoryName);
    if (fetchProduct) {
      relatedProducts.value = fetchProduct.products;
      console.log('Related products:', relatedProducts.value);
    }
  } catch (error) {
    console.log('Error fetching related products:', error);
  }
};

const addToCart = async () => {
  try {
    if (!product.value) return;
    console.log('Product being added to cart:', product.value);

    const result = await Cart().fetchCartItems(product.value);
    console.log('Product added:', result);

    router.push({ name: 'cart', query: { product: JSON.stringify(product.value) } });
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    alert('Cannot add product to cart. Please try again.');
  }
};

watchEffect(() => {
  const p_id = route.params.p_id;
  if (p_id) {
    fetchProduct(p_id);
  }
});
</script>

<template>
  <header>
    <HeaderWeb />
  </header>
  <div class="info d-flex flex-column justify-content-start align-items-center">
    <div
      class="card mb-3"
      v-if="product"
    >
      <div class="row g-0">
        <div
          class="col col-lg-4 col-md-5 col-sm-12 col-12 d-flex justify-content-center mt-lg-4 mt-sm-4 mt-3 ms-lg-4 ms-md-4"
        >
          <img
            :src="product.p_image"
            class="img-fluid rounded-start"
            alt="Product Image"
          />
        </div>
        <div class="col col-lg-7 col-md-6 col-sm-12 col-12 ps-4">
          <div class="card-body">
            <h3 class="card-title">{{ product.p_name }}</h3>
            <h6 class="card-author">Author: {{ product.p_author }}</h6>
            <h6 class="card-date">
              Published date: {{ new Date(product.p_publish_date).toLocaleDateString() }}
            </h6>
            <h6 class="card-categories">Categories: {{ product.categoryName }}</h6>
            <h3
              class="card-price"
              style="color: red"
            >
              ${{ product.p_price }}
            </h3>
            <div class="description mt-4">
              <h3>Description:</h3>
              <p class="card-text">
                {{ product.p_description }}
              </p>
            </div>
            <button
              class="btn mt-2"
              @click="addToCart"
            >
              <i class="fa-solid fa-plus"></i> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="related"
      v-if="relatedProducts.length > 0"
    >
      <div class="section-title">
        <h3>Related Books</h3>
        <div class="line"></div>
      </div>
      <div class="row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 mt-4">
        <div
          class="col d-flex justify-content-center mb-4"
          v-for="(related, index) in relatedProducts"
          :key="index"
        >
          <router-link
            :to="`/bookpage/${related.p_id}`"
            class="card-link"
          >
            <div class="card">
              <img
                :src="related.p_image"
                class="card-img-top img-fluid"
                alt="Related Book"
              />
              <div class="overlay">
                <h3 class="card-title">{{ related.p_name }}</h3>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  width: 100%;
  height: 100%;
  background-color: #fffbe9;
}

.info > .card {
  margin-top: 6rem;
  width: 90%;
  max-width: 1300px;
  height: 500px;
  background-color: #f7f0d3;
  border: none;
}

.info .card img {
  border-radius: 5px;
  height: 550px;

  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.info .description .card-text {
  height: 180px;
  text-align: justify;
  overflow-y: auto;
  padding-right: 15px;
}

.btn {
  border-radius: 10px;
  width: 150px;
  background-color: #e3caa5;
  color: black;
}
.btn:hover {
  background-color: #cab392;
}

#related {
  width: 95%;
  max-width: 1300px;
  height: 450px;
  background-color: #f7f0d3;
  margin: 7rem auto 4rem;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
}

#related .section-title h3 {
  padding-top: 20px;
  text-align: center;
}

#related .section-title .line {
  width: 150px;
  height: 4px;
  border: 10px;
  background: #ffd936;
  margin: auto;
}

#related .card {
  height: 300px;
  width: 200px;
}

#related .card-title {
  text-align: center;
  color: #fff;
  transform: translateY(20px);
  opacity: 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

#related .card:hover .card-title {
  transform: translateY(0);
  opacity: 1;
}

#related .card-img-top {
  border-radius: 2px;
  width: 100%;
  height: 100%;
}

#related .card .overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: 0.3s;
  opacity: 0;
  border-radius: 5px;
  z-index: 1;
}

#related .card:hover .overlay {
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .info .card {
    height: auto;
    min-height: 450px;
  }
}
</style>
