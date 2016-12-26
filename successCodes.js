'use strict';

let status = require("./httpStatus");

let successData = {
    "cielo": {
        // http://developercielo.github.io/Webservice-3.0/english.html#return-codes
        4: {httpStatus: status.HTTP_201_CREATED, message: "Operação realizada com sucesso."}, // Simple transaction
        6: {httpStatus: status.HTTP_201_CREATED, message: "Operação realizada com sucesso."}, // Complete transaction
        57: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Transação não autorizada para este cartão."}
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