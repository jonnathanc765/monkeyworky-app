/*
* @class
* Provide infinite loop pagination for Arrays.
* @author: Edgar Bermejo @BuiltByEdgar
* @Edit: KevinGC.NET @KevinGC.NET
* @contributor: Rafa Torres @TorresMalpartida
*/
export default class Pagination {

    /*
    * constructor
    * @param {Array} data Array
    * @param {Number} Optional. items to show per page
    */

    private data;
    private num;
    private index;
    private len;

    constructor(data: any, perPage = 3) {
        if (!data) { throw new Error('I need an Array to work dude!'); }
        if (!(data instanceof Array)) { throw new Error('Invalid data type. Expected an Array'); }

        this.data = data;
        this.num = perPage;
        this.index = 0;
        this.len = this.data.length;
    }


    /*
    * Pagination logic.
    * @param {Number} any number
    * @return {Array} corresponding `data` items to show
    */
    public page(direction: any, index = false) {
        this.index =  (index) ? direction : this.index + direction;
        const res = [];
        const size = ((this.len - this.index) > this.num) ? this.num : (this.len - this.index);
        for (let i = 0; i < size; i++) {
            let aux = this.index + i;
            aux = this.normalize(aux);
            res.push(this.data[aux]);
        }
        return res;
    }

    public getLen(): number {
        return this.len;
    }

    /*
    * API methods
    */

    public initialize() { return this.page(0); }  // Returns page 0
    public next() { return this.page(this.num); }
    public prev() { return this.page(-this.num); }

    public goTo(index: number) {
        return this.page((index - 1) * this.num, true);
    }

    /*
    * Normalize pagination index
    * @param {Number} any number
    * @return {Number} corresponding index to `data` Array
    */
    private normalize(i: any) {
        switch (Math.sign(i % this.len)) {
            case 1:
                return i % this.len;
            case -1:
                return this.len + i % this.len;
            default:
                return 0;
        }
    }

}
