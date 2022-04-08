export function animationScroll(selector: string, $el: any) {

    const anchor = $el.querySelector(selector);
    const total = anchor.offsetTop;
    let distance = document.documentElement.scrollTop || document.body.scrollTop;
    let step = total / 50;
    if (total > distance) {
        smoothDown();
    } else {
        const newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
    }
    function smoothDown() {
        if (distance < total) {
            distance += step;
            document.body.scrollTop = distance;
            document.documentElement.scrollTop = distance;
            setTimeout(smoothDown, 10); // Tiempo personalizado
        } else {
            document.body.scrollTop = total;
            document.documentElement.scrollTop = total;
        }
    }
    function smoothUp() {
        if (distance > total) {
            distance -= step;
            document.body.scrollTop = distance;
            document.documentElement.scrollTop = distance;
            setTimeout(smoothUp, 10);
        } else {
            document.body.scrollTop = total;
            document.documentElement.scrollTop = total;
        }
    }
}
