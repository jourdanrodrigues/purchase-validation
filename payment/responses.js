"use strict";

let status = require("../assets/httpStatus");

let errorData = {
  // http://developercielo.github.io/Webservice-3.0/english.html#error-codes
  114: {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: "O ID do vendedor está em formato incorreto."},
  119: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Necessária pelo menos 1 forma de pagamento."},
  122: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "\"MerchantOrderId\" é obrigatório."},
  130: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito não encontrado."},
  184: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Requisição não pode estar vazia."}
};

let successData = {
  // http://developercielo.github.io/Webservice-3.0/english.html#return-codes
  2: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito não autorizado."},
  4: {httpStatus: status.HTTP_201_CREATED, message: "Operação realizada com sucesso."}, // Simple transaction
  5: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito inadimplente."},
  6: {httpStatus: status.HTTP_201_CREATED, message: "Operação realizada com sucesso."}, // Complete transaction
  57: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito expirado."},
  70: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Problemas com o cartão de crédito."},
  77: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito cancelado."},
  78: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Cartão de crédito bloqueado."},
  99: {httpStatus: status.HTTP_400_BAD_REQUEST, message: "Não autorizada."} // Time out
};

/**
 * @param {Response, {Payment: {ReturnCode}}} responseData
 * @returns {{httpStatus: *, data: {data: *, detail}}}
 */
function getSuccess(responseData) {
  let data = successData[parseInt(responseData.Payment.ReturnCode)];
  return {
    httpStatus: data.httpStatus,
    data: {
      data: responseData,
      detail: data.message
    }
  }
}

/**
 * @param {Response, {error: {Code}[]}} responseData
 * @returns {{httpStatus: *, data: {code: (*|string|String), detail}}}
 */
function getError(responseData) {
  let code = responseData.error[0].Code,
    data = errorData[code];
  return {
    httpStatus: data.httpStatus,
    data: {
      code: `c${code.toString()}`,
      detail: data.message
    }
  }
}

module.exports = {
  error: getError,
  success: getSuccess
};
