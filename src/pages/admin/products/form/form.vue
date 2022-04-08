<template>
  <div id="modal-products-admin" class="modal modal-products is-active">
    <div class="modal-background"></div>
    <div class="column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title has-text-white text-monserrat text-bold">{{(item.name) ? 'Actualizar producto' : 'Agregar un nuevo producto'}}</p>
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
              <span class="column is-4 has-text-left text-monserrat">Nombre del producto</span>
              <input
                v-model="form.name"
                class="input column is-8 is-normal"
                type="text"
              />
            </div>

            <!-- CATEGORY -->

            <div
              class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center py-2 class-products"
            >
              <span class="column control is-4 has-text-left text-monserrat">Categoría</span>
              <div class="select control pr-1 column is-8 is-size-12-mobile">
                <select
                  class="pr-6 control w-100 pl-3"
                  @change="changeCategory($event)"
                >
                  <option value="Seleccione" :selected="reset"
                    >Seleccione</option
                  >
                  <option
                    v-for="row in categories"
                    :key="row.id"
                    :value="row.id"
                    :selected="
                      item.sub_category ? item.sub_category.category.id === row.id : false
                    "
                    >{{ row.name }}</option
                  >
                </select>
              </div>
            </div>

            <!-- SUB CATEGORY -->

            <div
              class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center py-2 class-products"
            >
              <span class="column control is-4 has-text-left"
                >Sub categoría</span
              >
              <div class="select control pr-1 column is-8 is-size-12-mobile">
                <select
                  class="pr-6 control w-100 pl-3"
                  @change="changeSubCategory($event)"
                >
                  <option
                    v-if="subCategories.length === 0 || reset"
                    :selected="reset"
                    >Seleccione una categoría</option
                  >
                  <option
                    v-for="row in subCategories"
                    :key="row.id"
                    :value="row.id"
                    :selected="
                      item.sub_category
                        ? item.sub_category.sub_category_id === row.id
                        : false
                    "
                    >{{ row.name }}</option
                  >
                </select>
              </div>
            </div>

            <!-- VARIATIONS -->
            <hr />

            <span class="column control py-2 is-size-5"
              >Variaciones
              <i class="bi bi-bookmark-plus-fill color-red"></i>
            </span>
            <div v-for="(row, index) in form.variations" :key="index">
              <span
                @click="deleteVariation(index)"
                class="column is-12 has-text-right has-text-weight-bold is-size-7 cursor-pointer"
                >Variación #{{ index + 1 }}
                <i
                  v-if="form.variations.length > 1"
                  class="bi bi-x-circle-fill color-red"
                ></i>
              </span>
              <div
                class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center py-2 class-products"
              >
                <!-- SIZE -->

                <span class="column control is-2 has-text-left">Tamaño</span>
                <div class="select control column is-4 is-12-mobile">
                  <select
                    class="pr-6 control w-100 pl-3"
                    @change="changeVariation($event, index)"
                  >
                    <option value="" :selected="reset">Seleccione</option>
                    <option
                      v-for="rowVariation in variations"
                      :key="rowVariation.id"
                      :value="rowVariation.id"
                      :selected="
                        item.variations
                          ? item.variations[index].size_id === rowVariation.id
                          : false
                      "
                      >{{ rowVariation.size }}</option
                    >
                  </select>
                </div>
                <!-- PRICE -->
                <span class="column is-2 class-price-text">Precio</span>
                <input
                  v-model="form.variations[index].price"
                  name="form.variations[].price"
                  class="input column is-4 is-12-mobile is-normal"
                  type="number"
                />
              </div>
            </div>

            <hr class="mt-2" />
            <!-- BUTTONS -->
            <div
              class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center py-2 class-products"
            >
              <span
                @click="addVariation"
                class="column is-6 is-12-mobile has-text-rigth py-2 cursor-pointer"
                >Añadir otra variación
                <i class="bi bi-plus-circle-fill color-red"></i>
              </span>
              <span
                class="column is-6 is-12-mobile has-text-rigth py-2 cursor-pointer"
              >
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
                    <span class="file-label">
                      Añadir una imagen
                    </span>
                    <span class="file-icon mx-2">
                      <i class="bi bi-image color-red"></i>
                    </span>
                  </span>
                </label>
              </span>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-center py-2">
        <button
          id="addProduct"
          @click="addProduct"
          class="button column is-3 is-8-mobile background-yellow text-dark"
        >
          {{ (item.name) ? 'Actualizar' : 'Agregar'}}
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./form.ts" />
<style lang="scss" src="./form.scss" />
