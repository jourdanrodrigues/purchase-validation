"use strict";

let chai = require("chai"),
    should = chai.should(),
    chaiHttp = require("chai-http");

let status = require("../../httpStatus"),
    server = require("../../index"),
    utils = require("../../utils");

chai.use(chaiHttp);

describe("Credit card sale", () => {
    let requestData = {
            order: {
                MerchantOrderId: "2014111703",
                Customer: {
                    Name: "Comprador Teste"
                },
                Payment: {
                    Type: "CreditCard",
                    Amount: 15700,
                    Installments: 1,
                    CreditCard: {
                        CardNumber: "0000000000000001",
                        Holder: "Teste Holder",
                        ExpirationDate: "12/2021",
                        SecurityCode: "123",
                        Brand: "Visa"
                    }
                }
            }
        },
        originalRequestData = utils.deepCopy(requestData);

    afterEach(() => {
        // If the value doesn't come back to original, it passes to the next test with the set value
        requestData = utils.deepCopy(originalRequestData);
    });

    it("should fail due to expired credit card", (done) => {
        requestData.order.Payment.CreditCard.CardNumber = "0000000000000003";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.data.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("57");
                response.body.detail.should.be.eql("Cartão de crédito expirado.");
                done();
            });
    });

    it("should fail due to unauthorized credit card", (done) => {
        requestData.order.Payment.CreditCard.CardNumber = "0000000000000002";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.data.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("2");
                response.body.detail.should.be.eql("Cartão de crédito não autorizado.");
                done();
            });
    });

    it("should fail due to locked credit card", (done) => {
        requestData.order.Payment.CreditCard.CardNumber = "0000000000000005";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.data.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("78");
                response.body.detail.should.be.eql("Cartão de crédito bloqueado.");
                done();
            });
    });

    it("should fail due to cancelled credit card", (done) => {
        requestData.order.Payment.CreditCard.CardNumber = "0000000000000007";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.data.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("77");
                response.body.detail.should.be.eql("Cartão de crédito cancelado.");
                done();
            });
    });

    it("should fail due to problems with the credit card", (done) => {
        requestData.order.Payment.CreditCard.CardNumber = "0000000000000008";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.data.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("70");
                response.body.detail.should.be.eql("Problemas com o cartão de crédito.");
                done();
            });
    });

    it("should fail due to timeout with credit card (not authorized)", (done) => {
        requestData.order.Payment.CreditCard.CardNumber = "0000000000000006";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.data.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("99");
                response.body.detail.should.be.eql("Não autorizada.");
                done();
            });
    });

    it("should be created in a simple transaction with credit card", (done) => {
        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_201_CREATED);
                response.body.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("4");
                response.body.detail.should.be.eql("Operação realizada com sucesso.");
                done();
            });
    });

    it("should be created in a authenticated transaction with credit card", (done) => {
        requestData.order.Customer.Authenticate = true;

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_201_CREATED);
                response.body.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("4");
                response.body.detail.should.be.eql("Operação realizada com sucesso.");
                done();
            });
    });

    it("should be created in a complete transaction with credit card", (done) => {
        requestData.order.Customer.Identity = "11225468954";
        requestData.order.Customer.IdentityType = "CPF";
        requestData.order.Customer.Email = "compradorteste@teste.com";
        requestData.order.Customer.Birthdate = "1991-01-02";
        requestData.order.Payment.ServiceTaxAmount = 0;
        requestData.order.Payment.Interest = "ByMerchant";
        requestData.order.Payment.Capture = true;
        requestData.order.Payment.Authenticate = false;
        requestData.order.Payment.SoftDescriptor = "tst";
        requestData.order.Payment.Currency = "BRL";
        requestData.order.Payment.CreditCard.SaveCard = "false";
        requestData.order.Customer.Address = {
            Street: "Rua Teste",
            Number: "123",
            Complement: "AP 123",
            ZipCode: "12345987",
            City: "Rio de Janeiro",
            State: "RJ",
            Country: "BRA"
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_201_CREATED);
                response.body.should.be.a("object");
                response.body.data.Payment.ReturnCode.should.be.eql("6");
                response.body.detail.should.be.eql("Operação realizada com sucesso.");
                done()
            })
    });

    it("should fail due to credit card by token not found", (done) => {
        requestData.order.Payment.CreditCard = {
            CardToken: "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
            SecurityCode: "262",
            Brand: "Visa"
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.code.should.be.eql("130");
                response.body.detail.should.be.eql("Cartão de crédito não encontrado.");
                done()
            })
    });
});