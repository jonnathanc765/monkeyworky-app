import moment from 'moment';
export function status(Status: any) {
    const translate = {
        refused: 'Rechazada',
        canceled: 'Cancelada',
        pending_for_payment: 'Pendiente por pagar',
        added_payment: 'Pago añadido',
        approved_payment: 'Pago aprobado',
        order_on_hold: 'Orden en espera para ser transportada',
        order_on_the_way: 'Orden siendo transportada',
        order_pending_by_customer: 'Orden en el destino',
        order_delivered: 'Orden entregada',
    } as any;
    return translate[Status];
}

export function originalStatus() {
    return [
        'refused',
        'canceled',
        'pending_for_payment',
        'added_payment',
        'approved_payment',
        'order_on_hold',
        'order_on_the_way',
        'order_pending_by_customer',
        'order_delivered',
    ];
}

export function textDetails(Status: any) {
    const translate = {
        refused: 'Esta orden fue rechazada por un administrador',
        canceled: 'Esta orden fue cancelada por el cliente',
        pending_for_payment: 'Para terminar de procesar su orden debe anexar el comprobante de pago',
        added_payment: 'Ya fue añadido el soporte de pago para esta orden, nos pondremos en contacto contigo lo antes posible luego de comprobar el mismo para así acordar el envio/entrega.',
        approved_payment: 'El pago fue aprobado, nos pondremos en contacto para acordar el envío/entrega',
        order_on_hold: 'La orden se encuentra en espera por ser transportada hacía el destino',
        order_on_the_way: 'En estos momentos la orden se encuentra siendo transportada hacía el destino solicitado',
        order_pending_by_customer: 'La orden se encuentra en el destino solicitado',
        order_delivered: 'Esta orden ha sido entregada al cliente',
    } as any;

    return translate[Status];
}

export function textInfo(item: any, name: string) {
    const text = {
        'Estado': status(item.order.status),
        'Monto': item.order.total,
        'Banco de origen': item.payment ? item.payment.destination : '',
        'Banco de destino': item.payment ? item.payment.bank.name : '',
        'Titular de la cuenta': item.payment ? item.payment.owner : '',
        'Email de la cuenta': item.payment ? item.payment.email : '',
        'Fecha de la transacción': item.payment ? moment(item.payment.date).format('DD/MM/yyyy') : '',
        'Número de referencia': item.payment ? item.payment.reference : '',
        'Método de pago': item.payment ? item.payment.bank.type === 'USD' ? 'Pago en dólares' : 'Pago en bolivares' : '',
        'Comprobante de pago': item.payment ? item.payment.voucher : '',
        'Dirección': item.address ? item.address.address : '',
        'Estado ': item.address ? item.address.parish.state.name : '',
        'Municipio': item.address ? item.address.parish.municipality.name : '',
        'Parroquia': item.address ? item.address.parish.name : '',
        'Indicaciones de dirección': item.address ? item.address.comment : '',
        'Tipo/número de habitación': item.address ? item.address.type : '',
        'Nombre de dirección': item.address ? item.address.name : '',
    } as any;

    return text[name];
}
