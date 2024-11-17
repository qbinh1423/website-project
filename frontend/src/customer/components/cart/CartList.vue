<script setup>
import { ref, defineProps, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { productInformation } from '@/customer/services/productService';
import { Cart } from '@/customer/services/cartService';

const quantity = ref(1);
const route = useRoute();
const product = ref(null);
const cartItems = ref([]);

const addToCart = () => {
  const existingProduct = cartItems.value.find((item) => item.p_id === product.value.p_id);

  if (existingProduct) {
    existingProduct.quantity += parseInt(quantity.value);
  } else {
    cartItems.value.push({
      ...product.value,
      quantity: parseInt(quantity.value)
    });
  }
  quantity.value = 1;
};

watchEffect(() => {
  const productData = route.query.product;
  if (productData) {
    product.value = JSON.parse(productData);
  }
});

const increaseQuantity = () => {
  quantity.value++;
  if (quantity.value < 10) {
    quantity.value = '0' + quantity.value;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    if (quantity.value < 10) {
      quantity.value = '0' + quantity.value;
    }
  }
};

const removeCart = (productId) => {
  cartItems.value = cartItems.value.filter((item) => item.p_id !== productId);
};

const removeAllCartItems = () => {
  cartItems.value = [];
};
</script>

<template>
  <div
    id="cart"
    class="box"
  >
    <div class="cart-header d-flex justify-content-between align-items-center">
      <h3 class="p-3">Cart</h3>
      <p
        class="cart-remove-all--text has-text-primary-00"
        @click="removeAllCartItems"
      >
        <button
          type="button"
          class="btn btn-outline-danger"
        >
          <i class="fa-solid fa-trash"></i> Remove All
        </button>
      </p>
    </div>
    <div>
      <!-- <p
        v-if="!product.length"
        class="cart-empty-text has-text-centered"
      >
        Add some books to the cart!
      </p> -->
    </div>
    <div
      class="cart"
      v-if="product"
    >
      <div class="row g-0 mb-3">
        <div
          class="img-wrapper col col-lg-2 col-md-4 col-sm-12 col-12 d-flex justify-content-center"
        >
          <img
            :src="product.p_image"
            class="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div class="detail col col-lg-9 col-md-7 col-sm-12 col-12">
          <div class="row align-items-start justify-content-between g-0 d-flex flex-column">
            <p class="cart-title col-10">{{ product.p_name }}</p>
            <p class="cart-price">${{ product.p_price }}</p>
            <div class="row justify-content-between g-0 mt-2">
              <div class="quantity col-6">
                <button
                  class="minus"
                  @click="decreaseQuantity"
                >
                  -
                </button>
                <span class="num">{{ String(quantity).padStart(2, '0') }}</span>
                <button
                  class="plus"
                  @click="increaseQuantity"
                >
                  +
                </button>
              </div>
              <div class="col-6 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-success me-2"
                >
                  Add
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="removeCart(product.p_id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#cart {
  background-color: #e3caa5;
  min-height: 100px;
  border-radius: 15px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  overflow: hidden;
}

.cart {
  background-color: white;
}

.cart .img-wrapper {
  padding: 10px 0;
  margin: 0 10px;
}

.cart .img-wrapper img {
  max-width: 100px;
  max-height: 130px;
  border-radius: 5px;
}

.quantity {
  height: 30px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ecdfcc;
  border-radius: 10px;
}

.quantity button {
  width: 35px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  background-color: #e3caa5;
}

.quantity button:hover {
  background-color: #bb724e;
}

.quantity span.num {
  font-size: 18px;
  pointer-events: none;
}

.total {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.detail {
  padding: 5px;
  background-color: #fff;
  margin: 5px 0;
}

.cart-title {
  width: 800px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.cart-remove-all--text button {
  margin-top: 1.2rem;
  margin-right: 1rem;
}

.cart-price {
  font-size: 16px;
  color: #666;
}

.cart-status {
  font-size: 16px;
  color: #059212;
  border-left: 1px solid black;
}

.cart-total {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
</style>
