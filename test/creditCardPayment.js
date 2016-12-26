'use strict';

let chai = require("chai"),
    should = chai.should(),
    chaiHttp = require("chai-http");

let status = require("../httpStatus"),
    server = require("../index");

chai.use(chaiHttp);

describe("Credit card sale", () => {
    it("should fail due to unauthorized credit card", (done) => {
        let orderData = {
            MerchantOrderId: "2014111703",
            Customer: {
                Name: "Comprador Teste"
            },
            Payment: {
                Type: "CreditCard",
                Amount: 15700,
                Installments: 1,
                CreditCard: {
                    CardNumber: "4551870000000183",
                    Holder: "Teste Holder",
                    ExpirationDate: "12/2021",
                    SecurityCode: "123",
                    Brand: "Visa"
                }
            }
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.data.should.be.a("object");
                response.body.detail.should.be.eql("Transação não autorizada para este cartão.");
                done();
            });
    });

    it("should be created in a simple transaction with credit card", (done) => {
        let orderData = {
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
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_201_CREATED);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("Operação realizada com sucesso.");
                done();
            });
    });

    it("should be created in a complete transaction with credit card", (done) => {
        let orderData = {
            MerchantOrderId: "2014111703",
            Customer: {
                Name: "Comprador Teste",
                Identity: "11225468954",
                IdentityType: "CPF",
                Email: "compradorteste@teste.com",
                Birthdate: "1991-01-02",
                Address: {
                    Street: "Rua Teste",
                    Number: "123",
                    Complement: "AP 123",
                    ZipCode: "12345987",
                    City: "Rio de Janeiro",
                    State: "RJ",
                    Country: "BRA"
                },
                DeliveryAddress: {
                    Street: "Rua Teste",
                    Number: "123",
                    Complement: "AP 123",
                    ZipCode: "12345987",
                    City: "Rio de Janeiro",
                    State: "RJ",
                    Country: "BRA"
                }
            },
            Payment: {
                Type: "CreditCard",
                Amount: 15700,
                ServiceTaxAmount: 0,
                Installments: 1,
                Interest: "ByMerchant",
                Capture: true,
                Authenticate: false,
                SoftDescriptor: "tst",
                Currency: "BRL",
                CreditCard: {
                    CardNumber: "0000000000000004",
                    Holder: "Teste Holder",
                    ExpirationDate: "12/2021",
                    SecurityCode: "123",
                    SaveCard: "false",
                    Brand: "Visa"
                }
            }
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_201_CREATED);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("Operação realizada com sucesso.");
                done()
            })
    });

    it("should fail due to credit card by token not found", (done) => {
        let orderData = {
            MerchantOrderId: "2014111706",
            Customer: {
                Name: "Comprador Teste"
            },
            Payment: {
                Type: "CreditCard",
                Amount: 100,
                Installments: 1,
                SoftDescriptor: "tst",
                CreditCard: {
                    CardToken: "6e1bf77a-b28b-4660-b14f-455e2a1c95e9",
                    SecurityCode: "262",
                    Brand: "Visa"
                }
            }
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("Cartão de crédito não encontrado.");
                done()
            })
    });
});