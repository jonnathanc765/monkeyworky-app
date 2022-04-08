<template>
  <div id="wrapper" class="column is-12" :class="{ toggled: !toggled }">
    <button
      @click="toggleSidebar"
      class="is-flex is-justify-content-center is-align-items-center is-hidden-desktop btn-menu-tablet"
    >
      <i :class="[toggled === true ? 'bi bi-list has-text-white is-size-2' : 'bi bi-x has-text-white is-size-2']"></i>
    </button>
    <div class="column is-8">
      <div id="sidebar-wrapper">
        <div
          class="div-side is-flex is-justify-content-center is-align-items-center"
        >
          <button
            @click="toggleSidebar"
            class="is-justify-content-center is-align-items-center h-100 w-100 is-hidden-mobile is-hidden-desktop is-flex-desktop btn-menu-desktop"
            style="background:none;border:none;cursor:pointer"
          >
            <i :class="[toggled === true ? 'bi bi-list has-text-white is-size-2' : 'bi bi-x has-text-white is-size-2']"></i>
          </button>
        </div>
        <div class="icon-list" @mouseenter="handleEvent">
          <ul>
            <li
              v-for="row in auth.role
                ? auth.role === 'admin'
                  ? menu_admin
                  : menu_user
                : menu_user"
              :key="row.name"
              :class="{ active: activeMenuItem == row.name }"
            >
              <router-link @click="changeActive(row.name)" :to="row.to">
                <span
                  v-if="row.icon"
                  :class="[row.name !== 'conversations' ? row.icon : '']"
                >
                  <i
                    v-if="row.name === 'conversations'"
                    :class="[row.icon, 'icon-conversation', 'is-relative']"
                  ></i>
                </span>
                <div v-if="!row.icon">
                  <span>
                    <img
                      class="mt-1"
                      :src="
                        activeMenuItem !== row.name
                          ? $env.url + row.img
                          : $env.url + row.imgActive
                      "
                      :alt="row.name"
                    />
                  </span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="secondary-list" @mouseleave="handleEvent">
          <template v-if="true">
            <div
              v-for="list in auth.role
                ? auth.role === 'admin'
                  ? list_admin
                  : list_user
                : list_user"
              :key="list.name"
            >
              <router-link :to="list.to">
                <h3
                  style="cursor: pointer"
                  @click="changeActive(list.changeActive)"
                  :class="{
                    selected: activeMenuItem === list.name && list.selected,
                    customerMarginTopFirstIcon:
                      activeMenuItem === list.name &&
                      list.customerMarginTopFirstIcon,
                    customerMarginTop:
                      activeMenuItem === list.name && list.customerMarginTop,
                    customerMarginTopFirstIconNonSelected:
                      activeMenuItem !== list.name &&
                      list.customerMarginTopFirstIconNonSelected,
                    customerMarginTopNonSelected:
                      activeMenuItem !== list.name &&
                      list.customerMarginTopNonSelected,
                    customerMarginTopNonSelectedTracking:
                      activeMenuItem !== list.name &&
                      list.customerMarginTopNonSelectedTracking
                  }"
                  class="
                  main-list-title
                  is-flex
                  ml-4
                  is-justify-content-space-between is-align-items-center has-text-grey-darker text-monserrat
                "
                >
                  {{ list.title }}
                </h3>
              </router-link>

              <div
                v-if="activeMenuItem === list.name"
                class="list-group list-group-flush"
              >
                <a
                  v-for="subMenu of list.subMenu === 'isArray'
                    ? categories
                    : list.subMenu"
                  :key="list.subMenu === 'isArray' ? subMenu.id : subMenu.title"
                  href="javascript:void(0)"
                  class="list-group-item list-group-item-action text-monserrat"
                >
                  <div
                    class="
                      is-flex
                      mt-4
                      ml-4
                      w-100
                      is-justify-content-space-between is-align-items-center
                    "
                  >
                    <h5
                      class="mb-1"
                      :class="{
                        selected:
                          list.subMenu === 'isArray'
                            ? subMenu.id === categorySelected
                            : route.name === subMenu.name
                      }"
                    >
                      <a
                        v-if="list.subMenu === 'isArray'"
                        @click="selectCategory(subMenu.id)"
                        href="javascript:void(0)"
                        class="is-size-6 is-uppercase text-monserrat"
                      >
                        {{ subMenu.name }}
                      </a>
                      <router-link
                        v-if="list.subMenu !== 'isArray'"
                        :to="subMenu.to"
                        class="is-size-6"
                      >
                        {{ subMenu.title }}
                      </router-link>
                    </h5>
                  </div>
                  <ul
                    v-if="
                      categorySelected === subMenu.id &&
                        list.subMenu === 'isArray'
                    "
                  >
                    <li
                      v-for="subcategory of subMenu.subcategories"
                      :key="subcategory.id"
                      class="is-flex ml-4 has-text-left"
                    >
                      <a
                        @click="selectSubcategory(subcategory.id);"
                        class="has-text-weight-bold my-1 mr-4"
                        :class="{
                          selected: subCategorySelected == subcategory.id
                        }"
                        href="javascript:void(0)"
                      >
                        {{ subcategory.name }}
                      </a>
                    </li>
                  </ul>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
      id="page-content-wrapper"
      class="page-content-wrapper"
      :class="toggled ? 'main-content' : 'max-content'"
    >
      <router-view> </router-view>
      <FooterComponent
        v-on:filterCategory="getFooterId"
        @filter="filterCategory(categoryIdFooter)"
        :categories="categories"
      ></FooterComponent>
    </div>
  </div>
</template>

<script>
import { categoriesStore } from '@/store/categories'
import { utilitiesStore } from '@/store/utilities'
import { productStore } from '@/store/product'
import { animationScroll } from '@/core/global/animation'
import { useStore } from 'vuex'
import { computed, ref } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import menu_user from '@/core/data/menu_user.json'
import menu_admin from '@/core/data/menu_admin.json'
import list_user from '@/core/data/list_user.json'
import list_admin from '@/core/data/list_admin.json'

export default {
  components: {
    FooterComponent: defineAsyncComponent(() =>
      import('@/components/footer/footer.component.vue')
    )
  },
  setup () {
    const authStore = useStore()
    const route = useRoute()
    const router = useRouter()
    const categoryIdFooter = ref(0)

    const auth = computed(() => {
      return authStore.state.auth
    })

    const getFooterId = data => {
      categoryIdFooter.value = data
    }

    const filterCategory = async id => {
      if (route.name === 'home') {
        animationScroll('#div-products', document)
        await productStore.dispatch('getProducts', {
          filter: { category: id }
        })
      } else {
        router.push(`/home?category=${id}`)
      }
    }
    return {
      auth,
      route,
      filterCategory,
      getFooterId,
      categoryIdFooter,
      menu_user,
      menu_admin,
      list_user,
      list_admin
    }
  },
  data () {
    return {
      toggled: true,
      keyword: '',
      calcHeight: '0px',
      categorySelected: 0,
      subCategorySelected: 0
    }
  },
  computed: {
    activeMenuItem () {
      return utilitiesStore.state.activeMenuItem
    },
    categories () {
      return categoriesStore.state.categories
    },
    height () {
      return utilitiesStore.state.headerHeight
    }
  },
  mounted () {
    this.calcHeight = `calc(100vh - ${this.height}px)`
    this.$watch(
      () => {
        return this.height
      },
      val => {
        this.calcHeight = `calc(100vh - ${val}px)`
      }
    )
  },

  methods: {
    toggleSidebar () {
      this.toggled = !this.toggled
      utilitiesStore.commit('setToggled', this.toggled)
    },
    changeActive (value) {
      utilitiesStore.commit('setActiveMenu', value)
    },
    selectCategory (id) {
      this.categorySelected = id
    },
    async selectSubcategory (id) {
      this.toggleSidebar();
      this.subCategorySelected = id
      await productStore
        .dispatch('getProducts', { filter: { subCategory: id } })
        .finally(() => {})
      animationScroll('#div-products', document)
    },
    handleEvent (event) {
      if (screen.width > 1100) {
        if (event.type === 'mouseleave') {
          this.toggled = !this.toggled
          utilitiesStore.commit('setToggled', this.toggled)
        }
        if (event.type === 'mouseenter') {
          this.toggled = true
          utilitiesStore.commit('setToggled', this.toggled)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
