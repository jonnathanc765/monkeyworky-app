<template>
  <div id="modal-address" class="modal modal-products modal-address is-active">
    <div class="modal-background"></div>
    <div class="column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title text-dark text-monserrat">
          {{ !item.address_id ? 'Agregar dirección' : 'Información detallada' }}
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section
        @scroll="eventScroll($event)"
        id="section-address"
        class="modal-card-body p-4 is-relative"
      >
        <!-- FORM -->
        <!-- STATE -->

        <div class="px-2">
          <span class="column is-3 py-2 has-text-left"
            >Estado <span class="color-yellow">*</span></span
          >
          <div class="column control has-icons-left is-12 select-address-check">
            <div class="column is-12 is-size-12-mobile ">
              <select
                @change="changeState($event)"
                class="w-100 pl-3 pl-address input-border-yellow text-monserrat p-3"
              >
                <option
                  v-for="row in item.address_id ? [0] : states"
                  :key="row.id"
                  :value="row.id"
                  :selected="row.id === state"
                  >{{ !item.address_id ? row.name : item.parish.state.name }}
                </option>
              </select>
            </div>

            <span class="icon is-left">
              <button
                class="button"
                :class="
                  isLoadingState && states.length === 0 ? 'is-loading' : ''
                "
              ></button>
              <i
                class="color-text-gray"
                :class="
                  isLoadingState && states.length === 0 ? '' : 'bi bi-geo-alt'
                "
              ></i>
            </span>
          </div>
        </div>

        <!-- MUNICIPALITY -->

        <div class="px-2">
          <span class="column is-3 py-2 has-text-left"
            >Municipio <span class="color-red">*</span></span
          >
          <div class="column control has-icons-left is-12 select-address-check">
            <div class="column is-12 is-size-12-mobile">
              <select
                @change="changeMunicipality($event)"
                class="w-100 pl-3 pl-address input-border-yellow text-monserrat p-3"
              >
                <option
                  v-for="row in item.address_id ? [0] : municipalities"
                  :key="row.id"
                  :value="row.id"
                  >{{
                    !item.address_id ? row.name : item.parish.municipality.name
                  }}</option
                >
              </select>
            </div>
            <span class="icon is-left">
              <button
                class="button"
                :class="isLoadingMun ? 'is-loading' : ''"
              ></button>
              <i
                class="color-text-gray"
                :class="isLoadingMun ? '' : 'bi bi-geo-alt'"
              ></i>
            </span>
          </div>
        </div>

        <!-- PARISH -->

        <div class="px-2">
          <span class="column is-3 py-2 has-text-left"
            >Parroquia <span class="color-red">*</span></span
          >
          <div class="column control has-icons-left is-12 select-address-check">
            <div class="column is-12 is-size-12-mobile">
              <select
                @change="changeParish($event)"
                class="w-100 pl-3 pl-address input-border-yellow text-monserrat p-3"
              >
                <option
                  v-for="row in item.address_id ? [0] : parishes"
                  :key="row.id"
                  :value="row.id"
                  >{{ !item.address_id ? row.name : item.parish.name }}</option
                >
              </select>
            </div>
            <span class="icon is-left">
              <button
                class="button"
                :class="
                  (isLoadingParishes || isLoadingMun) && !item.address_id
                    ? 'is-loading'
                    : ''
                "
              ></button>
              <i
                class="color-text-gray"
                :class="
                  (isLoadingParishes || isLoadingMun) && !item.address_id
                    ? ''
                    : 'bi bi-geo-alt'
                "
              ></i>
            </span>
          </div>
        </div>

        <!-- ADDRESS -->
        <div class="px-2">
          <span class="column is-3 py-2 has-text-left"
            >Dirección <span class="color-red">*</span></span
          >
          <div class="control column is-12 has-icons-left">
            <input
              class="pl-address input-border-yellow text-monserrat p-3"
              type="text"
              v-model="form.address"
              placeholder="Escribe tu dirección"
            />
            <span class="icon is-small is-left color-text-gray">
              <i class="bi bi-geo-alt"></i>
            </span>
          </div>
        </div>

        <!-- COMMENTS -->
        <div class="px-2">
          <span class="column is-12 py-2 has-text-left"
            >Indicaciones de tu dirección <span class="color-red">*</span></span
          >
          <div class="control column is-12">
            <textarea
              v-model="form.comment"
              rows="2"
              class="textarea p-3"
              placeholder="Escribe aquí instrucciones o comentarios de tu dirección"
            ></textarea>
          </div>
        </div>

        <!-- ADDITIONAL -->
        <div class="px-2">
          <span class="column is-12 py-2 has-text-left"
            >Información adicional</span
          >
          <div class="is-flex is-justify-content-space-between">
            <div class="control column is-5 has-icons-left">
              <input
                class="pl-address input-border-yellow text-monserrat p-3"
                v-model="form.type"
                type="text"
                placeholder="Num Piso/Oficina/Apto"
              />
              <span class="icon is-small is-left color-text-gray">
                <i class="bi bi-door-open"></i>
              </span>
            </div>
            <div class="control column is-5 has-icons-left">
              <input
                class="pl-address input-border-yellow text-monserrat p-3"
                v-model="form.name"
                type="text"
                placeholder="Nombre de dirección"
              />
              <span class="icon is-small is-left color-text-gray">
                <i class="bi bi-house-door"></i>
              </span>
            </div>
          </div>
        </div>

        <span
          v-if="arrowVisible"
          @click="arrow"
          class="bi bi-arrow-down-circle-fill color-red cursor-pointer arrow-address is-size-3"
        ></span>
      </section>
      <footer
        v-if="!item.address_id"
        class="modal-card-foot is-flex is-justify-content-center py-2"
      >
        <button
          @click="addAddress"
          id="addAddress"
          :class="disabled ? 'is-loading' : ''"
          class="button column is-3 is-8-mobile background-yellow text-dark text-bold text-monserrat"
        >
          Añadir
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./modal.ts" />
<style lang="scss" src="./modal.scss" />
