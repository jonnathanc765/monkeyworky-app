<template>
  <div id="modal-products-admin" class="modal modal-products is-active">
    <div class="modal-background"></div>
    <div class="column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title text-dark text-monserrat">
          {{
            item.name ? 'Actualizar categoría' : 'Agregar categoría'
          }}
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body p-4">
        <!-- FORM -->
        <form @submit.prevent="" enctype="multipart/form-data">
          <div class="column is-12">
            <!-- NAME -->
            <div
              class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center py-2"
            >
              <span class="column is-4 has-text-left text-monserrat">Nombre</span>
              <input
                v-model="form.name"
                class="input-border-yellow is-normal"
                type="text"
                name="name"
              />
            </div>
            <label
                  class="file-label is-flex is-justify-content-center is-align-items-center"
                >
                  <input
                    class="file-input"
                    type="file"
                    name="picture"
                    @change="getImage"
                    accept="image/*"
                  />
                  <span
                    class="is-flex is-justify-content-center is-align-items-center"
                  >
                    <span class="file-label text-monserrat">
                      Añadir una imagen
                    </span>
                    <span class="file-icon mx-2">
                      <i class="bi bi-image color-red"></i>
                    </span>
                  </span>
              </label>
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
