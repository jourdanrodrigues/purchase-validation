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
  // http://developercielo.github.io/Webservice-3.0/english.html#sales-return-codes
  '00': {httpStatus: status.HTTP_201_CREATED, message: 'Transação autorizada com sucesso.'},
  '01': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não autorizada.'},
  '02': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não autorizada.'},
  '03': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Estabelecimento inválido.'},
  '04': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão bloqueado.'},
  '05': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão inadimplente.'},
  '06': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão cancelado.'},
  '07': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação negada. Reter cartão.'},
  '08': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Código de segurança inválido.'},
  '11': {httpStatus: status.HTTP_201_CREATED, message: 'Transação autorizada para cartão emitido no exterior.'},
  '12': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação inválida. Erro no cartão.'},
  '13': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Valor de transação inválido.'},
  '14': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão inválido.'},
  '15': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Banco indisponível ou inexistente.'},
  '19': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Refaça a transação ou tente mais tarde.'},
  '21': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não localizada.'},
  '22': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Número de parcelas inválido.'},
  '23': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Número inválido de parcelas.'},
  '24': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Quantidade inválida de parcelas.'},
  '25': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Requisição de autorização não enviou o número do cartão.'},
  '28': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Arquivo temporariamente indisponível.'},
  '39': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Erro no banco emissor.'},
  '41': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão bloqueado por perda.'},
  '43': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão bloqueado por roubo.'},
  '51': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão com limite excedido/sem saldo.'},
  '52': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Dígito de controle inválido para o cartão.'},
  '53': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão de poupança inválido.'},
  '54': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão expirado.'},
  '55': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Senha inválida.'},
  '57': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não autorizada para o cartão.'},
  '58': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Opção de pagamento inválida.'},
  '59': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Suspeita de fraude.'},
  '60': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não autorizada.'},
  '61': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Banco Visa indisponível.'},
  '62': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão restrito à uso doméstico.'},
  '63': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Brecha de segurança.'},
  '64': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Valor abaixo do mínimo estipulado pelo banco emissor.'},
  '65': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Quantidade de transações excedida pelo cartão.'},
  '67': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão bloqueado para compras hoje.'},
  '70': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão com limite excedido/sem saldo.'},
  '72': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Saldo disponível insuficiente para cancelamento.'},
  '74': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Senha expirou.'},
  '76': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Banco emissor não localizou a transação original.'},
  '77': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'A transação original não foi encontrada.'},
  '78': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão bloqueado para primeiro uso.'},
  '80': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Divergência na data de transação/pagamento.'},
  '82': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão inválido.'},
  '83': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Erro no controle da senha.'},
  '85': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Operação falhou.'},
  '86': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Operação falhou.'},
  '89': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Erro na transação.'},
  '90': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Operação falhou.'},
  '91': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Banco emissor temporariamente indisponível.'},
  '92': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Excedido tempo de comunicação.'},
  '93': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Violação de regra - possível erro no registro.'},
  '96': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'falha no sistema da Cielo.'},
  '97': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Valor não autorizado para essa transação.'},
  '98': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Sistema/comunicação indisponível.'},
  '99': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Sistema/comunicação indisponível.'},
  '999': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Sistema/comunicação indisponível.'},
  'AA': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Tempo de comunição com o banco emissor excedido.'},
  'AC': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão de débito sendo usado com crédito.'},
  'AE': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Tempo de comunição com o banco emissor excedido.'},
  'AF': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Operação falhou.'},
  'AG': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Operação falhou.'},
  'AH': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão de crédito sendo usado com débito.'},
  'AI': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Autenticação não foi realidada.'},
  'AJ': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Selecionado crédito ou débito em uma operação que permite somente "Private Label".'},
  'AV': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Dados inválidos.'},
  'BD': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Operação falhou.'},
  'BL': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Limite diário excedido.'},
  'BM': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão inválido.'},
  'BN': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Conta ou cartão bloqueado.'},
  'BO': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Operação falhou.'},
  'BP': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Conta corrente inexistente.'},
  'BV': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão expirado.'},
  'CF': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Validação dos dados falhou.'},
  'CG': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Validação dos dados falhou.'},
  'DA': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Validação dos dados falhou.'},
  'DF': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Falha no cartão ou cartão inválido.'},
  'DM': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão com limite excedido/sem saldo.'},
  'DQ': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Validação dos dados falhou.'},
  'DS': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não autorizada para o cartão.'},
  'EB': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Limite diário excedido.'},
  'EE': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Valor da parcela abaixo do mínimo.'},
  'EK': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não autorizada para o cartão.'},
  'FA': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não autorizada pela AmEx.'},
  'FC': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Ligar para o banco emissor.'},
  'FD': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação negada. Reter cartão.'},
  'FE': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Divergência na data de transação/pagamento.'},
  'FF': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cancelamento da transação autorizado com sucesso.'},
  'FG': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Ligar para a AmEx (0800-728-5090).'},
  'GA': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Transação não autorizada. A Cielo entrará em contato.'},
  'HJ': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Código de operação Coban inválido.'},
  'IA': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Código de operação Coban inválido.'},
  'JB': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Código de operação Coban inválido.'},
  'KA': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Validação dos dados falhou.'},
  'KB': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Selecionada opção incorrida.'},
  'KE': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Validação dos dados falhou.'},
  'N7': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Código de segurança inválido.'},
  'R1': {httpStatus: status.HTTP_400_BAD_REQUEST, message: 'Cartão inadimplente.'},
  'U3': {httpStatus: status.HTTP_500_INTERNAL_SERVER_ERROR, message: 'Validação dos dados falhou.'},
};

/**
 * @param {Response, {Payment: {ReturnCode}}} responseData
 * @returns {{httpStatus: *, data: {data: *, detail}}}
 */
function getSuccess(responseData) {
  let data = successData[responseData.Payment.ReturnCode];
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
