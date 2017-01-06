"use strict";

/* istanbul ignore if */
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

const PORT = process.env.PORT || "8080";

let app = require("express")(),
    Payment = require("./payment");

app.use(require("body-parser").json());

app.post("/api/v1/payments/", function (request, response) {
    Payment.create(request.body.order)
        .then(
            (paymentResponse) => {
                Payment.successfulResponse(response, paymentResponse)
            },
            (paymentResponse) => {
                Payment.erroneousResponse(response, paymentResponse)
            }
        );
});

app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}/.`);
});

if (/mocha/.test(process.argv.join())) {
    module.exports = app;
}