'use strict';

let request = require("request-promise");

module.exports = function (order) {
    // cURL from => https://developercielo.github.io/Webservice-3.0/english.html?json#creating-a-simple-transaction
    // Error case => // response.error = [{"Code":<Integer>,"Message":<String>}]
    let customer = order.customer,
        payment = order.payment,
        creditCard = payment.creditCard;

    return request({
        method: "POST",
        uri: process.env.CIELO_API_URL + "1/sales/",
        headers: {
            "Content-Type": "application/json",
            "MerchantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "MerchantKey": "0123456789012345678901234567890123456789",
            "RequestId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        },
        data: {
            "MerchantOrderId": order.orderId,
            "Customer": {
                "Name": customer.name
            },
            "Payment": {
                "Type": payment.type,
                "Amount": payment.amount,
                "Installments": payment.installments,
                "CreditCard": {
                    "CardNumber": creditCard.cardNumber,
                    "Holder": creditCard.holder,
                    "ExpirationDate": creditCard.expirationDate,
                    "SecurityCode": creditCard.securityCode,
                    "Brand": creditCard.brand
                }
            }
        }
    });
};