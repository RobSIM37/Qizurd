const uuidv4 = require("uuid/v4");
const data = require("../data/data");
class Unique {
    #uuid;

    constructor (existingId){
        if (existingId) {
            this.#uuid = existingId
        } else {
            do {
                this.#uuid = uuidv4();
            } while (data.isKnownId(this.#uuid,true))
        }
    }

    get id(){
        return this.#uuid;
    }
}

module.exports = Unique