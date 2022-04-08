<template>
  <div
    class="column gradient-gray background-monkeys is-12 is-flex is-justify-content-center is-align-items-center is-flex-direction-column pb-6"
  >
    <span
      class="is-size-4 is-size-5-mobile is-size-4-fullhd is-size-is-5-touch has-text-weight-bold mt-5 color-text-white"
      >Clave y seguridad</span
    >
    <form @submit.prevent="changePassword" class="column is-8">
      <div
        class="column is-12 content is-align-items-start mt-5 has-text-start"
      >
        <!-- PASSWORD -->
        <label for="email" class="column is-12 letter-spacing-1 color-text-white"
          >Contraseña actual</label
        >
        <div class="column is-12 is-relative">
          <input
            type="password"
            class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow"
            placeholder="Ingresa su contraseña actual"
            v-model="form.original_password"
          />
          <div class="focus-line"></div>
        </div>

        <!-- NEW PASSWORD -->
        <label for="email" class="column is-12  mt-6 letter-spacing-1 color-text-white"
          >Nueva Contraseña</label
        >
        <div class="column is-12 is-relative">
          <input
            type="password"
            class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow"
            placeholder="Ingresa la nueva contraseña"
            v-model="form.password"
          />
          <div class="focus-line"></div>
        </div>

        <!-- PASSWORD CONFIRMATION -->
        <label for="email" class="column mt-6 is-12 letter-spacing-1 color-text-white"
          >Confirmar contraseña</label
        >
        <div class="column is-12 is-relative">
          <input
            type="password"
            v-model="form.password_confirmation"
            class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow"
            placeholder="Confirme la nueva contraseña"
          />
          <div class="focus-line"></div>
        </div>
        <!-- BUTTON -->
        <div class="column has-text-centered is-12 mt-5 pb-4">
          <button
            :disabled="disabled"
            class="button letter-spacing-1 is-primary background-yellow text-black pr-6 pl-6 box-shadow-2"
          >
            Continuar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script src="./security.ts" />
