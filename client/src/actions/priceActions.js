import axios from "axios";
import {
    GET_ERRORS,
    PRICE_ADD,
    PRICE_UPDATE
} from "./types";

export const addPrice = (priceData, history) => dispatch => {
    axios
        .post("/api/price-add", priceData)
        .then(res =>
            dispatch({
                type: PRICE_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updatePrice = (priceData) => dispatch => {
    axios
        .post("/api/price-update", priceData)
        .then(res =>
            dispatch({
                type: PRICE_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
