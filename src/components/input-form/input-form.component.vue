<template>
  <div class="control div-input-form has-icons-left has-icons-right">
    <input
      v-model="value"
      :class="[
        classArray,
        iconLeft ? 'pl-icon' : '',
        classIcon ? 'pr-icon' : ''
      ]"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-on:keyup="emitValue"
      class="input-form-class"
    />
    <span @click="changeType" class="icon is-right z-index">
      <i :id="'icon-' + id" :class="classIcon"></i>
    </span>
    <span class="icon is-left z-index">
      <i :id="'icon-' + id" :class="iconLeft"></i>
    </span>
  </div>
</template>

<script src="./input-form.component.ts" />
<style lang="scss" src="./input-form.component.scss" />
