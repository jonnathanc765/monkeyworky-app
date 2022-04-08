<template>
  <div class="background-monkeys gradient-gray">
    <div
      class="py-6"
      style="
          flex-direction: column;
          min-height: 100vh;
        "
    >
      <h1
        class="has-text-white pb-6 class-margin text-monserrat text-bold"
        style="font-size: 30px !important"
      >
        <b class="text-monserrat text-bold">CLIENTES REGISTRADOS</b>
      </h1>
      <div class="is-flex is-justify-content-center is-align-items-center">
        <div
          class="column is-10-widescreen is-10-desktop is-11-tablet is-11-mobile card"
        >
          <div class="card-header background-yellow is-block py-2">
            <!-- <h6 class="has-text-centered has-text-white">
              Exportar en Excel <i class="excel is-inline-block"></i>
            </h6> -->
          </div>
          <div class="card-content has-background-white">
            <div class="table-container">
              <!-- SPINNER -->
              <SpinnerComponent
                :isFull="false"
                :isActive="isActive"
                :text="'Cargando listado'"
                class="py-6"
              ></SpinnerComponent>

              <h1
                v-if="people.length === 0 && !isActive"
                class="is-size-5 color-red is-size-5-mobile py-4"
              >
                No se encontraron clientes registrados
              </h1>
              <table
                v-if="!isActive && people.length > 0"
                class="table is-fullwidth"
              >
                <thead>
                  <tr class="gradient-gray">
                    <th class="py-5 has-text-white text-monserrat">Fecha</th>
                    <th class="py-5 has-text-white text-monserrat">Nombres y Apellidos</th>
                    <th class="py-5 has-text-white text-monserrat">Correo</th>
                    <th class="py-5 has-text-white text-monserrat">Teléfono</th>
                    <th class="py-5 has-text-white text-monserrat">Ciudad</th>
                    <th class="py-5 has-text-white text-monserrat" style="min-width: 300px">Dirección</th>
                  </tr>
                </thead>
                <tbody class="color-gray">
                  <tr v-for="row in people" :key="row.people_id">
                    <td class="p-5 is-600 text-monserrat" style="white-space: nowrap">
                      {{ dateParse(row.created_at) }}
                    </td>
                    <td class="p-5 is-600 text-monserrat" style="white-space: nowrap">
                      {{ row.firstname }} {{ row.lastname }}
                    </td>
                    <td class="p-5 is-600 text-monserrat">
                      {{ row.email }}
                    </td>
                    <td class="p-5 is-600 text-monserrat" style="white-space: nowrap">
                      {{ row.phone ? row.phone : '' }}
                    </td>
                    <td class="p-5 is-600 text-monserrat">Barquisimeto</td>
                    <td class="p-5 is-600 text-monserrat" style="min-width: 300px">
                      <p class="pb-0">
                        {{ row.address }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer">
            <Pagination
              v-on:actionPagination="actionPagination"
              v-if="people.length > 0"
              v-show="!isActive"
              :pages="pagination.meta.last_page"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./list-users.ts" />
<style lang="scss" src="./list-users.scss" />
