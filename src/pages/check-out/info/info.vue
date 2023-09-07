<template>
  <!-- TITLE -->
  <div class="check-title">
    <h4
      class="has-text-weight-bold is-size-4 is-size-5-mobile p-4 color-text-dark-gray"
    >
      Tipos de entrega
    </h4>
  </div>

  <div class="">
    <SpinnerComponent
      :isFull="false"
      :isActive="isActive && types.length === 0"
      :text="'Cargando los tipos de entrega'"
      class="py-6"
    ></SpinnerComponent>

    <!-- COLUMNS -->
    <h4
      v-if="!isActive || types.length > 0"
      class="color-red pb-1 is-size-7-mobile"
    >
      Seleccione el tipo de entrega que desee
    </h4>

    <h4
      v-if="!isActive && types.length === 0"
      class="color-red pb-1 is-size-7-mobile"
    >
      No se encontraron tipos de entregas en el sistema
    </h4>
    <div
      v-for="item in types"
      :key="item.delivery_management_id"
      class="column is-10 is-10-mobile is-flex is-justify-content-center is-align-items-center m-auto py-2"
    >
      <img
        @click="changeType(item.delivery_management_id)"
        class="column is-3 is-5-mobile cursor-pointer"
        :src="
          type !== item.delivery_management_id
            ? `${$env.url}/images/${item.icon}`
            : `${$env.url}/images/${item.icon_active}`
        "
        alt="Delivery"
      />
      <div class="column is-8 ml-4 has-text-left">
        <span
          v-if="type === item.delivery_management_id"
          class="is-size-6-desktop is-size-7-mobile color-text-gray has-text-left"
        >
          <h4
            v-if="item.name === 'Retiro en tienda'"
            class="has-text-weight-bold"
          >
            DIRECCIÓN
          </h4>
          {{ item.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script src="./info.ts" />
