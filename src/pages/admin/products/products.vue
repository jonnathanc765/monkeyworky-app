<template>
<div class="background-monkeys gradient-gray">
  <Form
    v-if="modal"
    :item="item"
    :categories="categories"
    v-on:dismissForm="dismissForm"
  ></Form>
  <!-- FILTER -->
  <div
    class="column is-12 is-flex is-justify-content-center is-align-items-center px-4 py-5"
  >
    <!-- INPUT -->
    <div
      class="column control is-4 is-5-tablet is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
    >
      <span class="column is-3 has-text-left color-text-white">Buscar por</span>
      <input
        v-on:input="searchProduct"
        v-model="filter.name"
        class="input column is-9 is-normal"
        placeholder="Buscar por cualquier nombre"
        type="text"
      />
    </div>

    <!-- SELECT CATEGORY -->
    <div
      class="column control is-4 is-5-tablet is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center class-products pl-2"
    >
      <span class="column is-3 has-text-left color-text-white">Categoría</span>
      <div class="select control pr-1 column is-6">
        <select
          class="pr-6 control w-100 pl-3"
          @change="searchCategory($event)"
        >
          <option value="all" selected>Todos</option>
          <option v-for="item in categories" :value="item.id" :key="item.id">
            {{ item.name }}</option
          >
        </select>
      </div>
    </div>
  </div>

  <!-- INFO -->
  <div
    class="column is-12 is-flex is-justify-content-center is-align-items-center px-4 pt-4 mb-6"
  >
    <h3
      class="column is-4 is-5-tablet is-6-mobile color-text-dark-gray is-size-5 is-size-6-mobile color-text-white text-monserrat"
    >
      {{ textView }}
    </h3>

    <span  @click="addProduct" class="is-flex is-justify-content-center is-align-items-center cursor-pointer color-text-white text-monserrat">Agregar producto<ButtonAdmin></ButtonAdmin></span>
  </div>

  <!-- LIST PRODUCTS -->

  <SpinnerComponent
    :isFull="false"
    :isActive="isActive"
    :text="'Cargando productos'"
  ></SpinnerComponent>
  <div class="column is-full-desktop is-full-mobile products-father">
    <h2
      v-if="products.length === 0 && !isActive"
      class="p-6 is-size-3 has-text-white text-monserrat"
    >
      No se encontraron productos para mostrar
    </h2>
    <CardProductsComponent
      v-for="(item, index) in products"
      :key="index"
      :item="item"
      :isLoading="isActive"
      v-on:editProduct="editProduct"
      class="is-inline-flex m-2 mt-4 mb-4 is-align-items-center"
    >
    </CardProductsComponent>
  </div>
  <Pagination
    v-if="products.length > 0"
    v-on:actionPagination="actionPagination"
    :pages="pagination.meta.last_page"
  ></Pagination>
</div>
</template>

<script src="./products.ts" />
<style lang="scss" src="./products.scss" />
