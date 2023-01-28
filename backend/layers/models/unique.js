const idUtils = require("../../utils/idUtils");
const data = require("../data/data");

class Unique {
    #uuid;

    constructor (existingId){
        if (existingId) {
            this.#uuid = existingId
        } else {
            do {
                this.#uuid = idUtils();
            } while (data.isKnownId(this.#uuid,true))
        }
    }

    get id(){
        return this.#uuid;
    }
}

module.exports = Unique;