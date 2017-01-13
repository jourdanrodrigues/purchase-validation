"use strict";

let chai = require("chai"),
  should = chai.should(),
  chaiHttp = require("chai-http");

let status = require("../assets/httpStatus"),
  server = require("../index"),
  utils = require("../assets/utils");

chai.use(chaiHttp);

describe("General validations for sale", () => {
  let requestData = require("./orderObject"),
    originalRequestData = utils.deepCopy(requestData);

  beforeEach(() => {
    requestData.order.MerchantOrderId = (new Date()).getTime();
  });

  afterEach(() => {
    requestData = utils.deepCopy(originalRequestData);
  });

  it("should fail to create due to merchant ID not in GUID format", (done) => {

    let environmentMerchantId = process.env.CIELO_MERCHANT_ID;
    process.env.CIELO_MERCHANT_ID = "not-the-right-format";

    chai.request(server)
      .post("/api/v1/payments/")
      .send(requestData)
      .end((error, response) => {
        process.env.CIELO_MERCHANT_ID = environmentMerchantId;

        response.should.have.status(status.HTTP_500_INTERNAL_SERVER_ERROR);
        response.body.should.be.a("object");
        response.body.code.should.be.eql("c114");
        response.body.detail.should.be.eql("O ID do vendedor está em formato incorreto.");
        done();
      });
  });
});
