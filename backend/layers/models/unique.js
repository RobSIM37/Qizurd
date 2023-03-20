const idUtils = require("../../utils/idUtils");

class Unique {
    #uuid;

    constructor (existingId){
        if (existingId) {
            this.#uuid = existingId
        } else {
            this.#uuid = idUtils();
        }
    }

    get id(){
        return this.#uuid;
    }
}

module.exports = Unique;