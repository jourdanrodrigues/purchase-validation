'use strict';

let request = require("request-promise");

/**
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
module.exports = function (order) {
    // Simple order
    // => https://developercielo.github.io/Webservice-3.0/english.html?json#creating-a-simple-transaction
    // Complete order
    // => https://developercielo.github.io/Webservice-3.0/english.html?json#creating-a-complete-transaction
    // Error case
    // => response.error = [{"Code":<Integer>,"Message":<String>}]
    return request({
        method: "POST",
        uri: process.env.CIELO_API_URL + "1/sales/",
        headers: {
            "Content-Type": "application/json",
            "MerchantId": process.env.CIELO_MERCHANT_ID,
            "MerchantKey": process.env.CIELO_MERCHANT_KEY
        },
        data: order
    });
};