import { loadUser } from './auth';
import api from "../utils/api";
import { setAlert } from "./alert";
import {
    ADD_ITEM,
    GET_ITEMS,
    GET_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
} from "./types";

//creating items
export const createItems = (formData) => async (dispatch) => {
    try {
        const res = await api.post("/items/add", formData);

        dispatch({
            type: ADD_ITEM,
            payload: res.data.data,
        });

        dispatch(getAllItems());

        dispatch(setAlert(`${res.data.msg}`, "success"));

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};

//updating ITEMs
export const updateItem =
    (formData, id) => async (dispatch) => {
        try {
            const res = await api.put(`/items/update/${id}`, formData);

            dispatch({
                type: UPDATE_ITEM,
                payload: res.data.data,
            });

            dispatch(getAllItems());

            dispatch(setAlert(`${res.data.msg}`, "success"));
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    };

//showing all the written items on screen
export const getAllItems = () => async (dispatch) => {
    try {
        const res = await api.get("/items/allItems");

        dispatch({
            type: GET_ITEMS,
            payload: res?.data,
        });
    } catch (error) {
        const errors = error?.response?.data?.errors;

        if (errors) {
            errors?.forEach((error) => dispatch(setAlert(error?.msg, "danger")));
        }
    }
};

//showing items on the basis of ID
export const getItemById = (id) => async (dispatch) => {
    try {
        const res = await api.get(`/items/oneById/${id}`);

        dispatch({
            type: GET_ITEM,
            payload: res.data,
        });
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};

//delete existing item
export const deleteItem = (id) => async (dispatch) => {
    try {
        const res = await api.delete(`/items/delete/${id}`);

        dispatch({
            type: DELETE_ITEM,
        });

        dispatch(getAllItems());

        dispatch(setAlert(`${res.data.msg}`, "danger"));

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};
