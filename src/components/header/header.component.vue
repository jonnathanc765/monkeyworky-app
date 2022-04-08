<template>
  <div ref="el" class="columns is-12 div-header p-0">
    <!-- LEFT -->
    <div class="column is-3 is-12-mobile p-0" style="height:100%">
      <router-link to="/home" class="is-4 ">
        <img
          :src="`${$env.url}/storage/icons-sky/icons/logo.png`"
          alt="Logo"
          class="column is-3 is-4-mobile is-3-tablet m-auto p-0 py-2 img-icon-header"
        />
      </router-link>
    </div>

    <!-- SEARCH -->

    <div class="column is-3 is-9-mobile is-justify-content-center m-auto">
      <div class="control has-icons-left div-search-input ">
        <input
          v-on:keyup.enter="searchProduct"
          v-model="search"
          class="input search-header"
          type="text"
          placeholder="Buscar producto por nombre"
        />
        <span class="icon is-small is-left icon-header h-100">
          <i class="fas fa-search icon-header"></i>
        </span>
      </div>
    </div>

    <!-- RIGHT -->
    <!-- ACTIONS -->
    <div class="column is-6 is-12-mobile div-btn-header">
      <div class="columns is-12 is-12-mobile is-flex is-justify-content-center">
        <!-- LOGIN -->
        <router-link
          v-if="!auth.id"
          to="/auth/sign-in"
          class="btn-header is-size-6-desktop is-size-7-tablet  is-size-7-mobile text-monserrat"
          >Ingresa</router-link
        >

        <!-- REGISTER -->
        <router-link
          v-if="!auth.id"
          to="/auth/sign-up"
          class="btn-header is-size-6-desktop is-size-7-tablet  is-size-7-mobile is-justify-content-center text-monserrat"
          >Crea tu cuenta</router-link
        >

        <!-- NAME -->
        <router-link
          v-if="auth.id"
          to="/profile"
          class="btn-header is-size-6-desktop is-size-7-tablet  is-size-7-mobile text-monserrat"
          >{{ auth.people.firstname + ' ' + auth.people.lastname }}</router-link
        >

        <!-- shopping CART -->
        <router-link
          v-if="auth.id ? auth.role === 'customer' : true"
          @click="changeCart"
          to="/shopping-cart"
          class="btn-header is-size-6-desktop is-size-7-tablet  is-size-7-mobile is-align-content-end"
        >
          <img :src="`${$env.url}/storage/icons-sky/icons/car.png`" style="display:block; width: 25px; margin:auto;">
        </router-link>

        <div
          v-if="auth.id ? auth.role === 'admin' : false"
          class="btn-header is-size-6-desktop is-size-7-tablet  is-size-7-mobile is-align-content-end"
        >
          <div
            id="drop-header-notification"
            class="dropdown is-right drop-notification-header"
          >
            <div class="dropdown-trigger ">
              <button
                class="cursor-pointer btn-header p-0 is-size-6-desktop is-size-7-tablet  is-size-7-mobile is-relative"
              >
                <span
                  v-if="countNotification > 0"
                  class="is-absolute count-notification-header is-flex is-justify-content-center is-size-7 color-red"
                  >{{ countNotification }}</span
                >
                <i
                  id="btn-notification"
                  class="bi bi-bell-fill icon-header is-size-4  is-size-6-mobile"
                ></i>
              </button>
            </div>
            <div
              class="dropdown-menu has-text-centered"
              id="dropdown-menu6"
              role="menu"
            >
              <div
                @scroll="pagination($event)"
                id="pagination-notification"
                class="dropdown-content is-3 p-2"
              >
                <span
                  v-if="notifications.length > 0"
                  class="column is-12 color-text-dark-gray has-text-right"
                >
                  <span
                    @click="view('all')"
                    class="is-size-7 cursor-pointer non-selectable"
                  >
                    Marcar como vistas
                  </span>
                </span>

                <span
                  v-if="notifications.length === 0 && !isActive"
                  class="color-red column is-12 has-text-centered is-size-4-desktop is-size-5-mobile"
                >
                  <span class="column is-12 bi bi-bell-slash-fill"></span>
                  <span class="column is-12">
                    Aún no posees notificaciones.
                  </span>
                </span>
                <div v-for="(row, index) in notifications" :key="index">
                  <router-link
                    @click="view(row)"
                    :to="'/order/' + JSON.parse(row.description).data.id"
                  >
                    <div
                      class="column is-12 color-text-dark-gray px-3 py-1 non-selectable cursor-pointer"
                      :class="!row.view ? 'chat-is-active' : 'chat-is-hover'"
                    >
                      <span
                        class="column is-12 has-text-left pt-2 has-text-weight-bold"
                      >
                        {{ row.type === 'newOrder' ? 'Nueva orden' : '' }} ({{
                          dateParse(row.created_at)
                        }})
                      </span>
                      <div
                        class="column is-12 is-flex is-align-items-center has-text-left"
                      >
                        <span class="column is-11 is-11-mobile is-flex">
                          {{ JSON.parse(row.description).message }}
                        </span>
                        <img
                          class="column icon-notification-header is-1 is-1-mobile"
                          :src="
                            `${$env.url}/storage/icons-sky/icons/adjuntar-mi-pago.png`
                          "
                          alt="icon"
                        />
                      </div>
                    </div>
                  </router-link>
                  <hr v-if="index + 1 !== notifications.length" />
                </div>
                <SpinnerComponent
                  :isFull="false"
                  :isActive="isActive"
                  :text="'Cargando notificaciones'"
                  class="py-2 color-text-dark-gray"
                ></SpinnerComponent>
              </div>
            </div>
          </div>
        </div>

        <!-- COG -->
        <div
          v-if="auth.id"
          class="btn-header is-size-6-desktop is-size-7-tablet  is-size-7-mobile is-align-content-end"
        >
          <div id="drop-header" class="dropdown drop-header">
            <div class="dropdown-trigger ">
              <button
                class="btn-header cursor-pointer p-0 is-size-6-desktop is-size-7-tablet  is-size-7-mobile"
              >
                <img 
                id="btn-logout" 
                :src="`${$env.url}/storage/icons-sky/icons/configuration.png`" 
                style="display:block; width: 25px; margin:auto;">
              </button>
            </div>
            <div
              class="dropdown-menu has-text-centered"
              id="dropdown-menu5"
              role="menu"
            >
              <div class="dropdown-content is-3 p-0">
                <button
                  @click="router.push('/profile')"
                  class="dropdown-item column button p-0 btn-drop-header"
                >
                  Mis datos
                </button>
                <button
                  @click="router.push('/profile/password')"
                  class="dropdown-item column button p-0 btn-drop-header"
                >
                  Claves y seguridad
                </button>
                <button
                  @click="logout"
                  class="dropdown-item column button p-0 btn-drop-header"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./header.component.ts" />
<style lang="scss" src="./header.component.scss" />
