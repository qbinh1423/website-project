<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Genres } from '../../services/categoryService';
import InputSearch from '../functions/InputSearch.vue';

const queryClient = useQueryClient();
const router = useRouter();
const categories = ref([]);

const categoryMutation = useMutation({
  mutationFn: async () => {
    const response = await Genres().getAllCategories();
    return response.category;
  },
  onError: (error) => {
    console.error('Error message:', error.message);
  },
  onSuccess: (data) => {
    categories.value = data.sort((a, b) => a.c_name.localeCompare(b.c_name));
    queryClient.invalidateQueries({ queryKey: ['category'] });
  }
});

watchEffect(() => {
  getCategory();
});

function getCategory() {
  categoryMutation.mutate();
}

const user = ref(JSON.parse(localStorage.getItem('loggedInUser')));
const openInfor = ref(false);

function logout() {
  const confirmLogout = confirm('Are you sure you want to logout?');
  if (confirmLogout) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    router.push({ name: 'login' });
  }
}

function toggleMenu() {
  openInfor.value = !openInfor.value;
}
</script>

<template>
  <header
    class="navbar navbar-expand-lg fixed-top"
    id="header"
  >
    <div class="container-fluid">
      <img
        class="logo"
        src="../../../assets/images/logo-dark.png"
      />
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5
            class="offcanvas-title"
            id="offcanvasNavbarLabel"
          >
            Menu
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <div
              class="search mt-1"
              role="search"
            >
              <InputSearch />
            </div>

            <li class="nav-item">
              <router-link
                class="nav-link mx-lg-3"
                aria-current="page"
                to="/home"
              >
                <i class="fa-solid fa-house"></i> Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link mx-lg-3"
                aria-current="page"
                to="/cart"
              >
                <i class="fa-solid fa-cart-shopping"></i> Cart</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <button
                class="btn nav-link dropdown-toggle mx-lg-3"
                type="button"
                id="genresDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Genres
              </button>
              <ul class="dropdown-menu">
                <li
                  v-for="category in categories"
                  :key="category.c_id"
                >
                  <router-link
                    class="dropdown-item"
                    :to="{
                      name: 'category',
                      params: { c_id: category.c_id, c_name: category.c_name }
                    }"
                    :key="category.c_id"
                  >
                    {{ category.c_name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="d-flex">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="icons me-2"
          @click="toggleMenu"
        >
          <img
            class="user-pic"
            src="../../../assets/images/blank-profile-picture.png"
          />
        </div>
        <div
          class="sub-menu-wrap"
          id="subMenu"
          :class="{ 'open-infor': openInfor }"
        >
          <div class="sub-menu">
            <div class="user-infor">
              <img
                class="user-pic"
                src="../../../assets/images/blank-profile-picture.png"
              />
              <h4>{{ user?.u_name }}</h4>
            </div>
            <router-link
              to="/account"
              class="sub-menu-link"
            >
              <i class="fa-solid fa-circle-user"></i>
              <p>Account</p>
              <span>&gt;</span>
            </router-link>
            <router-link
              to="/purchase-history"
              class="sub-menu-link"
            >
              <i class="fa-solid fa-clock-rotate-left"></i>
              <p>Purchase history</p>
              <span>&gt;</span>
            </router-link>
            <button
              type="button"
              class="logout"
              @click="logout"
            >
              <p class="pt-2"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
#header .container-fluid {
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  background-color: #fffbe9;
}

#header .logo {
  height: 3rem;
  padding-left: 15px;
}

#header .container-fluid .navbar-toggler {
  background-color: white;
  border-color: black;
}

#header .container-fluid .navbar-toggler:hover {
  background-color: #e2c4a5;
  border-color: white;
}

#header .navbar-brand {
  color: white;
}

.icons .user-pic {
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 30px;
  border: 1px solid black;
}

.sub-menu-wrap {
  position: absolute;
  top: 100%;
  right: 0.5rem;
  width: 320px;
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.5s;
}

.sub-menu-wrap.open-infor {
  max-height: 400px;
}

.sub-menu {
  background-color: white;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid black;
}

.user-infor {
  display: flex;
  align-items: center;
}

.user-infor h4 {
  font-weight: 300;
}

.user-infor img {
  width: 50px;
  border: 1px solid black;
  border-radius: 50%;
  margin-right: 15px;
}

.sub-menu-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  margin: 12px 0;
  background-color: bisque;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  height: 40px;
}

.sub-menu-link p {
  width: 100%;
  margin: 0 0 4px 12px;
}

.sub-menu-link span {
  font-size: 22px;
  margin-bottom: 6px;
  transition: transform 0.5s;
}

.sub-menu-link:hover span {
  transform: translateX(5px);
}

.sub-menu-link:hover p {
  font-weight: 600;
}

.logout {
  background-color: #c62e2e;
  border: none;
  color: white;
  border-radius: 5px;
  height: 40px;
}
.logout:hover {
  background-color: #f95454;
}

.offcanvas-header .offcanvas-title {
  font-size: 30px;
}

.offcanvas-body .nav-link {
  color: black;
  font-size: 16px;
  border-radius: 5px;
  padding: 8px;
  margin: 10px 0;
}
.offcanvas-body .nav-link:hover {
  background: black;
  color: white;
  border-radius: 5px;
}

.dropdown-toggle {
  margin-left: 3rem;
}

.offcanvas-body .dropdown-menu {
  background-color: #343a40;
  width: 180px;
}

.offcanvas-body .dropdown-item {
  color: white;
}
.offcanvas-body .dropdown-item:hover {
  color: black;
}

#offcanvasNavbar {
  color: white;
  background-color: #343a40;
}

.offcanvas-body .dropdown-menu {
  max-height: 15rem;
  overflow-y: auto;
  border-color: white;
}

/* Small devices */
@media (max-width: 480px) {
}

/* Medium devices */
@media (max-width: 990px) {
  .offcanvas-body .nav-link {
    color: white;
    font-size: 16px;
    border-radius: 5px;
    padding: 8px;
    margin-top: 10px;
    width: 120px;
    text-align: left;
  }
  .offcanvas-body .nav-link:hover {
    background: black;
    color: white;
    border-radius: 5px;
  }

  .dropdown-toggle::after {
    margin-left: 30px;
  }
}

/* Large devices */
@media (max-width: 1024px) {
}
</style>
