<template>
  <!-- SPINNER -->
  <SpinnerComponent
    :isFull="false"
    :isActive="isActive"
    :text="'Cargando detalle de la orden'"
    class="py-6"
  ></SpinnerComponent>
  <Modal v-if="modal" :item="item" v-on:dismissForm="dismissForm"></Modal>
  <div v-if="details.order && !isActive" class="gradient-gray background-monkeys">
    <div
      class="column div-shopping-cart is-block-mobile is-justify-content-space-between pt-4"
    >
      <h2
        class="column mt-4 is-10 m-auto has-text-left is-size-4 has-text-weight-bold mt-5 mb-2 has-text-white text-monserrat"
      >
        Detalles de la orden No. #{{ details.order.id }}
      </h2>
      <!-- INFO PAYMENT -->
      <div
        class="column is-10 is-12-mobile background-gray box-shadow has-text-left h-100 p-0 m-auto"
      >
        <div class="p-5">
          <div class="px-5 py-1">
            <div v-if="auth.role === 'admin'" class="has-text-centered">
              <span
                @click="openChange(details.order)"
                class="icon-text has-text-info cursor-pointer"
              >
                <span class="icon">
                  <i class="fas fa-info-circle"></i>
                </span>
                <span>Cambiar estado de la orden</span>
              </span>
            </div>
            <h5
              class="is-size-6 is-mobile is-size-7-mobile has-text-centered color-text-gray"
            >
              {{ text(details.order.status) }}
            </h5>

            <span
              class="column is-10 mt-5 is-size-7 has-text-weight-bold color-text-dark-gray"
              >INFORMACIÓN DE PAGO</span
            >
            <hr class="mt-1 mb-4 hr-black" />

            <div v-for="(item, index) in content" :key="index">
              <div
                class="columns is-mobile has-text-centered color-text-dark-gray"
              >
                <span
                  class="column is-6 is-6-mobile is-size-6 is-size-7-mobile has-text-weight-bold"
                  >{{ returnName(item.name) }}</span
                >
                <span
                  class="column is-6 is-6-mobile is-size-6 is-size-7-mobile"
                >
                  <a
                    v-if="
                      item.name === 'Comprobante de pago' &&
                        returnData(details, item.name)
                    "
                    target="__blank"
                    :href="
                      `${$env.url}/storage/${returnData(details, item.name)}`
                    "
                    >Ver comprobante</a
                  >
                  {{
                    item.name === 'Monto'
                      ? $round(returnData(details, item.name))
                      : item.name === 'Comprobante de pago'
                      ? ''
                      : returnData(details, item.name)
                  }}</span
                >
              </div>
              <hr class="mt-4 mb-4 hr-black" />
            </div>
          </div>
        </div>
      </div>

    

      <!-- INFO ADDRESS -->
      <div
      v-if="details.address"
        class="column is-10 is-12-mobile background-gray box-shadow has-text-left h-100 p-0 m-auto"
      >
        <div class="p-5 mt-6">
          <div class="pl-5 pr-5">
            <span
              class="column is-10 is-size-7 has-text-weight-bold color-text-dark-gray"
              >INFORMACIÓN DE DIRECCIÓN</span
            >
            <hr class="mt-1 mb-4 hr-black" />

            <div v-for="(item, index) in address" :key="index">
              <div
                class="columns is-mobile has-text-centered color-text-dark-gray"
              >
                <span
                  class="column is-6 is-6-mobile is-size-6 is-size-7-mobile has-text-weight-bold"
                  >{{ item.name }}</span
                >
                <span
                  class="column is-6 is-6-mobile is-size-6 is-size-7-mobile"
                >
                  {{ returnData(details, item.name) }}</span
                >
              </div>
              <hr class="mt-4 mb-4 hr-black" />
            </div>
          </div>
        </div>
      </div>

      <!-- PRODUCTS -->
      <div
        class="column is-10 is-12-mobile background-gray box-shadow has-text-left h-100 p-0 m-auto"
      >
        <div class="p-5 mt-6">
          <div class="pl-5 pr-5">
            <span
              class="column is-10 mt-5 is-size-7 has-text-weight-bold color-text-dark-gray"
              >LISTA DE ARTÍCULOS</span
            >
            <hr class="mt-1 mb-4 hr-black" />
            <Products :products="details.products" order="true"></Products>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-12 mt-4 pb-4">
      <button
        @click="sendWhatsapp"
        class="button is-primary background-yellow button-radius text-dark text-monserrat p-2 color-text-dark-gray"
      >
        Enviar a Whatsapp
      </button>
    </div>

    <div class="column is-12  mt-4 pb-4">
      <router-link
        :to="'/tracking/' + route.params.id"
        class="button is-primary background-yellow button-radius text-dark text-monserrat p-2"
      >
        <span class="icon mr-1">
          <img
            :src="
              `${$env.url}/storage/icons-sky/icons/tracking-de-pedidos-blanco.png`
            "
            alt=""
          />
        </span>
        <span class="is-size-6 color-text-dark-gray">Rastrea tu pedido</span>
      </router-link>
    </div>
  </div>
</template>

<script src="./details.ts" />
<style lang="scss" src="./details.scss" />
