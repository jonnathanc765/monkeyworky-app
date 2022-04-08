<template>
  <!-- SPINNER -->
  <SpinnerComponent
    :isFull="false"
    :isActive="isActive"
    :text="'Cargando estado'"
    class="py-6"
  ></SpinnerComponent>
  <div
    v-if="details.id && !isActive"
    class="column mt-4 div-shopping-cart is-block-mobile is-justify-content-space-between mb-6 pb-6"
  >
    <h2
      class="column is-10 m-auto has-text-left is-size-4 has-text-weight-bold mt-5 mb-2 color-text-dark-gray"
    >
      Estado de la orden #{{ details.id }}
    </h2>
    <!-- DETAILS -->
    <div
      class="column is-10 is-12-mobile background-gray box-shadow has-text-left h-100 p-4 m-auto"
    >
      <h5
        class="is-size-6 is-mobile is-size-7-mobile has-text-centered color-text-gray"
      >
        {{ text(details.status) }}
      </h5>

      <div
        class="columns is-mobile has-text-centered color-text-dark-gray py-5"
      >
        <span
          class="column is-6 is-6-mobile is-size-6 is-size-7-mobile has-text-weight-bold"
          >Fecha de creación</span
        >
        <span class="column is-6 is-6-mobile is-size-6 is-size-7-mobile">
          {{ dateParse(details.created_at) }}
        </span>
      </div>

      <div
        class="columns is-mobile has-text-centered color-text-dark-gray py-5"
      >
        <span
          class="column is-6 is-6-mobile is-size-6 is-size-7-mobile has-text-weight-bold"
          >Última modificación</span
        >
        <span class="column is-6 is-6-mobile is-size-6 is-size-7-mobile">
          {{ dateParse(details.updated_at) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script src="./details.ts" />
