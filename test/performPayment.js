'use strict';

let chai = require("chai"),
    should = chai.should(),
    chaiHttp = require("chai-http"),
    server = require("../index");

let status = require("../httpStatus");

chai.use(chaiHttp);

describe("Payments", () => {
    it("should be failing due to unfinished integration (simple transaction)", (done) => {
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

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_500_INTERNAL_SERVER_ERROR);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("O ID do vendedor está em formato incorreto.");
                done();
            });
    });

    it("should be failing due to unfinished integration (complete transaction)", (done) => {
        let orderData = {
            orderId: "2014111703",
            customer: {
                name: "Comprador Teste",
                identity: "11225468954",
                identityType: "CPF",
                email: "compradorteste@teste.com",
                birthdate: "1991-01-02",
                address: {
                    street: "Rua Teste",
                    number: "123",
                    complement: "AP 123",
                    zipCode: "12345987",
                    city: "Rio de Janeiro",
                    state: "RJ",
                    country: "BRA"
                }
            },
            payment: {
                type: "CreditCard",
                amount: 15700,
                installments: 1,
                serviceTaxAmount: 0,
                interest: "ByMerchant",
                capture: true,
                authenticate: false,
                softDescriptor: "tst",
                creditCard: {
                    cardNumber: "4551870000000183",
                    holder: "Teste Holder",
                    expirationDate: "12/2021",
                    securityCode: "123",
                    brand: "Visa",
                    saveCard: "false"
                }
            }
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_500_INTERNAL_SERVER_ERROR);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("O ID do vendedor está em formato incorreto.");
                done()
            })
    })
});