declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vizuaalog/bulmajs';
declare module '@meforma/vue-copy-to-clipboard';
