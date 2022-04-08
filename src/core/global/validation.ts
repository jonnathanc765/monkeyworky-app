export function addClassValidation(selector: string, className: string[]) {

    const element = document.querySelector(selector);
    if (element) {
        element.classList.add(...className);
    }
}

export function appendIconValidation(selector: string, icon: string, direction = 'right') {

    const element = document.querySelector(selector);
    if (element) {
        element.append(`
        <span class="icon is-${direction}">
            <i class="${icon}"></i>
        </span>
        `);
    }
}

export function removeClassValidation(selector: string, className: string[]) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.remove(...className);
    }
}

export function validateText(text: string) {
    const re = /^[A-Z áéíóúÁÉÍÓÚ]+$/i;
    return re.test(text);
}

export function validateNumber(text: string) {
    const re = /^\d+$/;
    return re.test(text);
}

export function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function checkInputEmpty(data: any): boolean {
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (data[key] === '') {
                return false;
            }
        }
    }
    return true;
}
