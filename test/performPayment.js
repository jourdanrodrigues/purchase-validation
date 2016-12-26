'use strict';

let chai = require("chai"),
    should = chai.should(),
    chaiHttp = require("chai-http"),
    server = require("../index");

let status = require("../httpStatus");

chai.use(chaiHttp);

describe("Sale", () => {
    let environmentMerchantId;

    beforeEach(() => {
        environmentMerchantId = process.env.CIELO_MERCHANT_ID;
    });
    afterEach(() => {
        process.env.CIELO_MERCHANT_ID = environmentMerchantId;
    });

    it("should fail to create due to merchant ID not in GUID format", (done) => {
        let orderData = {};

        process.env.CIELO_MERCHANT_ID = "not-the-right-format";

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

    it("should fail to create due to empty data", (done) => {
        let orderData = {};

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("Requisição não pode estar vazia.");
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
                    CardNumber: "4551870000000183",
                    Holder: "Teste Holder",
                    ExpirationDate: "12/2021",
                    SecurityCode: "123",
                    Brand: "Visa"
                }
            }
        };

        // Not ready yet
        process.env.CIELO_MERCHANT_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

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
                    CardNumber: "4551870000000183",
                    Holder: "Teste Holder",
                    ExpirationDate: "12/2021",
                    SecurityCode: "123",
                    SaveCard: "false",
                    Brand: "Visa"
                }
            }
        };

        // Not ready yet
        process.env.CIELO_MERCHANT_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_500_INTERNAL_SERVER_ERROR);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("O ID do vendedor está em formato incorreto.");
                done()
            })
    });

    it("should be created with a credit card token", (done) => {
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

        // Not ready yet
        process.env.CIELO_MERCHANT_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_500_INTERNAL_SERVER_ERROR);
                response.body.should.be.a("object");
                response.body.detail.should.be.eql("O ID do vendedor está em formato incorreto.");
                done()
            })
    });
});