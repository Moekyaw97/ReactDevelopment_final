const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePriceInput(data) {
    let errors = {};
    data.amount = !isEmpty(data.amount) ? data.amount : "";
    if (Validator.isEmpty(data.amount)) {
        errors.amount = "Amount field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};