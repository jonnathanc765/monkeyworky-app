export class Routes {
  public getRoutes() {
    return [
      {
        path: '/',
        redirect: '/home',
      },
      /*
        ALL
      */
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/home.vue'),
      },
      {
        path: '/my/sales',
        name: 'mySales',
        component: () => import('@/pages/admin/my-sales/my-sales.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/register/payment',
        name: 'registerPayment',
        component: () => import('@/pages/admin/my-sales/my-sales.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/order/:id',
        name: 'details',
        component: () => import('@/pages/orders/details/details.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/conversations',
        name: 'conversations',
        component: () => import('@/pages/conversations/conversations.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/auth/sign-in',
        name: 'signIn',
        component: () => import('@/pages/auth/sign-in/sign-in.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/auth/password/reset',
        name: 'passwordReset',
        component: () => import('@/pages/auth/password-reset/password-reset.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/profile/password',
        name: 'profilePassword',
        component: () => import('@/pages/profile/security/security.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/profile/profile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/auth/sign-up',
        name: 'signUp',
        component: () => import('@/pages/auth/sign-up/sign-up.vue'),
        meta: { requiresAuth: false },
      },
      /*
        USER
      */
      {
        path: '/shopping-cart/payment',
        name: 'checkOut',
        component: () => import('@/pages/check-out/check-out.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/shopping-cart',
        name: 'cart',
        component: () => import('@/pages/cart/cart.vue'),
      },
      {
        path: '/tracking',
        name: 'tracking',
        component: () => import('@/pages/orders/tracking/tracking.vue'),
      },
      {
        path: '/tracking/:id',
        name: 'trackingDetail',
        component: () => import('@/pages/orders/tracking/details/details.vue'),
      },
      /*
        ADMIN
      */
      {
        path: '/list/users',
        name: 'listUsers',
        component: () => import('@/pages/admin/list-users/list-users.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/banks',
        name: 'banks',
        component: () => import('@/pages/admin/banks/banks.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/products',
        name: 'productsAdmin',
        component: () => import('@/pages/admin/products/products.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/sub/categories',
        name: 'subCategories',
        component: () => import('@/pages/admin/categories/sub/sub.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/pages/admin/categories/categories.vue'),
        meta: { requiresAuth: true },
      },
      /*
        REDIRECT
      */
      {
        path: '/404',
        name: 'notFound',
        component: () => import('@/pages/not-found/not-found.vue'),
      },

      { path: '/:pathMatch(.*)*', name: 'redi', redirect: { name: 'notFound' } },
    ];
  }

}
