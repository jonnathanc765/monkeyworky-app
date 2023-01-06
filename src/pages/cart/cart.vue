<template>
  <Modal v-if="isModal" v-on:dismissForm="dismissForm"></Modal>
  <ModalProducts v-on:addQuantity="updateQuantity" :item="item"></ModalProducts>
  <div
    class="column is-12 gradient-gray background-monkeys div-shopping-cart is-block-mobile is-flex-desktop is-justify-content-space-between is-block-tablet"
  >
    <!-- PRODUCTS -->
    <div
      class="column is-8-desktop is-12-tablet is-12-mobile mb-3 max-cart-content background-gray box-shadow"
    >
      <h2
        v-if="products.length === 0 && !isActive"
        class="is-size-3 is-size-6-mobile is-size-4-tablet text-monserrat mt-5"
      >
        Actualmente no posees artículos en el carrito
      </h2>

      <SpinnerComponent
        :isFull="false"
        :isActive="isActive && products.length === 0"
        :text="'Cargando items del carrito'"
        class="py-6"
      ></SpinnerComponent>

      <Products
        v-on:getItem="getData"
        :products="products"
        order="true"
        :cart="true"
      ></Products>
    </div>

    <!-- INFO -->
    <div
      class="column is-3-desktop is-12-mobile is-12-tablet background-gray box-shadow has-text-left p-0 mr-4 mb-3 max-info"
    >
      <div class="px-5 py-2">
        <div v-for="(row, index) in infoPrice" :key="index" class="">
          <h5 class="is-size-5 is-size-6-mobile text-monserrat">
            {{
              row.name === 'Total'
                ? 'Total al cambio'
                : row.name === 'TotalUSD'
                ? 'Total USD'
                : row.name
            }}
          </h5>
          <h5
            class=" is-size-6 is-size-7-mobile has-text-weight-bold text-monserrat"
          >
            {{ row.name !== 'Productos' && row.name !== 'Items' ? '$' : '' }}
            {{ $round(this[$lowerCase(row.name)]) }}
          </h5>
          <hr class="my-3 hr-black" />
        </div>
      </div>
      <button
        v-if="products.length > 0"
        @click="pay"
        class="column mt-2 is-12 is-12-mobile button background-yellow text-dark p-0 "
      >
        Pagar
      </button>
    </div>
  </div>
</template>

<script src="./cart.ts" />
<style lang="scss" src="./cart.scss" />
