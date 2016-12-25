let request = require("request-promise");

module.exports = function (data) {
    // cURL from => https://developercielo.github.io/Webservice-3.0/english.html?json#creating-a-simple-transaction
    // Error case => // response.error = [{"Code":<Integer>,"Message":<String>}]
    return request({
        method: "POST",
        uri: process.env.CIELO_API + "1/sales/",
        headers: {
            "Content-Type": "application/json",
            "MerchantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "MerchantKey": "0123456789012345678901234567890123456789",
            "RequestId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        },
        data: {
            "MerchantOrderId": data["orderId"],
            "Customer": {
                "Name": data["customer"]["name"]
            },
            "Payment": {
                "Type": data["payment"]["type"],
                "Amount": data["payment"]["amount"],
                "Installments": data["payment"]["installments"],
                "CreditCard": {
                    "CardNumber": data["payment"]["creditCard"]["cardNumber"],
                    "Holder": data["payment"]["creditCard"]["holder"],
                    "ExpirationDate": data["payment"]["creditCard"]["expirationDate"],
                    "SecurityCode": data["payment"]["creditCard"]["securityCode"],
                    "Brand": data["payment"]["creditCard"]["brand"]
                }
            }
        }
    });
};