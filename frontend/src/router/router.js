import { createRouter, createWebHistory } from 'vue-router';

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../customer/pages/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../customer/pages/RegisterPage.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../customer/pages/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/cart/:u_name?',
    name: 'cart',
    component: () => import('../customer/pages/CartPage.vue')
  },
  {
    path: '/category/:c_id/:c_name?',
    name: 'category',
    component: () => import('../customer/pages/CategoryPage.vue'),
    props: true
  },

  {
    path: '/bookpage/:p_id?',
    name: 'book',
    component: () => import('../customer/pages/BookPage.vue'),
    props: true
  },
  {
    path: '/account/:u_id?',
    name: 'account',
    component: () => import('../customer/pages/AccountPage.vue'),
    props: true
  },
  {
    path: '/purchase-history',
    name: 'purchase-history',
    component: () => import('../customer/pages/PurchaseHistory.vue')
  },
  {
    path: '/notfound-page',
    name: 'notfound-page',
    component: () => import('../customer/pages/NotFoundPage.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../admin/pages/Dashboard.vue')
  },
  {
    path: '/user-account',
    name: 'user-account',
    component: () => import('../admin/pages/UserAccount.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../admin/pages/Order.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../admin/pages/ProductPage.vue')
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: () => import('../admin/pages/ProductAdd.vue')
  },
  {
    path: '/edit-product/:productId',
    name: 'edit-product',
    component: () => import('../admin/pages/ProductEdit.vue'),
    props: true
  },
  {
    path: '/notfound  ',
    name: 'notfound ',
    component: () => import('../admin/pages/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If there is a saved position (when using the "back" button on the browser)
    if (savedPosition) {
      return savedPosition;
    } else {
      // Scroll to the top of the page
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');

  // Pages that do not require authentication
  const publicPages = ['login', 'register'];

  if (!publicPages.includes(to.name) && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
