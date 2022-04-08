<template>
  <div id="modal-products-admin" class="modal modal-products is-active">
    <div class="modal-background"></div>
    <div class="column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title text-dark text-monserrat">
          Cambiar estado de la orden
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body p-4">
        <!-- FORM -->
        <form @submit.prevent="">
          <div class="column is-12">
            <!-- status -->
            <div
              class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center py-2 select-red"
            >
              <span class="column control is-4 has-text-left text-monserrat">Estado</span>
              <div class="select control pr-1 column is-8 is-size-12-mobile">
                <select
                  class="pr-6 control w-100 pl-3 text-monserrat"
                  @change="change($event)"
                >
                  <option
                    class="text-monserrat"
                    v-for="row in statuses"
                    v-show="row !== 'canceled' && row !== 'added_payment'"
                    :key="row"
                    :value="row"
                    :selected="item.status === row"
                    >{{ returnStatus(row) }}</option
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
          @click="changeStatus"
          class="button column is-3 is-4-tablet is-8-mobile background-yellow text-dark text-monserrat"
        >
          Cambiar estado
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./modal.ts" />
