let chai = require("chai"),
    should = chai.should(),
    chaiHttp = require("chai-http"),
    server = require("../index");

let status = require("../httpStatus");

chai.use(chaiHttp);

let orderData = {
    orderId: "2014111703",
    customer: {
        name: "Comprador Teste"
    },
    payment: {
        type: "CreditCard",
        amount: 15700,
        installments: 1,
        creditCard: {
            cardNumber: "4551870000000183",
            holder: "Teste Holder",
            expirationDate: "12/2021",
            securityCode: "123",
            brand: "Visa"
        }
    }
};

describe("Payments", () => {
    it("should be failing due to unfinished integration", (done) => {
        chai.request(server)
            .post("/api/v1/payments/")
            .set('content-type', 'application/json')
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_412_PRECONDITION_FAILED);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("O ID do vendedor está em formato incorreto.");
                done();
            });
    });
});