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
        119: {
            code: status.HTTP_400_BAD_REQUEST,
            data: {
                // At least one Payment is required
                detail: "Necessária pelo menos 1 forma de pagamento."
            }
        },
        122: {
            code: status.HTTP_400_BAD_REQUEST,
            data: {
                // MerchantOrderId is required
                detail: "\"MerchantOrderId\" é obrigatório."
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