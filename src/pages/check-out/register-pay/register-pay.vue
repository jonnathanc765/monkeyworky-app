<template>
  <!-- TITLE -->
  <div v-if="!isModal" class="check-title">
    <h4
      class="has-text-weight-bold is-size-4 is-size-5-mobile p-4 color-text-dark-gray"
    >
      Registro de pago
    </h4>
  </div>

  <form @submit.prevent="" enctype="multipart/form-data">
    <div class="px-4">
      <h4
        class="has-text-left ml-6 pl-3 has-text-weight-bold is-size-6 is-size-7-mobile color-red"
      >
        Selecciona el método de pago que prefieras y efectúa el pago, a
        continuación rellena los datos solicitados. (*) son campos requerido.
      </h4>

      <!-- BANK DESTINATION -->
      <div class="columns is-12 pl-6 mt-4 pr-6 ">
        <div
          class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
        >
          <span class="column control is-4 p-4 has-text-left"
            >Banco de destino <span class="color-red">*</span></span
          >
          <div class="select control pr-1 column is-8 is-size-12-mobile">
            <select
              :class="
                registerPay.bankOrigin === '' && truncate ? 'input-empty' : ''
              "
              @change="select($event)"
              class="pr-6 control w-100 pl-3"
            >
              <option value="Seleccione" selected>Seleccione</option>
              <option
                v-for="item in banks"
                :key="item.bank_id"
                :value="item.bank_id"
                >{{ `${item.name} (${item.owner})` }}</option
              >
            </select>
          </div>
        </div>
      </div>

      <!-- BANK ORIGIN -->
      <div class="columns is-12 pl-6 pr-6 ">
        <div
          class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
        >
          <span class="column control is-4 p-4 has-text-left"
            >Banco de origen <span class="color-red">*</span></span
          >
          <div class="select control pr-1 column is-8 is-size-12-mobile">
            <select
              :class="
                registerPay.bankDestination === '' && truncate
                  ? 'input-empty'
                  : ''
              "
              @change="selectDestination($event)"
              class="pr-6 control w-100 pl-3"
            >
              <option
                v-for="item in isBs ? bankDestinationBs : banksDestination"
                :key="item"
                :value="item"
                >{{ item }}</option
              >
            </select>
          </div>
        </div>
      </div>

      <div class="columns is-12 pl-6 pr-6 ">
        <div
          class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
        >
          <span class="column is-4 p-4 has-text-left"
            >Titular de la cuenta <span class="color-red">*</span></span
          >
          <input
            v-model="registerPay.name"
            v-on:input="addForm"
            class="input column is-8 is-size-12-mobile is-normal background-gray-placeholder"
            :class="registerPay.name === '' && truncate ? 'input-empty' : ''"
            type="text"
          />
        </div>
      </div>

      <div class="columns is-12 pl-6 pr-6 ">
        <div
          class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
        >
          <span class="column is-4 p-4 has-text-left"
            >Correo de la cuenta <span class="color-red">*</span></span
          >
          <input
            v-model="registerPay.email"
            v-on:input="addForm"
            :class="registerPay.email === '' && truncate ? 'input-empty' : ''"
            class="input column is-8 is-size-12-mobile is-normal background-gray-placeholder"
            type="email"
          />
        </div>
      </div>

      <div class="columns is-12 pl-6 pr-6 ">
        <div
          class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
        >
          <span class="column is-4 p-4 has-text-left"
            >Monto de la transacción</span
          >
          <input
            class="input column is-8 is-size-12-mobile is-normal background-gray-placeholder"
            type="value"
            :value="`$${total}`"
            disabled
          />
        </div>
      </div>

      <div class="columns is-12 pl-6 pr-6 ">
        <div
          class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
        >
          <span class="column is-4 p-4 has-text-left"
            >Fecha de la transacción <span class="color-red">*</span></span
          >
          <input
            v-model="registerPay.date"
            v-on:input="addForm"
            :class="registerPay.date === '' && truncate ? 'input-empty' : ''"
            class="input column is-8 is-size-12-mobile is-normal background-gray-placeholder"
            type="date"
          />
        </div>
      </div>

      <!-- REFERENCE -->
      <div class="columns is-12 pl-6 pr-6 mb-4">
        <div
          class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
        >
          <span class="column is-4 p-4 has-text-left"
            >Número de transacción</span
          >
          <input
            v-model="registerPay.reference"
            v-on:input="addForm"
            class="input column is-8 is-size-12-mobile is-normal background-gray-placeholder"
            type="number"
          />
        </div>
      </div>
      <span v-if="registerPay.image !== ''" class="is-size-7">
        <i class="bi bi-check-lg"></i>
        El comprobante se subió satisfactoriamente
      </span>

      <div class="columns is-12 pl-6 pr-6 mb-4">
        <div
          class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center"
        >
          <div class="file m-auto is-justify-content-center">
            <label class="file-label">
              <input
                @change="getImage"
                class="file-input background-yelllow text-white text-monserrat text-dark"
                type="file"
                accept="image/*"
                name="resume"
              />
              <span class="file-cta background-yellow text-white text-monserrat text-dark">
                <span class="file-label px-4">
                  Comprobante de pago *
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script src="./register-pay.ts" />
