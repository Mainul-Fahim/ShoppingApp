import {
    ADD_ITEM,
    GET_ITEMS,
    GET_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
} from "../actions/types";

const initialState = {
    item: null,
    items: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_ITEM:
        case GET_ITEM:
            return {
                ...state,
                item: payload,
            };
        case UPDATE_ITEM:
            return {
                ...state,
                item: payload,
            };
        case GET_ITEMS:
            return {
                ...state,
                items: payload,
            };
        case DELETE_ITEM:
            return {
                ...state,
                item: null,
            };
        default:
            return state;
    }
}