<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const openInfor = ref(false);
const router = useRouter();
const user = ref(null);

watchEffect(() => {
  const storedUser = localStorage.getItem('loggedInUser');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});

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
        class="logo ms-5"
        src="../../assets/images/logo-dark.png"
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
            <li class="nav-item">
              <router-link
                class="nav-link mx-lg-3"
                aria-current="page"
                to="/dashboard"
              >
                <i class="fa-solid fa-house"></i> Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link mx-lg-3"
                aria-current="page"
                to="/product"
              >
                <i class="fa-solid fa-book"></i> Products
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link mx-lg-3"
                aria-current="page"
                to="/order"
              >
                <i class="fa-solid fa-cart-shopping"></i> Orders
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link mx-lg-3"
                aria-current="page"
                to="/user-account"
              >
                <i class="fa-solid fa-user"></i> Users
              </router-link>
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
          class="icons fa-regular fa-circle-user me-4"
          @click="toggleMenu"
        ></div>
        <div
          class="sub-menu-wrap"
          id="subMenu"
          :class="{ 'open-infor': openInfor }"
        >
          <div class="sub-menu">
            <div class="user-infor">
              <h4>{{ user?.u_name || 'Administrator' }}</h4>
            </div>
            <p>
              Email: <span>{{ user?.u_email || 'No email' }}</span>
            </p>
            <button
              type="button"
              class="logout"
              v-on:click="logout"
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
  background-color: #f8f0cd;
}

#header .logo {
  height: 3rem;
}

.icons {
  font-size: 30px;
  cursor: pointer;
  margin-left: 30px;
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

#offcanvasNavbar {
  color: white;
  background-color: #343a40;
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
}

/* Large devices */
@media (max-width: 1024px) {
}
</style>
