<template>
  <div id="modal-address" class="modal modal-products modal-phone is-active">
    <div class="modal-background"></div>
    <div class="column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title text-black">
          Agregar número de teléfono
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section id="section-address" class="modal-card-body p-4 is-relative">
        <!-- FORM -->
        <!-- PHONE -->
        <div class="px-2">
          <span class="column is-3 py-2 has-text-left"
            >Teléfono <span class="color-red">*</span></span
          >
          <div
            class="control column is-12 has-icons-left is-flex is-align-items-center is-justify-content-center"
          >
          
            <span class="icon is-small is-left color-text-gray">
              <i class="bi bi-telephone"></i>
            </span>
            <input
              class="input-border-yellow pl-address p-3"
              type="text"
              v-model="phone"
              placeholder="Ejemplo 0412 550 0000"
            />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-center py-2">
        <button
          :disabled="disabled"
          :class="disabled ? 'is-loading' : ''"
          @click="save"
          class="button column is-3 is-8-mobile background-yellow text-black"
        >
          Agregar
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./modal.ts" />
