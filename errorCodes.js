'use strict';

let status = require("./httpStatus");

let mountData = (apiCode, httpStatus, message) => ({
    httpStatus: httpStatus,
    data: {
        code: apiCode,
        detail: message
    }
});

module.exports = {
    "cielo": {
        // http://developercielo.github.io/Webservice-3.0/english.html#error-codes
        114: mountData("114", status.HTTP_500_INTERNAL_SERVER_ERROR, "O ID do vendedor está em formato incorreto."),
        119: mountData("119", status.HTTP_400_BAD_REQUEST, "Necessária pelo menos 1 forma de pagamento."),
        122: mountData("122", status.HTTP_400_BAD_REQUEST, "\"MerchantOrderId\" é obrigatório."),
        130: mountData("130", status.HTTP_400_BAD_REQUEST, "Cartão de crédito não encontrado."),
        184: mountData("184", status.HTTP_400_BAD_REQUEST, "Requisição não pode estar vazia.")
    }
};