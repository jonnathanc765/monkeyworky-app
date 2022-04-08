<template>
  <div id="modal-products-admin" class="modal modal-products is-active">
    <div class="modal-background"></div>
    <div class="column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title text-dark text-monserrat">
          {{
            item.name
              ? 'Actualizar sub categoría'
              : 'Agregar sub categoría'
          }}
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body p-4">
        <!-- FORM -->
        <form @submit.prevent="">
          <div class="column is-12">
            <!-- NAME -->
            <div
              class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center py-2"
            >
              <span class="column is-4 has-text-left text-dark text-monserrat">Nombre</span>
              <input
                v-model="form.name"
                class="input-border-yellow"
                type="text"
              />
            </div>

            <!-- CATEGORY -->

            <div
              class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center py-2 select-red"
            >
              <span class="column control is-4 has-text-left text-monserrat">Categoría</span>
              <div class="select input-border-yellow">
                <select
                  class="pr-6 control w-100 pl-3 input-border-yellow"
                  @change="changeCategory($event)"
                >
                  <option value="Seleccione" :selected="form.category === ''"
                    >Seleccione</option
                  >
                  <option
                    v-for="row in categories"
                    :key="row.id"
                    :value="row.id"
                    :selected="
                      item.category ? item.category.id === row.id : false
                    "
                    >{{ row.name }}</option
                  >
                </select>
              </div>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-center py-2">
        <button
          :disabled="disabled"
          @click="action"
          class="button column is-3 is-8-mobile background-yellow text-dark"
        >
          {{ item.name ? 'Actualizar' : 'Agregar' }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./form.ts" />
