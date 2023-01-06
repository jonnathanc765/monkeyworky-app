<template>
  <div class="steps-content">
    <!-- TITLE -->
    <div v-if="!order" class="check-title">
      <h4
        class="has-text-weight-bold is-size-4 is-size-5-mobile p-4 color-text-dark-gray"
      >
        Confirmar pedido
      </h4>
    </div>

    <!-- ITEMS -->

    <div
      class="column is-12"
      :class="cart ? '' : ['max-products', 'overflow-items']"
    >
      <div v-for="item in products" :key="item.id">
        <div class="column is-12 is-12-mobile mt-4 box-shadow-check p-2">
          <div class="is-flex is-relative">
            <!-- IMG -->
            <img
              :src="`${$env.url}/storage/${item.product.picture_url}`"
              class="column is-2 is-2-mobile logo-product-check m-auto"
              :alt="item.product.name"
            />
            <!-- COLUMNS -->
            <div
              class="column is-flex-mobile is-flex-direction-column"
              :class="cart ? 'is-9' : 'is-10'"
            >
              <!-- COLUMN 1 -->
              <div
                class="column is-10  is-9-mobile is-flex color-text-dark-gray is-align-items-center"
              >
                <span
                  v-for="(row, index) in [1, 2, 3]"
                  :key="index"
                  class="column is-4 is-size-6 is-size-7-mobile has-text-weight-bold has-text-centered"
                >
                  {{ textProuct(item, index) }}
                </span>
              </div>
              <!-- COLUMN 2 -->
              <div
                class="column p-2 mt-2 is-10 is-9-mobile is-flex color-text-dark-gray"
              >
                <span
                  v-for="(row, index) in [1, 2, 3]"
                  :key="index"
                  class="column is-4 is-size-6 is-size-7-mobile has-text-weight-light has-text-centered"
                >
                  {{ textValues(item, index) }}
                </span>
              </div>
            </div>
            <div v-if="cart" class="delete-item-cart is-justify-content-center">
              <span
                class="column is-4 is-size-6 is-size-7-mobile has-text-weight-bold has-text-centered"
              >
                Acciones
              </span>
              <button
                :disabled="disabled[item.variation.id] > 1"
                :id="`delete-item-${item.variation.id}`"
                :class="disabled[item.variation.id] > 1 ? 'is-loading' : ''"
                @click="addCart(item)"
                type="button"
                class="button is-12 column background-yellow is-flex is-align-items-center"
                style="margin-bottom:5px !important"
              >
                <span class="icon ">
                  <i
                    :id="`icon-edit-${item.variation.id}`"
                    :class="
                      disabled[item.variation.id] > 1 ? '' : 'bi bi-pencil'
                    "
                    class="icon-header has-text-white is-size-5-desktop is-size-6-mobile is-size-6-tablet"
                  ></i>
                </span>
              </button>

              <button
                :disabled="disabled[item.variation.id] > 1"
                :id="`delete-item-${item.variation.id}`"
                :class="disabled[item.variation.id] > 1 ? 'is-loading' : ''"
                @click="deleteItem(item.variation.id, item.shopping_cart_id)"
                type="button"
                class="button column is-12 background-outside is-flex is-align-items-center"
              >
                <span class="icon ">
                  <i
                    :id="`icon-delete-${item.variation.id}`"
                    :class="
                      disabled[item.variation.id] > 1 ? '' : 'fas fa-trash-alt'
                    "
                    class="icon-header has-text-white is-size-5-desktop is-size-6-mobile is-size-6-tablet"
                  ></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./products.ts" />
<style lang="scss" src="./products.scss" />
