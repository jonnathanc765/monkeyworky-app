<template>
  <div
    id="drop-autocomplete"
    :class="textInput !== '' && isVisible ? 'is-active' : ''"
    class="dropdown is-centered column is-12"
  >
    <div class="dropdown-trigger">
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              v-on:input="changeText"
              v-model="textInput"
              class="input is-size-7-mobile"
              type="text"
              :placeholder="placeholder"
            />
            <span v-if="icon" class="icon is-small is-left is-size-7-mobile">
              <i :class="icon"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="dropdown-menu " role="menu">
      <div class="dropdown-content column p-0">
        <button
          class="button column has-text-left is-12 p-2 m-2"
          v-for="item in showItems(text)"
          :key="item"
          @click="
          textInput = item
          sendAutocomplete()
          isVisible = false;
          "
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./autocomplete.component.ts" />
<style lang="scss" src="./autocomplete.component.scss" />
