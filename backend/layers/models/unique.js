const uuidv4 = require("uuid/v4");

export class Unique {
    #uuid;

    constructor (existingId){
        if (existingId) {
            this.#uuid = existingId
        } else {
            this.#uuid = uuidv4();
        }
    }

    get id(){
        return this.#uuid;
    }
}