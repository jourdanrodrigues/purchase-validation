'use strict';

let status = require("./httpStatus");

function getStructure(statusCode, message) {
    return {
        code: statusCode,
        data: {
            detail: message
        }
    }
}

module.exports = {
    "cielo" : {
        114: getStructure(status.HTTP_500_INTERNAL_SERVER_ERROR, "O ID do vendedor está em formato incorreto."),
        119: getStructure(status.HTTP_400_BAD_REQUEST, "Necessária pelo menos 1 forma de pagamento."),
        122: getStructure(status.HTTP_400_BAD_REQUEST, "\"MerchantOrderId\" é obrigatório."),
        184: getStructure(status.HTTP_400_BAD_REQUEST, "Requisição não pode estar vazia.")
    }
};