'use strict';

let chai = require("chai"),
    should = chai.should(),
    chaiHttp = require("chai-http");

let status = require("../httpStatus"),
    server = require("../index");

chai.use(chaiHttp);

describe("General validations for sale", () => {
    it("should fail to create due to merchant ID not in GUID format", (done) => {
        let orderData = {};

        let environmentMerchantId = process.env.CIELO_MERCHANT_ID;
        process.env.CIELO_MERCHANT_ID = "not-the-right-format";

        chai.request(server)
            .post("/api/v1/payments/")
            .send(orderData)
            .end((error, response) => {
                process.env.CIELO_MERCHANT_ID = environmentMerchantId;

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
                response.body.detail.should.be.eql('"MerchantOrderId" é obrigatório.');
                done();
            });
    });
});