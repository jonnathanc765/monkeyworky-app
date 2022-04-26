<template>
  <Form v-if="modal" :item="item" v-on:dismissForm="dismissForm"></Form>

  <div class="background-monkeys gradient-gray">
    <div class="container">
      <div
        class="py-6"
        style="
          flex-direction: column;
          min-height: 100vh;
        "
      >
        <h2
          class="has-text-white pb-6 class-margin text-monserrat text-bold"
          style="font-size: 30px !important"
        >
          <b>Mis categorías</b>
        </h2>
        <div class="column is-11 has-text-right">
          
        </div>
        <div class="is-flex is-justify-content-center is-align-items-center">
          <div
            class="column is-10-widescreen is-10-desktop is-10-tablet is-11-mobile card"
          >
            <div class="card-header background-yellow is-block py-2">
              <h6
                class=" is-flex"
              >
                <button
                  @click="add"
                  class=" is-flex is-align-items-center "
                  style="
                  font-size: 100%;
                  border: none;
                  background: none;
                  padding: 5px 10px 5px 10px !important;
                  cursor: pointer;
                "
                >
                  <span class="text-dark text-monserrat" style="margin-right:10px !important">Agregar categoría</span><ButtonAdmin @click="add"></ButtonAdmin>
                </button>
              </h6>
            </div>
            <div class="card-content has-background-white">
              <div class="table-container">
                <h2
                  v-if="categories.length === 0"
                  class="p-6 is-size-3 text-dark text-monserrat"
                >
                  No se encontraron categorías registradas
                </h2>
                <table v-if="categories.length > 0" class="table is-fullwidth">
                  <thead>
                    <tr class="gradient-gray">
                      <th class="py-5 has-text-white text-monserrat" style="min-width: 150px">
                        Categoría
                      </th>
                       <th class="py-5 has-text-white text-monserrat" style="min-width: 150px">
                        Icono
                      </th>
                      <th class="py-5 has-text-white text-monserrat" style="min-width: 200px">Acciones</th>
                    </tr>
                  </thead>
                  <tbody class="color-gray">
                    <tr v-for="row in categories" :key="row.id">
                      <td
                        class="py-5 is-600 is-uppercase text-monserrat"
                        style="min-width: 150px"
                      >
                        {{ row.name }}
                      </td>
                      <td
                        class="py-5 is-600 is-uppercase"
                      >
                        <img :src="`${$env.url}/storage/${row.picture}`" style="max-width:100px !important">
                      </td>
                      <td class="py-5 is-600" style="min-width: 180px is-flex">
                        <button
                          @click="deleteCategory(row)"
                          :disabled="disabled"
                          class="button background-outside has-text-white is-align-self-stretch p-2 mr-4"
                        >
                          <span class="bi bi-trash is-size-5"></span>
                        </button>
                        <button
                          @click="openEdit(row)"
                          class="button background-update has-text-white is-align-self-stretch p-2"
                        >
                          <span class="bi bi-pencil is-size-5"></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./categories.ts" />
