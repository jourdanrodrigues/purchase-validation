"use strict";

let status = require("../httpStatus");

let successData = {
    "cielo": {
        // http://developercielo.github.io/Webservice-3.0/english.html#return-codes
        2: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito não autorizado."},
        4: {httpStatus: status.HTTP_201_CREATED, message: "Operação realizada com sucesso."}, // Simple transaction
        6: {httpStatus: status.HTTP_201_CREATED, message: "Operação realizada com sucesso."}, // Complete transaction
        57: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito expirado."},
        70: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Problemas com o cartão de crédito."},
        77: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito cancelado."},
        78: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito bloqueado."},
        99: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Não autorizada."} // Time out
    }
};

module.exports = (service, responseData) => {
    let data = successData[service][responseData.Payment.ReturnCode];
    return {
        httpStatus: data.httpStatus,
        data: {
            data: responseData,
            detail: data.message
        }
    }
};