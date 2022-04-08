<template>
  <SpinnerComponent
    :isFull="true"
    :isActive="spinner"
    text="Espere mientras consultamos la información suministrada y llevamos a cabo el proceso"
  ></SpinnerComponent>
  <div class="is-flex div-sign is-align-items-center is-justify-content-center">
    <Background></Background>
    <div class="notification-div" id="notification-div"></div>
    <div class="card div-form box-shadow-2 pl-ajust">
      <div class="header mt-3">
        <span
          class="is-size-5 is-size-6-mobile is-size-4-fullhd is-size-is-6-touch has-text-weight-bold"
          >Regístrate</span
        >
      </div>
      <div class="card-content p-3">
        <form @submit.prevent="validation" @click="this.borderDni($event)">
          <div class="content is-align-items-start mt-5 has-text-start">
            <div
              class="control is-10 is-block-mobile is-justify-content-space-between is-flex-desktop is-flex-tablet"
            >
              <!-- FIRSTNAME -->
              <div class="column is-5-desktop w-ajust">
                <div class="column is-12 is-12-mobile mt-2 mb-2">
                  <InputForm
                    id="firstname"
                    placeholder="Nombre"
                    type="text"
                    iconLeft="bi bi-person color-text-gray"
                    classArray="input pl-2 pr-2 pb-1"
                    v-on:valueInput="getValue"
                    v-on:keyup="validateKey('firstname')"
                  ></InputForm>
                </div>
              </div>
              <!-- LASTNAME -->
              <div class="column is-5-desktop w-ajust">
                <div class="column is-12 is-12-mobile mt-2 mb-2">
                  <InputForm
                    id="lastname"
                    placeholder="Apellido"
                    type="text"
                    iconLeft="bi bi-person color-text-gray"
                    classArray="input pl-2 pr-2 pb-1"
                    v-on:valueInput="getValue"
                    v-on:keyup="validateKey('lastname')"
                  ></InputForm>
                </div>
              </div>
            </div>

            <div
              class="control is-10 is-block-mobile is-justify-content-space-between is-flex-desktop is-flex-tablet"
            >
              <!-- EMAIL -->
              <div class="column is-5-desktop w-ajust">
                <div class="column is-12 is-12-mobile mt-2 mb-2">
                  <InputForm
                    iconLeft="bi bi-envelope color-text-gray"
                    placeholder="Correo electrónico"
                    classArray="input pl-2 pr-2 pb-1"
                    v-on:valueInput="getValue"
                    id="email"
                    type="email"
                    v-on:keyup="validateKey('email')"
                  ></InputForm>
                </div>
              </div>
              <!-- STATE -->
              <div class="column control is-5-desktop w-ajust  has-icons-left">
                <div class="column is-12 is-12-mobile mt-2 mb-2 select">
                  <select class="pr-6 pl-icon w-100 pl-3 pb-1" @change="select">
                    <option
                      v-for="item in states"
                      :key="item.id"
                      :value="item.id"
                      :selected="item.name === 'Lara'"
                      >{{ item.name }}</option
                    >
                  </select>
                  <span class="icon is-left">
                    <i class="bi bi-geo-alt color-text-gray"></i>
                  </span>
                </div>
              </div>
            </div>

            <div
              class="control is-10 is-block-mobile is-justify-content-space-between is-flex-desktop is-flex-tablet"
            >
              <!-- PASSWORD -->

              <div class="column is-5-desktop  w-ajust">
                <div class="column is-12 is-12-mobile mt-2 mb-2">
                  <InputForm
                    id="password"
                    placeholder="Contraseña"
                    type="password"
                    classArray="input pl-2 pr-2 pb-1"
                    v-on:valueInput="getValue"
                    :classIcon="iconEyePass"
                    isSecurity="true"
                  ></InputForm>
                </div>
              </div>

              <!-- CONFIRM PASSWORD -->
              <div class="column is-5-desktop  w-ajust">
                <div class="column is-12 is-12-mobile mt-2 mb-2">
                  <InputForm
                    id="password_confirmation"
                    placeholder="Confirmar contraseña"
                    type="password"
                    classArray="input pl-2 pr-2 pb-1"
                    v-on:valueInput="getValue"
                    v-on:keyup="validateKey('password_confirmation')"
                    :classIcon="iconEyePass"
                    isSecurity="true"
                  ></InputForm>
                </div>
              </div>
            </div>

            <!-- BUTTON -->
            <div class="column has-text-centered is-12 mt-5 pb-4">
              <button
                class="button letter-spacing-1 is-primary background-yellow color-black pr-6 pl-6"
              >
                Continuar
              </button>

              <!-- SIGN IN -->
              <span
                class="column is-12 is-size-7 mt-4 letter-spacing-1 color-text-gray has-text-weight-light color-black"
                >¿Ya tienes una cuenta?</span
              >
              <router-link to="/auth/sign-in"
                ><span class="color-black has-text-weight-semibold cursor-pointer"
                  >Iniciar sesión</span
                ></router-link
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./sign-up.ts" />
<style lang="scss" src="./sign-up.scss" />
