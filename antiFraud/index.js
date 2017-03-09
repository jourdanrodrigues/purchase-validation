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
    csBillingData.Phones.Phone.push(requestBody.order.Customer.Phones[i])
  }

  csOrder.ID = requestBody.order.MerchantOrderId;
  csOrder.IP = requestBody.IP;
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
  csPayment.Name = requestBody.order.Customer.Name;
  csPayment.LegalDocument = requestBody.order.Customer.Identity;
  csPayment.CardNumber = requestBody.order.Payment.CreditCard.CardNumber;
  csPayment.CardBin = csPayment.CardNumber.substr(-6); // First 6 digits of credit card
  csPayment.CardExpirationDate = requestBody.order.Payment.CreditCard.ExpirationDate;

  csOrder.Items[0].Item.ItemValue = amount;

  for (let i = 0; i < requestBody.order.passengers.length; i++) {
    let passenger = requestBody.order.passengers[i];
    csOrder.Passengers.Passenger.push({
      Name: passenger.name,
      LegalDocumentType: documentTypes[passenger.documentType.toRecognize()],
      LegalDocument: passenger.document,
      BirthDate: passenger.birthDate
    })
  }

  for (let i = 0; i < requestBody.order.connections.length; i++) {
    let connection = requestBody.order.connections[i];
    csOrder.Connections.Connection.push({
      Company: connection.company,
      FlightNumber: connection.flightNumber,
      FlightDate: connection.flightDate,
      Class: connection.class,
      From: connection.from,
      To: connection.to,
      DepartureDate: connection.departureDate,
      ArrivalDate: connection.arrivalDate
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
 * @param {String} orderID
 */
function getOrderStatus(orderID) {
  return request({
    method: "POST",
    uri: `${process.env.CLEAR_SALE_API_URL}/GetOrderStatus`,
    form: {
      entityCode: process.env.CLEAR_SALE_ENTITY_CODE,
      orderID: orderID
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
        mainData = data["PackageStatus"] || data["ClearSale"];
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

function orderStatusResponse(requestResponse, orderStatusResponse) {
  let statusInfo = responses.getOrderCode(orderStatusResponse.Orders[0].Order[0].Status[0]);

  requestResponse.statusCode = statusInfo.httpStatus;
  requestResponse.send(statusInfo.data);
}

module.exports = {
  check: check,
  getOrderStatus: getOrderStatus,
  successfulResponse: successfulResponse,
  orderStatusResponse: orderStatusResponse,
  erroneousResponse: erroneousResponse
};
