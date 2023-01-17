const uuidv4 = require("uuid/v4");

export class Unique {
    #uuid;

    constructor (){
        this.#uuid = uuidv4();
    }

    get id(){
        return this.#uuid;
    }
}