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
          class="has-text-white pb-6 class-margin text-monserrat"
          style="font-size: 30px !important"
        >
          <b class="text-monserrat">MIS BANCOS</b>
        </h2>
        <div class="column is-11 has-text-right">
         
        </div>
        <div class="is-flex is-justify-content-center is-align-items-center">
          <div
            class="column is-10-widescreen is-10-desktop is-10-tablet is-11-mobile card"
          >
            <div class="card-header background-yellow is-block py-2">
              <h6
                class="is-flex text-monserrat"
              >
                <button
                  @click="addBank"
                  class="text-monserrat text-dark is-flex"
                  style="
                  font-size: 100%;
                  border: none;
                  background: none;
                  padding: 5px 10px 5px 10px !important;
                  cursor: pointer;
                  text-align: left !important;
                "
                >
                  <span class="text-monserrat text-bold" style="text-align:left; margin-top: 15px !important;">AGREGAR NUEVO BANCO</span>
                  <ButtonAdmin @click="addBank"></ButtonAdmin>
                </button>
              </h6>
            </div>
            <div class="card-content has-background-white">
              <div class="table-container">
                <SpinnerComponent
                  :isFull="false"
                  :isActive="isActive"
                  :text="'Cargando bancos'"
                  class="p-6"
                ></SpinnerComponent>
                <h2
                  v-if="banks.length === 0 && !isActive"
                  class="p-6 is-size-3 text-monserrat has-text-gray"
                >
                  No se encontraron bancos registrados
                </h2>
                <table
                  v-if="banks.length > 0 && !isActive"
                  class="table is-fullwidth"
                >
                  <thead class="is-size-7">
                    <tr class="gradient-gray">
                      <th class="py-5  has-text-white text-monserrat" style="min-width: 120px">Banco</th>
                      <th class="py-5  has-text-white text-monserrat" style="min-width: 150px">
                        Número de cuenta
                      </th>
                      <th class="py-5  has-text-white text-monserrat" style="min-width: 150px">Titular</th>
                      <th class="py-5  has-text-white text-monserrat" style="min-width: 130px">Correo</th>
                      <th class="py-5  has-text-white text-monserrat " style="min-width: 120px">Teléfono</th>
                      <th class="py-5  has-text-white text-monserrat" style="min-width: 130px">
                        Identificación
                      </th>
                      <th class="py-5  has-text-white text-monserrat" style="min-width: 100px">Moneda</th>
                      <th class="py-5  has-text-white text-monserrat" style="min-width: 100px">Acciones</th>
                    </tr>
                  </thead>
                  <tbody class="color-gray is-size-7">
                    <tr v-for="row in banks" :key="row.id">
                      <td class="py-5 is-600 px-1  text-dark text-monserrat" style="min-width: 130px">
                        {{ row.name }}
                      </td>
                      <td class="py-5 is-600 px-1  text-dark text-monserrat" style="min-width: 150px">
                        {{ row.account_number }}
                      </td>
                      <td class="py-5 is-600 px-1  text-dark text-monserrat" style="min-width: 150px">
                        {{ row.owner }}
                      </td>
                      <td class="py-5 is-600 px-1  text-dark text-monserrat" style="min-width: 130px">
                        {{ row.email }}
                      </td>
                      <td class="py-5 is-600 px-1  text-dark text-monserrat" style="min-width: 120px">
                        {{ row.phone }}
                      </td>
                      <td class="py-5 is-600 px-1  text-dark text-monserrat" style="min-width: 130px">
                        {{ row.dni }}
                      </td>
                      <td class="py-5 is-600 px-1  text-dark text-monserrat" style="min-width: 180px">
                        {{
                          row.type === 'USD'
                            ? 'Transferencia en dólares'
                            : 'Transferencia en bolivares'
                        }}
                      </td>
                      <td class="py-5 is-600 px-1" style="min-width: 180px is-flex">
                        <button
                          @click="deleteBank(row)"
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
            <div class="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./banks.ts" />
<style lang="scss" src="./banks.scss" />
