let status = require("../assets/httpStatus");

// CS
let statusCodes = {
  // "00": ["Transação Concluída", null], //  No need to resend
  "01": {message: "Usuário Inexistente", httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR}, // No need to resend
  "02": {message: "Erro na validação do XML", httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR}, // Resend
  "03": {message: "Erro ao transformar XML", httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR}, // Resend
  "04": {message: "Erro Inesperado", httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR}, // Resend
  "05": {message: "Pedido já enviado ou não está em reanálise", httpStatus: status.HTTP_400_BAD_REQUEST}, // Resend
  "06": {message: "Erro no Plugin de Entrada", httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR}, // Resend
  "07": {message: "Erro no Plugin de Saída", httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR} // No need to resend
};

// OC
let orderStatusCodes = {
  // APA & APM: This code means that the order is accepted and the purchase must continue
  RPM: {message: "Reprovado sem suspeita", httpStatus: status.HTTP_200_OK},
  AMA: {message: "Análise manual", httpStatus: status.HTTP_200_OK},
  ERR: {message: "Erro nos dados enviados", httpStatus: status.HTTP_400_BAD_REQUEST},
  NVO: {message: "Novo pedido ainda não verificado", httpStatus: status.HTTP_200_OK},
  SUS: {message: "Suspensão manual", httpStatus: status.HTTP_200_OK},
  CAN: {message: "Cancelado pelo cliente", httpStatus: status.HTTP_200_OK},
  FRD: {message: "Fraude confirmada", httpStatus: status.HTTP_200_OK},
  RPA: {message: "Reprovação automática", httpStatus: status.HTTP_200_OK},
  RPP: {message: "Reprovação por política", httpStatus: status.HTTP_200_OK}
};

/**
 * @param {string} code
 * @return {{httpStatus: int, data: {code: string, detail: string}}}
 */
function getError(code) {
  let data = statusCodes[code];

  return {
    httpStatus: data.httpStatus,
    data: {
      code: `cs${code}`,
      detail: data.message
    }
  }
}

function getOrderCode(code) {
  let data = orderStatusCodes[code];

  return {
    httpStatus: data.httpStatus,
    data: {
      code: `oc${code}`,
      detail: data.message
    }
  }
}

module.exports = {
  getError: getError,
  getOrderCode: getOrderCode
};
