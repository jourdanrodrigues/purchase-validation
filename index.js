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
  AntiFraud = require("./antiFraud"),
  sleep = require("./assets/utils").sleep;

app.use(require("body-parser").json());

app.post("/api/v1/payments/", function (request, response) {
  AntiFraud.check(request.body)
    .then(
      (checkResponse) => {
        let checkResponseData = AntiFraud.successfulResponse(checkResponse);

        if (parseInt(checkResponseData.StatusCode[0])) {
          AntiFraud.erroneousResponse(response, checkResponseData);
        }
        else if (checkResponseData.Orders[0].Order[0].Status[0] == "NVO") {
          sleep(8).then( // TODO Use async/await on this promise
            () => {
              AntiFraud.getOrderStatus(request.body.order.MerchantOrderId)
                .then(
                  (orderStatusResponse) => {
                    let checkOrderStatusResponseData = AntiFraud.successfulResponse(orderStatusResponse);

                    if (checkOrderStatusResponseData.Orders[0].Order[0].Status[0].startsWith("AP")) {
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
                    else {
                      AntiFraud.orderStatusResponse(response, checkOrderStatusResponseData)
                    }
                  },
                  (orderStatusResponse) => {
                    Payment.erroneousResponse(response, orderStatusResponse);
                  }
                );
            },
            () => undefined); // Think nothing could go wrong with the "sleep" promise
        }
        else {
          AntiFraud.orderStatusResponse(response, checkResponseData);
        }
      },
      (checkResponse) => {
        Payment.erroneousResponse(response, checkResponse);
      }
    );
});

app.get("/api/v1/orders/:id/status/", function (request, response) {
  AntiFraud.getOrderStatus(request.params.id)
    .then(
      (orderStatusResponse) => {
        let checkOrderStatusResponseData = AntiFraud.successfulResponse(orderStatusResponse);
        AntiFraud.orderStatusResponse(response, checkOrderStatusResponseData);
      },
      (orderStatusResponse) => {
        AntiFraud.erroneousResponse(response, orderStatusResponse);
      }
    );
});

app.listen(PORT, function () {
  console.log(`Server listening on: http://localhost:${PORT}/.`);
});

if (/mocha/.test(process.argv.join())) {
  module.exports = app;
}
