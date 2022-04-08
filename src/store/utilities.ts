import { createStore } from 'vuex';
export const utilitiesStore = createStore({
  state: {
    activeMenuItem: 'shop',
    headerHeight: 0,
    toggled: true,
    name: {
      home: 'shop',
      listUsers: 'profile',
      profilePassword: 'profile',
      profile: 'profile',
      registerPayment: 'registerPayment',
      mySales: 'registerPayment',
      details: 'registerPayment',
      cart: 'cart',
      checkOut: 'cart',
      banks: 'banks',
      productsAdmin: 'productsAdmin',
      subCategories: 'productsAdmin',
      categories: 'productsAdmin',
      tracking: 'tracking',
      trackingDetail: 'tracking',
      conversations: 'conversations',
    } as any,
  },
  mutations: {
    setActiveMenu(state, item) {
      state.activeMenuItem = state.name[item];
    },

    setToggled(state, toggled) {
      state.toggled = toggled;
    },
  },
  actions: {
  },
});
