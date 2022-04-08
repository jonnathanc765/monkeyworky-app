<template>
  <Modal :id="itemId" :amount="itemValue"></Modal>
  <ModalChange
    v-if="isChange"
    :item="row"
    v-on:dismissForm="isChange = false"
  ></ModalChange>
  <div class="gradient-gray background-monkeys">
    <div
      class="py-6 text-monserrat text-bold"
      style="
          flex-direction: column;
          min-height: 100vh;
        "
    >
      <h1
        class="has-text-white pb-6 class-margin text-monserrat text-bold"
        style="font-size: 30px !important;"
      >
        <b class="text-monserrat">{{ title }}</b>
      </h1>

      <div class="is-flex is-justify-content-center is-align-items-center">
        <div
          class="column is-10-widescreen is-10-desktop is-10-tablet is-11-mobile card"
        >
          <div class="card-content has-background-white">
            <div class="table-container pt-5 gradient-gray">
              <!-- FILTER -->
              <div
                v-show="route.name !== 'registerPayment' && isActive"
                class="column control is-12 is-flex is-justify-content-center is-align-items-center class-products pb-5 "
              >
                <span class="column is-4 has-text-left has-text-white text-monserrat">Buscar por</span>
                <div class="select control pr-1 column is-4">
                  <select
                    class="pr-6 control w-100 pl-3 text-monserrat"
                    @change="selectStats($event)"
                  >
                    <option value="all" selected>Todos</option>
                    <option
                      v-for="item in filterStatus"
                      :key="item"
                      :value="item"
                      >{{ caseStatus(item) }}</option
                    >
                  </select>
                </div>
              </div>

              <!-- SPINNER -->
              <SpinnerComponent
                :isFull="false"
                :isActive="isActive"
                :text="'Cargando listado'"
                class="py-6"
              ></SpinnerComponent>

              <h1
                v-if="orders.length === 0 && !isActive"
                class="is-size-5 color-red is-size-5-mobile py-4 text-monserrat text-bold"
              >
                {{
                  route.name === 'registerPayment' || modal
                    ? 'No tienes ningún pago por registrar'
                    : 'No hay datos que mostrar'
                }}
              </h1>
              <table
                v-show="orders.length > 0 && !isActive"
                class="table is-fullwidth"
              >
                <thead>
                  <tr class="gradient-gray">
                    <th class="pt-5 pb-5 has-text-white text-monserrat" style="min-width: 80px"></th>
                    <th class="pt-5 pb-5 has-text-white text-monserrat" style="min-width: 200px">Estatus</th>
                    <th class="pt-5 pb-5 has-text-white text-monserrat" style="min-widht: 100px">Número</th>
                    <th class="pt-5 pb-5 has-text-white text-monserrat" style="min-widht: 130px">Fecha</th>
                    <th class="pt-5 pb-5 has-text-white text-monserrat">Método de pago</th>
                    <th class="pt-5 pb-5 has-text-white text-monserrat" style="min-widht: 150px">Tipo de envío</th>
                    <th class="pt-5 pb-5 has-text-white text-monserrat" style="min-widht: 130px">Monto</th>
                    <th class="pt-5 pb-5 has-text-white text-monserrat" style="min-width: 50px"></th>
                    <th class="pt-5 pb-5 has-text-white text-monserrat" style="min-width: 50px"></th>
                  </tr>
                </thead>
                <tbody class="color-gray">
                  <tr
                    v-for="item in orders"
                    :key="item.id"
                    v-show="
                      route.name === 'mySales' ||
                        modal ||
                        (route.name === 'registerPayment' &&
                          item.status === 'pending_for_payment')
                    "
                    class=""
                  >
                    <td class="py-5 " style="min-width: 80px">
                      <router-link
                        v-if="auth.role === 'customer'"
                        :to="'/tracking/' + item.id"
                        class="p-0"
                        style="border: none; cursor: pointer"
                      >
                        <img
                          :src="
                            `${$env.url}/storage/icons-sky/icons/tracking-de-pedidos.png`
                          "
                          alt=""
                          style="width: 35px; height: auto"
                        />
                      </router-link>
                      <span
                        v-if="auth.role === 'admin'"
                        class="border-blue mx-2 px-2 cursor-pointer non-selectable"
                        @click="
                          isChange = true
                          row = item;
                        "
                        >Cambiar</span
                      >
                    </td>
                    <td class="py-5 is-600" style="min-width: 200px">
                      <span
                        @click="
                          item.status === 'pending_for_payment' &&
                          auth.role === 'customer'
                            ? openModal(item.id, $round(item.total))
                            : ''
                        "
                        class="border-red non-selectable px-1"
                        :class="
                          item.status === 'pending_for_payment' &&
                          auth.role === 'customer'
                            ? 'cursor-pointer'
                            : ''
                        "
                        >{{ caseStatus(item.status) }}</span
                      >
                    </td>
                    <td class="py-5 is-600" style="min-width: 130px">
                      {{ item.id }}
                    </td>
                    <td class="py-5 is-600" style="min-width: 110px">
                      {{ dateParse(item.created_at) }}
                    </td>
                    <td class="py-5 is-600" style="min-width: 150px">
                      {{
                        item.payment
                          ? item.payment === 'USD'
                            ? 'Pago en dólares'
                            : 'Pago en bolivares'
                          : 'No pagado'
                      }}
                    </td>
                    <td class="py-5 is-600" style="min-width: 150px">
                      {{ item.type }}
                    </td>
                    <td class="py-5 is-600">${{ $round(item.total) }}</td>
                    <td class="py-5 is-600">
                      <router-link
                        :to="'/order/' + item.id"
                        class="p-0"
                        style="border: none; cursor: pointer"
                      >
                        <img
                          :src="
                            `${$env.url}/storage/icons-sky/icons/ver-detalles.png`
                          "
                          alt=""
                          style="width: 35px; height: auto"
                        />
                      </router-link>
                    </td>
                    <td class="py-5 is-600" style="min-width: 130px">
                      <span
                        class="mr-2"
                        :class="
                          item.status === 'pending_for_payment' ||
                          item.status === 'refused' ||
                          item.status === 'canceled'
                            ? 'border-red'
                            : item.status !== 'pending_for_payment' &&
                              item.status !== 'refused' &&
                              item.status !== 'canceled' &&
                              item.status !== 'order_delivered'
                            ? 'border-orange'
                            : item.status === 'order_delivered'
                            ? 'border-green'
                            : ''
                        "
                        >{{
                          item.status === 'pending_for_payment' ||
                          item.status === 'refused' ||
                          item.status === 'canceled'
                            ? 'Completar'
                            : item.status !== 'pending_for_payment' &&
                              item.status !== 'refused' &&
                              item.status !== 'canceled' &&
                              item.status !== 'order_delivered'
                            ? 'En curso'
                            : item.status === 'order_delivered'
                            ? 'Finalizado'
                            : ''
                        }}</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer">
            <Pagination
              v-on:actionPagination="actionPagination"
              v-if="orders.length > 0"
              v-show="!isActive"
              :pages="pagination.meta.last_page"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./my-sales.ts" />
<style lang="scss" src="./my-sales.scss" />
