<template>
  <div
    id="modal-banks-admin"
    class="modal modal-products modal-form-bank is-active"
  >
    <div class="modal-background"></div>
    <div class="column is-8 is-12-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title text-dark text-monserrat">
          {{ item.bank_id ? 'Actualizar banco' : 'Agregar un nuevo banco' }}
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section
        id="section-form-banks"
        @scroll="event($event)"
        class="modal-card-body p-4  class-bank is-relative"
      >
        <div class="card-content pl-4 pr-4 py-4">
          <span class="color-red"
            >Rellene todos los campos que sean requeridos (*)</span
          >
          <div
            class="column is-12 mt-1 is-flex is-justify-content-center is-align-items-center text-dark text-monserrat"
          >
            <div class="column is-3-desktop is-5-mobile is-size-7-mobile">
              <label class="label is-size-7-mobile  text-dark text-monserrat"
                >Nombre del banco <span class="color-yellow">*</span></label
              >
            </div>
            <div class="column is-is-9-desktop is-8-mobile">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <AutocompleteComponent
                    @autocompleteText="getText"
                    :items="bankNames"
                    icon="fas fa-university"
                    placeholder="Ingrese el nombre del banco"
                  ></AutocompleteComponent>
                </p>
              </div>
            </div>
          </div>

          <div
            class="column is-12 my-2 is-flex is-justify-content-center is-align-items-center"
          >
            <div class="column is-3-desktop is-5-mobile is-size-7-mobile">
              <label class="label is-size-7-mobile text-monserrat">Número de cuenta</label>
            </div>
            <div class="column is-is-9-desktop is-8-mobile">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input
                    v-model="form.account_number"
                    class="input is-size-7-mobile"
                    type="text"
                    placeholder="Ejemplo: 0108 00 0000000000000000"
                  />
                  <span class="icon is-small is-left is-size-7-mobile">
                    <i class="bi bi-cash-coin"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            class="field is-horizontal is-flex is-justify-content-center is-align-items-center"
          >
            <div class="column is-3-desktop is-5-mobile is-size-7-mobile">
              <label class="label is-size-7-mobile text-monserrat">Correo electrónico</label>
            </div>
            <div class="column is-is-9-desktop is-8-mobile">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input
                    v-model="form.email"
                    class="input is-size-7-mobile"
                    type="email"
                    placeholder="Ingrese el correo electrónico"
                  />
                  <span class="icon is-small is-left is-size-7-mobile">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div
            class="field is-horizontal is-flex is-justify-content-center is-align-items-center"
          >
            <div class="column is-3-desktop is-5-mobile is-size-7-mobile">
              <label class="label is-size-7-mobile text-monserrat">Titular</label>
            </div>
            <div class="column is-is-9-desktop is-8-mobile">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    v-model="form.owner"
                    class="input is-size-7-mobile"
                    type="text"
                    placeholder="Nombre y Apellido"
                  />
                </p>
              </div>
            </div>
          </div>

          <div
            class="field is-horizontal is-flex is-justify-content-center is-align-items-center"
          >
            <div class="column is-3-desktop is-5-mobile is-size-7-mobile">
              <label class="label is-size-7-mobile text-monserrat">RIF/DNI</label>
            </div>
            <div class="column is-is-9-desktop is-8-mobile">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    v-model="form.dni"
                    class="input is-size-7-mobile"
                    type="text"
                    placeholder="Ingrese el número de identificación (J-00000000)"
                  />
                </p>
              </div>
            </div>
          </div>

          <div
            class="column is-12 is-horizontal is-flex is-justify-content-center is-align-items-center"
          >
            <div class="column is-3-desktop is-5-mobile">
              <label class="label is-size-7-mobile text-monserrat">Número de teléfono</label>
            </div>
            <div class="column is-is-9-desktop is-8-mobile">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input
                    v-model="form.phone"
                    class="input is-size-7-mobile"
                    type="text"
                    placeholder="Ejemplo 0412 550 0000"
                  />
                  <span class="icon is-small is-left is-size-7-mobile">
                    <i class="bi bi-telephone-fill"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div
            class="field is-flex is-justify-content-center is-align-items-center  has-text-left"
          >
            <div class="column is-3-desktop is-5-mobile is-size-7-mobile">
              <label class="label is-size-7-mobile text-monserrat"
                >Tipo de transferencia <span class="color-red">*</span></label
              >
            </div>
            <div class="column is-is-9-desktop is-8-mobile">
              <div class="is-narrow">
                <div class="control">
                  <label class="radio is-size-7-mobile text-monserrat">
                    <input
                      class="text-monserrat"
                      v-model="form.type"
                      value="BS"
                      type="radio"
                      name="type"
                    />
                    En Bolívares (Bs)
                  </label>
                  <label class="radio is-size-7-mobile text-monserrat">
                    <input
                      class="text-monserrat"
                      v-model="form.type"
                      type="radio"
                      value="USD"
                      name="type"
                    />
                    En Dólares (USD)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span
          v-if="arrowVisible"
          @click="arrow"
          class="bi bi-arrow-down-circle-fill color-red cursor-pointer arrow-banks is-size-3"
        ></span>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-center py-2">
        <button
          :disabled="disabled"
          @click="action"
          class="button column is-3 is-8-mobile background-yellow text-dark text-monserrat"
        >
          {{ item.bank_id ? 'Actualizar' : 'Agregar' }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./form.ts" />
<style lang="scss" src="./form.scss" />
