"use strict";

let chai = require("chai"),
    should = chai.should(),
    chaiHttp = require("chai-http");

let status = require("../assets/httpStatus"),
    server = require("../index");

chai.use(chaiHttp);

describe("General validations for sale", () => {
    it("should fail to create due to merchant ID not in GUID format", (done) => {
        let requestData = {
            order: {}
        };

        let environmentMerchantId = process.env.CIELO_MERCHANT_ID;
        process.env.CIELO_MERCHANT_ID = "not-the-right-format";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                process.env.CIELO_MERCHANT_ID = environmentMerchantId;

                response.should.have.status(status.HTTP_500_INTERNAL_SERVER_ERROR);
                response.body.should.be.a("object");
                response.body.code.should.be.eql("114");
                response.body.detail.should.be.eql("O ID do vendedor está em formato incorreto.");
                done();
            });
    });

    it("should fail to create due to empty data", (done) => {
        let requestData = {
            order: {}
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.code.should.be.eql("122");
                response.body.detail.should.be.eql('"MerchantOrderId" é obrigatório.');
                done();
            });
    });

    it("should fail to create due to payment missing", (done) => {
        let requestData = {
            order: {
                MerchantOrderId: "2014111703",
                Customer: {
                    Name: "Comprador Teste"
                }
            }
        };

        chai.request(server)
            .post("/api/v1/payments/")
            .send(requestData)
            .end((error, response) => {
                response.should.have.status(status.HTTP_400_BAD_REQUEST);
                response.body.should.be.a("object");
                response.body.code.should.be.eql("119");
                response.body.detail.should.be.eql("Necessária pelo menos 1 forma de pagamento.");
                done();
            });
    });
});