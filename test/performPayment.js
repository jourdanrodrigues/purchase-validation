'use strict';

let chai = require("chai"),
    should = chai.should(),
    chaiHttp = require("chai-http"),
    server = require("../index");

let status = require("../httpStatus");

chai.use(chaiHttp);

describe("Payments", () => {
    let environmentMerchantId;

    beforeEach(() => {
        environmentMerchantId = process.env.CIELO_MERCHANT_ID;
    });
    afterEach(() => {
        process.env.CIELO_MERCHANT_ID = environmentMerchantId;
    });

    it("should fail due to merchant ID not in GUID format", (done) => {
        let orderData = {};

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

    it("should be failing due to unfinished integration (simple transaction)", (done) => {
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

    it("should be failing due to unfinished integration (complete transaction)", (done) => {
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
    })
});