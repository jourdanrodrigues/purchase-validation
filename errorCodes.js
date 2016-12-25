'use strict';

let status = require("./httpStatus");

module.exports = {
    "cielo" : {
        114: {
            code: status.HTTP_500_INTERNAL_SERVER_ERROR,
            data: {
                // The provided MerchantId is not in correct format
                detail: "O ID do vendedor está em formato incorreto."
            }
        },
        184: {
            code: status.HTTP_400_BAD_REQUEST,
            data: {
                // Request could not be empty
                detail: "Requisição não pode estar vazia."
            }
        }
    }
};