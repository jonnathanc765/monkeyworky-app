export function errorsApi(errors: any) {
    const errorsMessage = [];
    for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
            errorsMessage.push(errorsMessage.length === 0 ? `${errors[key][0]}` : `<br>${errors[key][0]}`);
        }
    }

    return errorsMessage;
}
