<template>
  <Modal v-if="isVisible" :item="{}" v-on:dismissForm="dismissForm"></Modal>
  <!-- TITLE -->
  <div class="check-title">
    <h4
      class="has-text-weight-bold is-size-4 is-size-5-mobile p-4 color-text-dark-gray"
    >
      Dirección de entrega
    </h4>
  </div>
  <!-- FORM -->
  <div>
    <h4
      class="column is-12 is-size-7-mobile is-flex has-text-centered color-red pb-1 px-3"
    >
      Para registrar una nueva dirección sólo rellene los datos del formulario y
      presione en agregar una nueva o seleccione una ya registrada
    </h4>
    <div class="columns is-12 pt-3 pl-6 pr-6 ">
      <div
        class="column control is-12 is-flex-desktop is-flex-tablet is-block-mobile is-is-justify-content-center is-align-items-center select-address-check"
      >
        <span class="column control is-3 p-4 has-text-left"
          >Escoger dirección</span
        >
        <div class="select control pr-1 column is-6">
          <select class="pr-6 control w-100 pl-3" @change="select($event)">
            <option value="Seleccione">Seleccione</option>
            <option
              v-for="row in addresses"
              :key="row.address_id"
              :value="row.address_id"
              :selected="row.address_id === addressId"
              >{{ row.address }}</option
            >
          </select>
        </div>
      </div>
    </div>
    <button @click="isVisible = true" class="button btn-address">
      <span class="icon is-small color-red">
        <i class="fas fa-plus"></i>
      </span>
      <span>Agregar una nueva</span>
    </button>
  </div>
</template>

<script src="./address.ts" />
<style lang="scss" src="./address.scss" />
