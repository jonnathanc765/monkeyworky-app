import { conversationsStore } from '@/store/conversations';
import { onMounted, ref, onUnmounted } from 'vue';
import alertBulma from '../../core/global/alert';
import { computed, defineAsyncComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { utilitiesStore } from '../../store/utilities';
import moment from 'moment';
export default {
    name: 'Conversations',
    components: {
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
    },
    setup() {

        const isActive = ref(true);
        const isActiveMessage = ref(false);
        const list = ref(false);
        const textList = ref('Listado de admins');
        const page = ref(1);
        const arrowVisible = ref(false);
        const pageMessage = ref(2);
        const lastScroll = ref(1350);
        const textConversation = ref({
            name: '',
            id: 0,
            isActive: false,
        });
        const conversationSelected = ref(false);
        const mobile = ref(false);


        const authStore = useStore();

        const auth = computed(() => {
            return authStore.state.auth;
        });

        const people = computed(() => {
            return authStore.state.people;
        });

        const idConversation = computed(() => {
            return conversationsStore.state.idConversation;
        });

        const paginate = computed(() => {
            return conversationsStore.state.paginate;
        });

        const isToggled = computed(() => {
            return utilitiesStore.state.toggled;
        });

        const messages = computed(() => {
            return conversationsStore.state.messages;
        });

        const dateParse = (value: string) => {
            if (value !== '') {
                moment.updateLocale('es', {
                    relativeTime: {
                        future: 'en %s',
                        past: 'hace %s',
                        s: '1m',
                        ss: '%ds',
                        m: '1m',
                        mm: '%dm',
                        h: '1h',
                        hh: '%dh',
                        d: '1d',
                        dd: '%dd',
                        w: '1sem',
                        ww: '%dsem',
                        M: 'un mes',
                        MM: '%d meses',
                        y: 'un año',
                        yy: '%d años',
                    },
                });
                return moment(value).fromNow(true);
            }
        };

        onMounted(async () => {

            mobile.value = screen.width <= 760;

            /* SOCKET */
            if (auth.value.id) {
                window.Echo.private(`chat-message.${auth.value.id}`).listen(
                    'ChatEvent',
                    (res: any) => {
                        conversationsStore.commit(
                            'setSockketConversation',
                            res.response.conversation,
                        );
                        conversationsStore.commit('setSocketMessage', res.response);
                        scrollHeight();
                    },
                );
            }

            await conversationsStore.dispatch('getConversations').catch(() => {
                alertBulma('danger', 'Error', 'Hubo un problema con la comunicación del servidor');
            }).finally(() => { isActive.value = false; });

            if (auth.value.role === 'admin') {
                textList.value = 'Listado de clientes';
            }
        });

        const event = async (e: any) => {
            if (e.target.scrollTop === 0 && paginate.value === pageMessage.value) {
                await getMessages(idConversation.value, true);
                pageMessage.value = pageMessage.value + 1;
            }

            arrowVisible.value = (e.target.scrollHeight - e.target.scrollTop) > e.target.clientHeight + 50;
        };

        onUnmounted(() => {
            window.Echo.leave(`chat-message.${auth.value.id}`);
            conversationsStore.commit('setMessages', []);
            conversationsStore.commit('setPaginate', 1);
            conversationsStore.commit('setIdConversation', 0);
        });

        const shortMessage = (text: string, length: number) => {
            if (text.length <= length) {
                return text;
            }
            let caracteres = 0;
            const arreglo = text.split(' ');
            for (let index = 0; index < arreglo.length; index++) {
                caracteres += arreglo[index].length;
                if (caracteres > length) {
                    arreglo.splice(index, arreglo.length);
                }
                caracteres++;
            }
            return arreglo.join(' ') + '...';
        };

        const showMessages = async (row: any) => {
            setConversation(true);
            if (row.id !== idConversation.value) {
                conversationsStore.commit('setPaginate', 1);
                pageMessage.value = 2;
                lastScroll.value = 1350;
                textConversation.value.isActive = true;
                textConversation.value.name = row.from.people_id !== auth.value.people.people_id
                    ? row.from.firstname + ' ' + row.from.lastname
                    : row.to.firstname + ' ' + row.to.lastname;
                textConversation.value.id = row.from.people_id !== auth.value.people.people_id
                    ? row.from.people_id : row.to.people_id;
                conversationsStore.commit('setIdConversation', row.id);
                conversationsStore.commit('setMessages', []);
                await getMessages(row.id);
            }
        };

        const conversations = computed(() => {
            return conversationsStore.state.conversations;
        });

        const getPeople = async () => {
            isActive.value = true;
            await authStore.dispatch('getUsers', { role: auth.value.role === 'customer' ? 'admin' : 'customer', page: page.value }).catch(() => {
                alertBulma('danger', 'Error', 'Hubo un problema con la comunicación del servidor');
            }).finally(() => {
                isActive.value = false;
            });
        };

        const showList = async () => {
            if (list.value) {
                list.value = false;
            } else {
                list.value = true;
                if (people.value.length === 0) {
                    await getPeople();
                }
            }
        };

        const selectList = async (row: any) => {
            if (!isActiveMessage.value) {
                await conversationsStore.dispatch('postConversation', row.people_id).then(async (res) => {
                    list.value = false;
                    conversationsStore.commit('setPaginate', 1);
                    pageMessage.value = 2;
                    lastScroll.value = 1350;
                    textConversation.value.isActive = true;
                    textConversation.value.name = row.firstname + ' ' + row.lastname;
                    console.log(row);
                    textConversation.value.id = row.people_id;
                    conversationsStore.commit('setIdConversation', res.id);
                    conversationsStore.commit('setMessages', []);
                    await getMessages(res.id);
                }).catch(() => {
                    isActiveMessage.value = false;
                    alertBulma('danger', 'Error', 'Hubo un problema con la comunicación del servidor');
                });
            }
        };

        const getMessages = async (id: number, scroll = false) => {
            isActiveMessage.value = true;
            await conversationsStore.dispatch('getMessages', id).then(() => {
                scrollHeight(scroll);
            }).catch(() => {
                alertBulma('danger', 'Error', 'No se pudo cargar los mensajes');
            }).finally(() => { isActiveMessage.value = false; });
        };

        const scrollHeight = (value = false) => {
            const content = document.getElementById('content-messages');
            if (content) {
                if (!value) {
                    content.scrollTop = content.scrollHeight;
                } else {
                    content.scrollTop = content.scrollHeight - lastScroll.value;
                    lastScroll.value = content.scrollHeight;
                }
            }
        };

        const sendMessage = async (e: any) => {
            if ((e.which === 13 && !e.shiftKey)) {
                e.preventDefault();
                await processMessage();
            } else if (e === 'click') {
                await processMessage();
            }
        };

        const processMessage = async () => {
            const text = document.getElementById('text-message');
            if (text) {
                const message = text.innerText;
                if (message !== '') {
                    text.innerText = '';
                    await conversationsStore.dispatch('postMessage', { id: idConversation.value, data: { message, type: 'text' } }).then((res) => {
                        conversationsStore.commit('setSockketConversation', res.conversation);
                    }).catch(() => {
                        alertBulma('danger', 'Error', 'No se pudo mandar el mensaje');
                    }).finally(() => {
                        scrollHeight();
                    });
                }
            }
        };

        const setConversation = (conversation: any) => {
            conversationSelected.value = conversation;
        };

        const usersActive = computed(() => {
            return conversationsStore.state.usersActive;
        });

        return { shortMessage, conversations, isActive, list, textList, showList, people, selectList, isActiveMessage, auth, textConversation, isToggled, dateParse, showMessages, messages, sendMessage, idConversation, conversationSelected, setConversation, mobile, usersActive, event, arrowVisible, scrollHeight };
    },
};
