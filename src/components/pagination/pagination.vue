<template>
  <nav
    class="pagination is-centered p-5 w-100"
    role="navigation"
    aria-label="pagination"
  >
    <ul class="pagination-list">
      <li>
        <a class="pagination-link is-600" @click="changePage('previus')"
          >Anterior</a
        >
      </li>
      <li v-for="(row, index) in pages" :key="index">
        <a
          class="pagination-link is-600"
          :class="row === pageActive ? 'is-current' : ''"
          @click="row !== pageActive ? changePage('num', row) : ''"
          >{{ row }}</a
        >
      </li>
      <li>
        <a class="pagination-link is-600" @click="changePage('next')"
          >Siguiente</a
        >
      </li>
    </ul>
  </nav>
</template>

<script src="./pagination.ts" />
<style lang="scss" src="./pagination.scss" />
