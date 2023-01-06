<template>
  <Modal
    :item="form.item"
    v-if="isModal"
    v-on:dismissForm="isModal = false"
  ></Modal>
  <div
    class="column gradient-gray background-monkeys is-12 column is-12-mobile is-12-tablet p-2 pb-4"
  >
    <h2 class="is-size-4 is-size-4-mobile color-text-white mt-4">
      Mi perfil
    </h2>
    <div
      class="column  is-12 is-12-mobile is-flex-desktop is-block-mobile is-justify-content-space-between p-5"
    >
      <div class="column is-5 is-12-mobile has-text-left py-3">
        <!-- EMAIL -->
        <label
          for="email"
          class="column is-12 letter-spacing-1 color-text-white"
          >Correo</label
        >
        <div class="column is-12 is-relative">
          <input
            type="email"
            v-model="form.email"
            disabled
            class="pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow color-text-white"
            placeholder="Ingresa la nueva contraseña"
          />
          <div class="focus-line"></div>
        </div>
      </div>

      <div class="column is-5 is-12-mobile has-text-left py-3">
        <!-- PHONE -->
        <label class="column is-12 letter-spacing-1 color-text-white"
          >Número de teléfono</label
        >
        <div class="column is-12 is-relative">
          <input
            type="text"
            v-model="form.phone"
            class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow color-text-white"
            placeholder="Ejemplo: 0412 550 0000"
          />
          <div class="focus-line"></div>
        </div>
      </div>
    </div>

    <div
      class="column is-12 is-12-mobile is-flex-desktop is-block-mobile is-justify-content-space-between p-5"
    >
      <div class="column is-5 is-12-mobile has-text-left py-3">
        <!-- FIRSTNAME -->
        <label class="column is-12 letter-spacing-1 color-text-white"
          >Nombre</label
        >
        <div class="column is-12 is-relative">
          <input
            type="text"
            v-model="form.firstname"
            class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow color-text-white"
            placeholder="Ingresa su nuevo nombre"
          />
          <div class="focus-line"></div>
        </div>
      </div>

      <div class="column is-5 is-12-mobile has-text-left py-3">
        <!-- LASTNAME -->
        <label class="column is-12 letter-spacing-1 color-text-white"
          >Apellido</label
        >
        <div class="column is-12 is-relative">
          <input
            type="text"
            v-model="form.lastname"
            class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow color-text-white"
            placeholder="Ingrese su nuevo apellido"
          />
          <div class="focus-line"></div>
        </div>
      </div>
    </div>

    <div
      class="column is-12 is-flex-desktop is-justify-content-space-between px-5"
    >
      <div class="column is-5-desktop is-12-mobile is-5-tablet class-profile">
        <!-- STATE -->
        <label
          for="city"
          class="column is-12 letter-spacing-1 color-text-white has-text-left"
          >Estado</label
        >
        <div class="column is-12 is-12-mobile mt-2 mb-2 select">
          <select
            class="pr-6 control w-100 pl-3 select-profile color-text-white"
            @change="selectState($event)"
          >
            <option
              v-for="item in states"
              :key="item.id"
              :value="item.id"
              :selected="item.id === form.state"
              >{{ item.name }}</option
            >
          </select>
        </div>
      </div>
      <div class="column is-5 is-12-mobile has-text-left py-3">
        <!-- PHONE -->
        <label class="column is-12 letter-spacing-1 color-text-white"
          >Cedula</label
        >
        <div class="column is-12 is-relative">
          <input
            type="text"
            v-model="form.dni"
            class=" pt-4 pb-1 has-text-weight-light is-size-6 input-border-yellow color-text-white"
            placeholder="Ejemplo: 26797112"
          />
          <div class="focus-line"></div>
        </div>
      </div>
    </div>

    <div
      class="column is-12 is-flex-desktop is-justify-content-space-between px-5"
    >
      <div class="column is-12-mobile is-5-desktop is-5-tablet"></div>
      <div class="column is-12-mobile is-5-desktop is-5-tablet">
        <button
          @click="changeData()"
          :disabled="disabled"
          class="column mt-2 is-12 is-12-mobile button btn-profile gradient-button-white text-dark p-0 "
        >
          Actualizar datos
        </button>
      </div>
    </div>

    <!-- ADDRESS -->
    <div v-if="auth.role === 'customer'">
      <h2 class="is-size-4 is-size-4-mobile color-text-white mt-6">
        Mis direcciones
      </h2>

      <div class="column is-12 is-12-mobile is-flex px-5 is-align-items-center">
        <div class="column is-5-desktop is-12-mobile class-profile">
          <!-- ADDRESS -->
          <label
            for="email"
            class="column is-12 letter-spacing-1 color-text-white has-text-left"
            >Mis direcciones registradas</label
          >
          <div
            class="column control has-icons-left is-12 select-address-check is-flex is-align-items-center"
          >
            <div
              class="column is-12 is-12-mobile mt-2 mb-2 select is-flex is-justify-content-center is-align-items-center"
            >
              <select
                class="pr-6 control w-100 pl-3 pl-icon select-profile color-text-white"
                @change="select($event)"
              >
                <option value="0" selected>Seleccione</option>
                <option
                  v-for="item in addresses"
                  :key="item.address_id"
                  :value="item.address_id"
                  >{{ item.address }}</option
                >
              </select>

              <span class="icon is-left">
                <i class="color-text-gray bi bi-geo-alt"></i>
              </span>
            </div>
          </div>
        </div>
        <div>
          <span
            v-if="form.item.address_id"
            @click="isModal = true"
            :disabled="disabled"
            class="ml-4 border-red is-3 is-3-mobile mx-2 px-2 p-0 cursor-pointer non-selectable"
          >
            {{ isMobile ? 'Info' : 'Ver información detallada' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./profile.ts" />
<style lang="scss" src="./profile.scss" />
