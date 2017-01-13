"use strict";

/* istanbul ignore if */
if (require("fs").existsSync(".env")) {
  require("dotenv").config();
}

const PORT = process.env.PORT || "8080";

// Load custom prototypes
require("./customPrototypes")();

let app = require("express")(),
  Payment = require("./payment"),
  AntiFraud = require("./antiFraud");

app.use(require("body-parser").json());

app.post("/api/v1/payments/", function (request, response) {
  AntiFraud.check(request.body)
    .then(
      (checkResponse) => {
        let checkResponseData = AntiFraud.successfulResponse(checkResponse);

        if (parseInt(checkResponseData.StatusCode[0])) {
          AntiFraud.erroneousResponse(response, checkResponseData);
        }
        else {
          Payment.create(request.body.order)
            .then(
              (paymentResponse) => {
                Payment.successfulResponse(response, paymentResponse)
              },
              (paymentResponse) => {
                Payment.erroneousResponse(response, paymentResponse)
              }
            );
        }
      },
      (checkResponse) => {
        Payment.erroneousResponse(response, checkResponse);
      }
    );
});

app.listen(PORT, function () {
  console.log(`Server listening on: http://localhost:${PORT}/.`);
});

if (/mocha/.test(process.argv.join())) {
  module.exports = app;
}
