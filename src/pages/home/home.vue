<template>
  <div class="div-home">
    <ModalProductInfo
        v-if="isModalInfo"
        :item="item"
        v-on:dismiss="isModalInfo = false"
    ></ModalProductInfo>

     <ModalSubCategory
        v-if="isCategoryInfo"
        :itemCategory="itemCategory"
        v-on:headerSubCategory="selectSubcategory"
        v-on:dismiss="isCategoryInfo = false"
    ></ModalSubCategory>
    

    <ModalProducts :item="item"></ModalProducts>
    <!-- <b-icon-shop /> -->
    <!-- BANNER AND CATEGORIES -->
    <div class="class-header gradient-gray background-monkeys mb-6">
      <!-- CATEGORIES -->
      <div class="category column is-12" style="max-width: 800px; margin:auto;" id="myCategory">
        <ul class="category-scrollbar pt-2 m-auto">
          <CategoriesComponent
            v-for="(item, index) in categories"
            :key="index"
            :item="item"
            v-on:headerCategory="filterCategory(item.id)"
            v-on:headerSubCategory="selectSubcategory"
            v-on:openCategory="openCategory"
          ></CategoriesComponent>
        </ul>
      </div>
      <!-- BANNER -->
      <div class="column is-full-desktop is-hidden-mobile">
        <BannerComponent></BannerComponent>
      </div>
      <!-- CARD INFORMATION -->
      <div class="column is-12 is-hidden-mobile">
        <CardComponent
          v-for="(item, index) in cardInformation"
          :key="item.id"
          :item="item"
          :end="cardInformation.length"
          :index="index"
          
          class="is-align-items-center is-inline-block"
        ></CardComponent>
      </div>
    </div>

    <!-- PRODUCTS -->

    <SpinnerComponent
      :isFull="false"
      :isActive="isActive"
      :text="'Cargando productos'"
      class="py-6"
    ></SpinnerComponent>
    <div ref="myEl" id="div-products" class="column is-4 products-father mt-2">
      <h2
        v-if="products.length === 0 && !isActive"
        class="p-6 is-size-3 color-black text-monserrat"
      >
        No se encontraron productos para mostrar
      </h2>
      <CardProductsComponent
        v-for="item in products"
        :key="item.id"
        :item="item"
        v-on:getItem="getData"
        v-on:openInfo="openInfo"
        :isLoading="isActive"
        class="is-inline-flex m-2 mt-4 mb-4 is-align-items-center"
      >
      </CardProductsComponent>
    </div>
    <Pagination
      v-on:actionPagination="actionPagination"
      v-if="products.length > 0"
      :pages="pagination.meta.last_page"
    ></Pagination>
  </div>
</template>

<script src="./home.ts" />
<style lang="scss" src="./home.scss" />
