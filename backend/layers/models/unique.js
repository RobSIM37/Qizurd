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
                console.log("uuid: ",this.#uuid)
            } while (data.isKnownId(this.#uuid,true))
        }
    }

    get id(){
        return this.#uuid;
    }
}

module.exports = Unique;