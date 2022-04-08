<template>
  <SpinnerComponent
    :isFull="true"
    :isActive="spinner"
    text="Espere mientras nos comunicamos con el servidor"
  ></SpinnerComponent>
  <div class="is-flex div-sign is-align-items-center is-justify-content-center ">
    <Background></Background>
    <div class="card div-form-sign-in box-shadow-2 pl-6 pr-6 pt-6 pb-2">
      <div class="header">
        <span
          class="is-size-5 is-size-6-mobile is-size-4-fullhd is-size-is-6-touch has-text-weight-bold text-monserrat"
          >{{
            change
              ? 'Restablecimiento de contraseña'
              : '¿No recuerdas tu contraseña?'
          }}</span
        >
      </div>
      <div class="card-content">
        <form @submit.prevent="action">
          <div class="content is-align-items-start mt-5 has-text-start">
            <div v-if="!change">
              <!-- CORREO -->
              <label
                for="email"
                class="column is-12 letter-spacing-1 color-text-gray text-monserrat"
                >Correo</label
              >
              <div class="column is-12 is-relative">
                <input
                  type="text"
                  class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow"
                  id="email"
                  placeholder="Ingresa tu correo electrónico"
                  v-model="form.email"
                />
                <div class="focus-line"></div>
              </div>
            </div>

            <!-- PASSWORD -->
            <div v-if="change" class="mt-4">
              <!-- PASSWORD -->
              <label
                for="email"
                class="column is-12 letter-spacing-1 color-text-gray text-monserrat"
                >Nueva contraseña</label
              >
              <div class="column is-12 is-relative">
                <input
                  type="password"
                  class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow text-monserrat"
                  placeholder="Ingresa la nueva contraseña"
                  v-model="form.password"
                />
                <div class="focus-line"></div>
              </div>

              <!-- CONFIRM -->
              <label
                for="email"
                class="column mt-4 is-12 letter-spacing-1 color-text-gray text-monserrat"
                >Confirmar contraseña</label
              >
              <div class="column is-12 is-relative">
                <input
                  type="password"
                  class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow text-monserrat"
                  placeholder="Ingresa la confirmación"
                  v-model="form.password_confirmation"
                />
                <div class="focus-line"></div>
              </div>
            </div>
            <!-- BUTTON -->
            <div class="column has-text-centered is-12 mt-5 pb-4">
              <button class="button letter-spacing-1 is-primary background-yellow color-text-dark pr-6 pl-6 box-shadow-1">
                Continuar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./password-reset.ts" />
