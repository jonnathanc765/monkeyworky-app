<template>
  <div id="modal-address" class="modal modal-products is-active">
    <div class="modal-background"></div>
    <div class="column column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title has-text-dark">
          Sub categorias
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section id="section-address" class="modal-card-body">
        <button
            v-for="row in itemCategory.subcategories"
            :key="row.id"
            @click="subCategory(row.id)"
            class="dropdown-item column button p-0"
          >
            {{ row.name }}
          </button>
      </section>
    </div>
  </div>
</template>

<script src="./modal-subcategory.ts" />
<style lang="scss" src="./modal-subcategory.scss" />
