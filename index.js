"use strict";

/* istanbul ignore if */
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

const PORT = process.env.PORT || "8080";

let app = require("express")(),
    performPayment = require("./performPayment"),
    errorCodes = require("./codes/error"),
    successCodes = require("./codes/success");

app.use(require('body-parser').json());

app.post("/api/v1/payments/", function (request, response) {
    performPayment(request.body)
        .then(
            /**
             * @param {{
             *  Payment: {
             *      ReturnCode
             *  }
             * }} paymentResponse
             */
            (paymentResponse) => {
                let successInfo = successCodes("cielo", paymentResponse);

                response.statusCode = successInfo.httpStatus;
                response.send(successInfo.data)
            },
            /**
             * @param {{
             *  error: {Code}
             * }} paymentResponse
             */
            (paymentResponse) => {
                let errorInfo = errorCodes("cielo", paymentResponse);

                response.statusCode = errorInfo.httpStatus;
                response.send(errorInfo.data);
            }
        );
});

app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}/.`);
});

if (/mocha/.test(process.argv[1])) {
    module.exports = app;
}