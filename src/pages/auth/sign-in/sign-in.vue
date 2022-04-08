<template>
  <SpinnerComponent
    :isFull="true"
    :isActive="spinner"
    text="Espere mientras nos comunicamos con el servidor"
  ></SpinnerComponent>
  <div class="is-flex div-sign is-align-items-center is-justify-content-center">
    <Background></Background>
    <div class="card div-form-sign-in box-shadow-2 pl-6 pr-6 pt-6 pb-2">
      <div class="header">
        <span
          class="is-size-5 is-size-6-mobile is-size-4-fullhd is-size-is-6-touch has-text-weight-bold"
          >¡Hola! Para seguir, ingresa tú correo electrónico</span
        >
      </div>
      <div class="card-content">
        <form @submit.prevent="signIn" @click="changeFocus($event)">
          <div class="content is-align-items-start mt-5 has-text-start">
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
                v-model="form.email"
              />
              <div class="focus-line"></div>
            </div>
            <!-- PASSWORD -->
            <label
              for="password"
              class="column is-12 mt-5 letter-spacing-1 color-text-gray text-monserrat"
              >Contraseña</label
            >
            <div class="column is-12 is-relative">
              <InputForm
                @click="changeFocus"
                id="password"
                type="password"
                classArray="pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow"
                v-on:valueInput="getValue"
                :classIcon="iconEyePass"
                isSecurity="true"
              ></InputForm>
              <div id="focus-line" class="focus-line"></div>
            </div>
            <!-- FORGOT PASSWORD -->
            <span class="column is-12 is-size-7 mt-3">
              <router-link
                class="cursor-pointer color-black"
                to="/auth/password/reset"
              >
                ¿Has olvidado tu contraseña?</router-link
              >
            </span>
            <!-- BUTTON -->
            <div class="column has-text-centered is-12 mt-5 pb-4">
              <button
                class="button letter-spacing-1 is-primary background-yellow color-black pr-6 pl-6"
              >
                Continuar
              </button>
              <!-- SIGN UP -->
              <span
                class="column is-12 is-size-7 mt-4 letter-spacing-1 color-text-gray has-text-weight-light"
                >¿No tienes una cuenta?</span
              >
              <router-link to="/auth/sign-up"
                ><span class="color-red has-text-weight-semibold cursor-pointer"
                  >Regístrate</span
                ></router-link
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./sign-in.ts" />
<style lang="scss" src="./sign-in.scss" />
