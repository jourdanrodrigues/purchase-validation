let request = require("request-promise");

module.exports = function () {
    // cURL from => https://developercielo.github.io/Webservice-3.0/english.html?json#creating-a-simple-transaction
    return request({
        method: "POST",
        uri: "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/",
        headers: {
            "Content-Type": "application/json",
            "MerchantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "MerchantKey": "0123456789012345678901234567890123456789",
            "RequestId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        },
        data: {
            "MerchantOrderId": "2014111703",
            "Customer": {
                "Name": "Comprador Teste"
            },
            "Payment": {
                "Type": "CreditCard",
                "Amount": 15700,
                "Installments": 1,
                "CreditCard": {
                    "CardNumber": "4551870000000183",
                    "Holder": "Teste Holder",
                    "ExpirationDate": "12/2021",
                    "SecurityCode": "123",
                    "Brand": "Visa"
                }
            }
        }
    });
};