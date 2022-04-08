<template>
  <SpinnerComponent
    :isFull="true"
    :isActive="loader"
    :text="text"
  ></SpinnerComponent>

  <div class="column is-12 is-12-mobile background-monkeys gradient-gray">
    <div
      v-if="products.length > 0"
      class="is-flex is-justify-content-center is-align-items-center"
      style="flex-direction: column; min-height: 100vh"
    >
      <div
        class="column is-8-desktop is-11-mobile is-8-tablet check-background mb-4"
        id="stepsCheck"
      >
        <!-- HEADER -->
        <div
          class="column is-12 is-12-table is-12-mobile is-flex p-2 check-header is-justify-content-center"
        >
          <div
            v-for="(row, index) in [1, 2, 3, 4, 5]"
            :key="index"
            class="column p-0 is-flex align-items-center is-justify-content-center"
          >
            <img 
            :id="'btn-header-check-' + index"
            @click="changeActive(index + 1)"
            :class="btnActive === index + 1 ? `icon-top` : ``"
            :src="btnActive === index + 1 ? `${$env.url}/storage/icons-sky/icons/check_paso${index+1}.png` : `${$env.url}/storage/icons-sky/icons/paso${index+1}.png`"
            >
          </div>
        </div>

        <Products v-if="btnActive === 1" :products="products"></Products>
        <Info v-if="btnActive === 2"></Info>
        <Address v-if="btnActive === 3"></Address>
        <Pays v-if="btnActive === 4"></Pays>
        <RegisterPay v-if="btnActive === 5"></RegisterPay>

        <div class="column is-12 is-flex background-yellow footer-check">
          <div class="column is-6 p-0">
            <router-link
              to="/shopping-cart"
              class="button is-light text-dark text-bold  is-size-6-desktop is-size-6-mobile"
              >Volver al inicio</router-link
            >
          </div>
          <div class="column is-6 p-0">
            <button
              @click="changeActive(btnActive + 1)"
              class="button is-light text-dark text-bold is-size-6-desktop is-size-6-mobile"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-item">
      <h2 class="color-red has-text-weight-bold is-size-3-desktop">
        No hemos encontrado items en su carrito.
      </h2>
    </div>
  </div>
</template>

<script src="./check-out.ts" />
<style lang="scss" src="./check-out.scss" />
