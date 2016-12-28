"use strict";

let request = require("request-promise"),
    status = require("./../assets/httpStatus"),
    successCodes = require("./codes/success"),
    errorCodes = require("./codes/error");

/**
 * Simple order => https://developercielo.github.io/Webservice-3.0/english.html?json#creating-a-simple-transaction
 * Complete order => https://developercielo.github.io/Webservice-3.0/english.html?json#creating-a-complete-transaction
 * Error case => response.error = [{"Code":<Integer>,"Message":<String>}]
 * @param {{
 *  MerchantOrderId,
 *  Customer: {
 *      Name, [Identity], [IdentityType], [Email], [Birthdate],
 *      [Address]: {
 *          [Street], [Number], [Complement], [ZipCode], [City], [State], [Country]
 *      },
 *      [DeliveryAddress]: {
 *          [Street], [Number], [Complement], [ZipCode], [City], [State], [Country]
 *      },
 *  }
 *  Payment: {
 *      Type, Amount, ServiceTaxAmount, Installments, [Interest], Capture, Authenticate, SoftDescriptor, [Currency],
 *      [Country]
 *      CreditCard: {
 *          CardNumber, Holder, ExpirationDate, SecurityCode, [SaveCard], Brand
 *      }
 *  }
 * }} order
 */
function create(order) {
    return request({
        method: "POST",
        uri: process.env.CIELO_API_URL + "1/sales/",
        headers: {
            "Content-Type": "application/json",
            MerchantId: process.env.CIELO_MERCHANT_ID,
            MerchantKey: process.env.CIELO_MERCHANT_KEY
        },
        body: order,
        json: true
    });
}

/**
 * @param {{
 *  Payment: {
 *      ReturnCode
 *  }
 * }} paymentResponse
 * @param {{ statusCode, send }} requestResponse
 */
function successfulResponse(requestResponse, paymentResponse) {
    let successInfo = successCodes("cielo", paymentResponse);

    requestResponse.statusCode = successInfo.httpStatus;
    requestResponse.send(successInfo.data)
}


/**
 * @param {{
 *  statusCode,
 *  error: {Code}
 * }} paymentResponse
 * @param {{ statusCode, send }} requestResponse
 */
function erroneousResponse(requestResponse, paymentResponse) {
    if (paymentResponse.statusCode === status.HTTP_500_INTERNAL_SERVER_ERROR) {
        requestResponse.statusCode = paymentResponse.statusCode;
        requestResponse.send("Ocorreu um erro no serviço de pagamento.");
    }
    else {
        let errorInfo = errorCodes("cielo", paymentResponse);

        requestResponse.statusCode = errorInfo.httpStatus;
        requestResponse.send(errorInfo.data);
    }
}

module.exports = {
    create: create,
    successfulResponse: successfulResponse,
    erroneousResponse: erroneousResponse
};