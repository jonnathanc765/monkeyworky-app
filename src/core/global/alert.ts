import Bulma from '@vizuaalog/bulmajs';

export default function alertBulma(type: string, title: string, body: string, confirm = { label: 'Entendido' }, cancel?: {}) {
    Bulma().alert({
        type,
        title,
        body,
        confirm,
        cancel,
    });
}

export function alertConfirmationBulma(type: string, title: string, body: string, onClickConfirmation: any, onClickCancel = () => { /* */ }, buttonAceptar = 'Aceptar', buttonCancel = 'Cancelar') {
    Bulma().alert({
        type,
        title,
        body,
        confirm: {
            label: buttonAceptar,
            destroy: true,
            onClick: onClickConfirmation,
        },
        cancel: {
            label: buttonCancel,
            destroy: true,
            onClick: onClickCancel,
        },
    });

}

export function notificationBulma(body: string, color = 'white') {
    Bulma('#notification-div').notification({
        body,
        color,
        isDismissable: true,

    }).show();
}

export function alertBulmaInputEmpty() {
    alertBulma('warning', 'Campos vacíos', 'Debe rellenar todos los datos para continuar', { label: 'Entendido' });
}
