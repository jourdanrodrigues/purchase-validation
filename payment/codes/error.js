"use strict";

let status = require("../../assets/httpStatus");

let errorData = {
    "cielo": {
        // http://developercielo.github.io/Webservice-3.0/english.html#error-codes
        114: {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: "O ID do vendedor está em formato incorreto."},
        119: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Necessária pelo menos 1 forma de pagamento."},
        122: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "\"MerchantOrderId\" é obrigatório."},
        130: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito não encontrado."},
        184: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Requisição não pode estar vazia."}
    }
};

module.exports = (service, responseData) => {
    let code = responseData.error[0].Code,
        data = errorData[service][code];
    return {
        httpStatus: data.httpStatus,
        data: {
            code: code.toString(),
            detail: data.message
        }
    }
};