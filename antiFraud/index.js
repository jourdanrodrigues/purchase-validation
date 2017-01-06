"use strict";

let status = require("../assets/httpStatus"),
    xml2js = require("xml2js"),
    XMLParser = xml2js.parseString,
    XMLBuilder = new xml2js.Builder(),
    request = require("request-promise");

function check(requestBody) {
    /*
     {
     ClearSale: {
     Orders: {
     Order: {
     ID, Date, Email, [B2B_B2C], [ShippingPrice], TotalItems, TotalOrder, [QtyInstallments], [ListID],
     [DeliveryTimeCD], [QtyItems], [QtyPaymentTypes], [IP], [ShippingType], [Gift], [GiftMessage],
     [Obs], [Status], [Reanalise], [Origin], [ReservationDate], [Country], [Nationality], [ListTypeID],
     [Product],
     FingerPrint: {
     SessionID
     },
     BillingData: {
     ID, Type, LegalDocument1, [LegalDocument2], Name, [BirthDate], [Email], [Gender],
     Address: {
     Street, Number, [Comp], County, City, State, [Country], ZipCode, [Reference]
     },
     Phones: {
     Phone: {
     Type, [DDI], DDD, Number, [Extension]
     }
     }
     },
     ShippingData: {
     ID, Type, LegalDocument1, [LegalDocument2], Name, [BirthDate], [Email], [Gender],
     Address: {
     Street, Number, [Comp], County, City, State, [Country], ZipCode, [Reference]
     },
     Phones: {
     Phone: {
     Type, [DDI], DDD, Number, [Extension]
     }
     }
     },
     Payments: {
     Payment: {
     [Sequential], Date, Amount, PaymentTypeID, [QtyInstallments], [Interest], [InterestValue],
     [CardNumber], [CardBin], [CardEndNumber], [CardType], [CardExpirationDate], [Name],
     [LegalDocument], [Nsu], [Currency],
     Address: {
     [Street], [Number], [Comp], [County], [City], [State], [Country], [ZipCode]
     }
     }
     },
     Items: {
     Item: {
     ID, Name, ItemValue, Qty, [GiftTypeID], [CategoryID], [CategoryName]
     }
     },
     Passengers: {
     Passenger: {
     Name, [FrequentFlyerCard], LegalDocumentType, LegalDocument, [BirthDate]
     }
     },
     Connections: {
     Connection: {
     Company, FlightNumber, FlightDate, Class, From, To, DepartureDate, ArrivalDate
     }
     },
     HotelReservations: {
     HotelReservation: {
     Hotel, City, State, Country, ReservationDate, ReservationExpirationDate, CheckInDate,
     CheckOutDate
     }
     }
     }
     }
     }
     }
     */
    let dateTimeNow = new Date().toISOString().slice(0, -5);
    let amount = requestBody.order.Payment.Amount;
    let data = { // Mock the object
        ClearSale: {
            Orders: {
                Order: {
                    ID: requestBody.order.MerchantOrderId,
                    Date: dateTimeNow,
                    Email: requestBody.order.Customer.Email,
                    TotalItems: amount,
                    TotalOrder: amount,
                    FingerPrint: {
                        SessionId: requestBody.sessionId
                    },
                    BillingData: {
                        Address: {},
                        Phones: {
                            Phone: {}
                        }
                    },
                    ShippingData: {
                        Address: {},
                        Phones: {
                            Phone: {}
                        }
                    },
                    Payments: {
                        Payment: {
                            Date: dateTimeNow,
                            Amount: amount,
                            Address: {}
                        }
                    },
                    Items: {
                        Item: {}
                    },
                    Passengers: {
                        Passenger: {}
                    },
                    Connections: {
                        Connection: {}
                    },
                    HotelReservations: {
                        HotelReservation: {}
                    }
                }
            }
        }
    };

    return request({
        method: 'POST',
        uri: 'http://homologacao.clearsale.com.br/integracaov2/service.asmx/SendOrders2',
        form: {
            entityCode: process.env.CLEAR_SALE_ENTITY_CODE,
            pedidos: XMLBuilder.buildObject(data)
        }
    });
}

function endResponse(requestResponse, paymentResponse) {
    requestResponse.statusCode = status.HTTP_200_OK;

    XMLParser(paymentResponse, function (error, result) {
        XMLParser(result.string._, function (error, result2) {
            requestResponse.send(result2);
        });
    });
}

module.exports = {
    check: check,
    endResponse: endResponse
};