"use strict";

let responses = require("./responses"),
  utils = require("../assets/utils.js"),
  clearSaleStructure = require("./requestDataStructure"),
  cardBrands = require("./cardBrands"),
  documentTypes = require("./documentTypes"),
  xml2js = require("xml2js"),
  XMLParser = xml2js.parseString,
  XMLBuilder = new xml2js.Builder(),
  request = require("request-promise");

function check(requestBody) {
  let data = utils.deepCopy(clearSaleStructure);

  let dateTimeNow = new Date().toSimpleDateTimeString();
  let amount = requestBody.order.Payment.Amount;
  let csOrder = data.ClearSale.Orders.Order;
  let csBillingData = csOrder.ShippingData = csOrder.BillingData;
  let csBillingAddress = csBillingData.Address;
  let csPayment = csOrder.Payments[0].Payment;

  for (let i = 0; i < requestBody.order.Customer.Phones.length; i++) {
    csBillingData.Phones.push({
      Phone: requestBody.order.Customer.Phones[i]
    })
  }

  csOrder.ID = requestBody.order.MerchantOrderId;
  csOrder.Date = dateTimeNow;
  csOrder.QtyInstallments = requestBody.order.Payment.Installments;
  csOrder.TotalItems = csOrder.TotalOrder = amount;
  csOrder.Email = requestBody.order.Customer.Email;
  csOrder.FingerPrint.SessionID = requestBody.sessionId;
  csOrder.ReservationDate = requestBody.order.reservationDate;

  csBillingAddress.Street = requestBody.order.Customer.Address.Street;
  csBillingAddress.Number = requestBody.order.Customer.Address.Number;
  csBillingAddress.ZipCode = requestBody.order.Customer.Address.ZipCode;
  csBillingAddress.State = requestBody.order.Customer.Address.State;
  csBillingAddress.City = requestBody.order.Customer.Address.City;
  csBillingAddress.County = requestBody.order.Customer.Address.County;
  csBillingAddress.Country = requestBody.order.Customer.Address.Country;
  csBillingAddress.Reference = requestBody.order.Customer.Address.Reference;

  csPayment.Date = dateTimeNow;
  csPayment.QtyInstallments = requestBody.order.Payment.Installments;
  csPayment.Amount = amount;
  csPayment.CardType = cardBrands[requestBody.order.Payment.CreditCard.Brand.toRecognize()] || 4;

  csOrder.Items[0].Item.ItemValue = requestBody.order.unitValue;
  csOrder.Items[0].Item.Qty = requestBody.order.unitQuantity;

  for (let i = 0; i < requestBody.order.passengers.length; i++) {
    let passenger = requestBody.order.passengers[i];
    csOrder.Passengers.push({
      Passenger: {
        Name: passenger.name,
        LegalDocumentType: documentTypes[passenger.documentType.toRecognize()],
        LegalDocument: passenger.document
      }
    })
  }

  for (let i = 0; i < requestBody.order.connections.length; i++) {
    let connection = requestBody.order.connections[i];
    csOrder.Connections.push({
      Connection: {
        Company: connection.company,
        FlightNumber: connection.flightNumber,
        FlightDate: connection.flightDate,
        Class: connection.class,
        From: connection.from,
        To: connection.to,
        DepartureDate: connection.departureDate,
        ArrivalDate: connection.arrivalDate
      }
    })
  }

  return request({
    method: "POST",
    uri: `${process.env.CLEAR_SALE_API_URL}/SendOrders`,
    form: {
      entityCode: process.env.CLEAR_SALE_ENTITY_CODE,
      xml: XMLBuilder.buildObject(data)
    }
  });
}

/**
 * @param paymentResponse
 * @return {{
 *  TransactionID, StatusCode[]
 * }}
 */
function successfulResponse(paymentResponse) {
  let mainData = null;

  XMLParser(paymentResponse,
    /**
     * @param error
     * @param {{
     *  string: {_}
     * }} data
     */
    (error, data) => {
      XMLParser(data.string._, (error, data) => {
        mainData = data["PackageStatus"];
      });
    }
  );

  return mainData;
}

/**
 * @param response
 * @param {{StatusCode: []}} checkResponseData
 */
function erroneousResponse(response, checkResponseData) {
  let errorData = responses.getError(checkResponseData.StatusCode[0]);
  response.statusCode = errorData.httpStatus;
  response.send(errorData.data)
}

module.exports = {
  check: check,
  successfulResponse: successfulResponse,
  erroneousResponse: erroneousResponse
};
