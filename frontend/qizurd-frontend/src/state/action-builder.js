import {
    CARD_CLICKED
} from "./action-types"

export const cardClicked = (id) => {
    return {type: CARD_CLICKED,payload: id}
}