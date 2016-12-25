if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

const PORT = process.env.PORT || "8080";

let app = require("express")(),
    performPayment = require("./performPayment"),
    errorCodes = require("./errorCodes");

app.post("/api/v1/payments/", function (request, response) {
    performPayment()
        .then(
            function () {
                /* Not happened yet */
            },
            (paymentResponse) => {
                let error = errorCodes.cielo[JSON.parse(paymentResponse.error)[0]["Code"]];

                response.statusCode = error.code;
                response.send(error.data);
            }
        );
});

app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}/.`);
});