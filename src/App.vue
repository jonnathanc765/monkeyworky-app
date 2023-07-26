<template>
  <HeaderComponent
    v-if="
      route.name !== 'signIn' &&
        route.name !== 'signUp' &&
        route.name !== 'passwordReset'
    "
  ></HeaderComponent>

  <router-view
    v-if="
      !auth.id ||
        route.name === 'signIn' ||
        route.name === 'signUp' ||
        route.name === 'passwordReset'
    "
  ></router-view>
  <MenuBase
    v-if="
      auth.id &&
        route.name !== 'signIn' &&
        route.name !== 'signUp' &&
        route.name !== 'passwordReset'
    "
    key="1"
  >
  </MenuBase>

  <keep-alive>
    <FooterComponent
      v-on:filterCategory="getFooterId"
      @filter="filterCategory(categoryIdFooter)"
      v-if="
        response &&
          !auth.id &&
          route.name !== 'signIn' &&
          route.name !== 'signUp'
      "
      :categories="categories"
    ></FooterComponent>
  </keep-alive>
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categoriesStore } from './store/categories'
import { productStore } from './store/product'
import { utilitiesStore } from './store/utilities'
import { useStore } from 'vuex'
import { animationScroll } from './core/global/animation'
import {
  addClassValidation,
  removeClassValidation
} from './core/global/validation'
import { orderStore } from './store/order'
import { notificationStore } from './store/notification'
import { conversationsStore } from './store/conversations'

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent: defineAsyncComponent(() =>
      import('@/components/header/header.component.vue')
    ),
    MenuBase: defineAsyncComponent(() => import('@/layouts/Base.vue')),
    FooterComponent: defineAsyncComponent(() =>
      import('@/components/footer/footer.component.vue')
    )
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const authStore = useStore()
    const categoryIdFooter = ref(0)
    const viewDrop = ref(false)
    const viewDropNotification = ref(false)
    const changeRouter = (change = false) => {
      if (change) {
        switchRouter(route)
      } else {
        router.beforeResolve(to => {
          switchRouter(to)
        })
      }
    }

    const getFooterId = (data: any) => {
      categoryIdFooter.value = data
    }

    const filterCategory = async (id: any) => {
      if (route.name === 'home') {
        animationScroll('#div-products', document)
        await productStore.dispatch('getProducts', { filter: { category: id } })
      } else {
        router.push(`/home?category=${id}`)
      }
    }

    const switchRouter = (to: any) => {
      utilitiesStore.commit('setActiveMenu', to.name)
    }

    const auth = computed(() => {
      return authStore.state.auth
    })

    const eventOrder = () => {
      window.Echo.private(`new-order.${auth.value.id}`).listen(
        'OrderEvent',
        (res: any) => {
          orderStore.commit('setOrder', res.response.data)
          notificationStore.commit('setCount', 1)
          notificationStore.commit('setNotification', res.response.notification)
        }
      )
    }

    const joinUser = () => {
      window.Echo.join(`listUsers`)
        .here((users: any) => {
          conversationsStore.commit('setUsersActive', users)
        })
        .joining((user: any) => {
          conversationsStore.commit('setUserActive', user)
        })
        .leaving((user: any) => {
          conversationsStore.commit('deleteUserActive', user)
        })
    }

    onMounted(async () => {
      await categoriesStore.dispatch('getCategories')
      changeRouter()
      document.body.addEventListener('click', eventDrop)
      if (auth.value.id) {
        if (auth.value.role === 'admin') {
          eventOrder()
        }
        joinUser()
      }
    })

    onUnmounted(() => {
      document.body.removeEventListener('click', eventDrop)
      if (auth.value.id) {
        if (auth.value.role === 'admin') {
          window.Echo.leave(`new-order.${auth.value.id}`)
        }
      }
    })

    const eventDrop = (event: any) => {
      if (
        event.target.id !== 'btn-logout' &&
        event.target.id !== 'btn-notification'
      ) {
        if (viewDrop.value) {
          viewDrop.value = false
          removeClassValidation('#drop-header', ['is-active'])
        }

        if (viewDropNotification.value) {
          viewDropNotification.value = false
          removeClassValidation('#drop-header-notification', ['is-active'])
        }
      } else {
        if (event.target.id === 'btn-logout') {
          dropdDownLog()
          return
        }
        dropDownNotification()
        return
      }
    }

    const dropdDownLog = () => {
      if (!viewDrop.value) {
        viewDrop.value = true
        addClassValidation('#drop-header', ['is-active'])
      } else {
        viewDrop.value = false
        removeClassValidation('#drop-header', ['is-active'])
      }
    }

    const dropDownNotification = () => {
      if (!viewDropNotification.value) {
        notificationStore.state.count = 0
        viewDropNotification.value = true
        addClassValidation('#drop-header-notification', ['is-active'])
      } else {
        viewDropNotification.value = false
        removeClassValidation('#drop-header-notification', ['is-active'])
      }
    }

    onUpdated(() => {
      changeRouter(true)
    })

    const categories = computed(() => {
      return categoriesStore.state.categories
    })

    const response = computed(() => {
      return productStore.state.response
    })

    return {
      route,
    categories,
      response,
      auth,
      getFooterId,
      filterCategory,
      categoryIdFooter
    }
  }
})
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
