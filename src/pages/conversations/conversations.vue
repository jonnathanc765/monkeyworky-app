<template>
  <div
    class="
      column
      px-6
      is-block-mobile
      is-flex-desktop
      is-justify-content-space-between
      is-block-tablet
      gradient-gray background-monkeys
    "
  >
    <!-- CONVERSATION -->
    <div
      class="
        column
        is-4-desktop is-12-tablet is-12-mobile
        background-gray
        box-shadow
        h-10
        mb-3
        mt-5
        div-father
        is-relative
      "
      :class="{
        'is-block': mobile && !conversationSelected,
        'is-hidden': mobile && conversationSelected,
        'is-block': !mobile
      }"
    >
      <div class="column my-2 is-justify-content-center has-text-left">
        <h2
          class="column is-12 has-text-centered is-size-5 has-text-weight-bold"
        >
          {{ list ? textList : 'Mis mensajes' }}
        </h2>

        <SpinnerComponent
          :isFull="false"
          :isActive="isActive && conversations.length === 0"
          :text="'Cargando mensajes'"
          class="py-6"
        ></SpinnerComponent>
        <h2
          v-if="conversations.length === 0 && !isActive && !list"
          class="p-6 is-size-5 has-text-centered color-red"
        >
          <i class="bi bi-chat-square-text is-size-2"></i>
          <h2>No se encontraron mensajes</h2>
        </h2>

        <h2
          v-if="people.length === 0 && !isActive && list"
          class="p-6 is-size-5 has-text-centered color-red"
        >
          <i class="bi bi-chat-square-text is-size-2"></i>
          <h2>No se encontraron resultados</h2>
        </h2>
        <!-- CONVERSATIONS -->
        <div v-if="!list">
          <div v-for="row in conversations" :key="row.id" class="px-3">
            <div
              class="p-3 is-block column is-12 cursor-pointer non-selectable"
              :class="
                row.id === idConversation ? 'chat-is-active' : 'chat-is-hover'
              "
              @click="showMessages(row)"
            >
              <div class="columns">
                <span
                  v-if="auth.people"
                  class="column is-12 has-text-weight-bold"
                  >{{
                    row.from.people_id !== auth.people.people_id
                      ? row.from.firstname + ' ' + row.from.lastname
                      : row.to.firstname + ' ' + row.to.lastname
                  }}</span
                >
              </div>
              <div class="columns is-flex is-align-items-center">
                <span
                  class="
                    column
                    is-11 is-11-mobile
                    color-text-dark-gray
                    is-italic is-size-7
                    message-overflow
                  "
                  >{{
                    shortMessage(
                      row.lastMessage.message ? row.lastMessage.message : '',
                      isToggled ? 45 : 55
                    )
                  }}</span
                >
                <span
                  class="
                    column
                    is-size-7 is-1 is-1-mobile
                    color-text-dark-gray
                    is-italic
                    has-text-right
                  "
                >
                  {{
                    dateParse(
                      row.lastMessage.created_at
                        ? row.lastMessage.created_at
                        : ''
                    )
                  }}
                </span>
              </div>
            </div>
            <hr />
          </div>
        </div>

        <div v-if="list">
          <div
            v-for="row in people"
            :key="row.people_id"
            @click="selectList(row)"
            class="px-3"
          >
            <div
              class="
                p-3
                is-block
                column
                is-12
                chat-is-hover
                cursor-pointer
                non-selectable
              "
            >
              <span class="column is-12 is-italic has-text-weight-bold">
                {{ row.firstname }} {{ row.lastname }}
              </span>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <button
        @click="showList"
        class="background-yellow btn-new-message cursor-pointer color-text-dark-gray"
      >
        <i class="bi bi-chat-square-dots is-size-4"></i>
      </button>
    </div>

    <!-- CHAT -->
    <div
      class="
        column
        is-8-desktop is-12-mobile is-12-tablet
        background-gray
        box-shadow
        has-text-left
        mr-4
        mt-5
        div-father
        is-relative
      "
      :class="{
        'is-block': !mobile || (mobile && conversationSelected),
        'is-hidden': mobile && !conversationSelected
      }"
    >
      <!-- HEADER -->
      <div
        class="
          column
          is-12
          background-chat
          info-chat
          is-flex is-align-items-center
          px-3
        "
      >
        <span
          v-if="textConversation.name !== ''"
          class="has-text-lef has-text-weight-bold py-2"
          ><button
            class="ph-2 is-inline-flex has-text-grey-darker is-hidden-desktop"
            @click="setConversation(false)"
            style="background:none;border:none"
          >
            <i class="bi bi-caret-left-fill"></i>
          </button>
          {{ textConversation.name }}
          <span class="has-text-weight-normal is-size-7">{{
            usersActive.find(res => res.people_id === textConversation.id)
              ? 'En linea'
              : 'Desconectado'
          }}</span>
        </span>
      </div>

      <!-- MESSAGES -->
      <div class="is-relative">
        <div
          @scroll="event($event)"
          id="content-messages"
          class="p-2 column is-12 div-messages my-3"
        >
          <SpinnerComponent
            :isFull="false"
            :isActive="isActiveMessage"
            :text="'Cargando mensajes'"
            class="py-6 mt-6"
          ></SpinnerComponent>
          <div
            v-for="item in messages"
            :key="item.id"
            class="column is-12 is-12-mobile is-block message-div color-text-dark-gray"
            :class="item.send_id !== auth.id ? 'message-from' : 'message-to'"
          >
            <div
              class="label-message color-text-dark-gray"
              :class="
                item.send_id !== auth.id
                  ? 'label-message-from'
                  : 'label-message-to'
              "
            >
              {{ item.message }}
            </div>
          </div>
          <i
            class="bi bi-arrow-down-circle-fill color-text-dark-gray cursor-pointer arrow-conversation is-size-4"
            v-if="arrowVisible"
            @click="scrollHeight(false)"
          >
          </i>
        </div>
      </div>

      <!-- FOOTER -->
      <div
        class="
          column
          is-12 is-12-mobile
          background-chat
          is-flex is-align-items-center
          input-chat-div
          father-chat
        "
      >
        <div class="column control is-12 is-12-mobile">
          <div
            v-if="textConversation.isActive"
            class="
              is-12
              is-12-mobile
              is-flex
              is-is-justify-content-center
              is-align-items-center
            "
          >
            <div
              @keydown="sendMessage($event)"
              id="text-message"
              contenteditable
              class="column is-10 is-8-mobile input-chat p-2"
            ></div>
            <div
              class="column is-2 is-flex is-align-items-center px-3 is-justify-content-space-evenly"
            >
              <i
                class="
                  fas
                  is-6 is-size-4
                  color-red
                  fa-cloud-upload-alt
                  cursor-pointer
                "
              ></i>

              <img
                @click="sendMessage('click')"
                src="@/assets/img/send.png"
                class="send-message cursor-pointer"
                width="25px"
                height="25px"
                alt="send"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./conversations.ts" />
<style lang="scss" src="./conversations.scss" />
