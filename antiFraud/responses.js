let status = require("../assets/httpStatus");

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

module.exports = {
  getError: getError
};
