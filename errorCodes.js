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
        // http://developercielo.github.io/Webservice-3.0/english.html#error-codes
        114: getStructure(status.HTTP_500_INTERNAL_SERVER_ERROR, "O ID do vendedor está em formato incorreto."),
        119: getStructure(status.HTTP_400_BAD_REQUEST, "Necessária pelo menos 1 forma de pagamento."),
        122: getStructure(status.HTTP_400_BAD_REQUEST, "\"MerchantOrderId\" é obrigatório."),
        130: getStructure(status.HTTP_400_BAD_REQUEST, "Cartão de crédito não encontrado."),
        184: getStructure(status.HTTP_400_BAD_REQUEST, "Requisição não pode estar vazia.")
    }
};