/**
 * Commented attributes are optional by ClearSale and business rule
 * Commented objects are mounted (from a list or such)
 */
module.exports = {
  ClearSale: {
    Orders: {
      Order: {
        ID: null,
        FingerPrint: {
          SessionID: null
        },
        Date: null,
        Email: null,
        // B2B_B2C: null,
        // ShippingPrice: null,
        TotalItems: null,
        TotalOrder: null,
        QtyInstallments: null,
        DeliveryTimeCD: null,
        // QtyItems: null,
        // QtyPaymentTypes: null,
        IP: null,
        // ShippingType: null,
        // Gift: null,
        // GiftMessage: null,
        // Obs: null,
        Status: null,
        // Reanalise: null,
        // Origin: null,
        ReservationDate: null,
        // Country: null,
        // Nationality: null,
        // Product: null,
        // ListTypeID: null,
        // ListID: null,
        BillingData: {
          ID: 1,
          Type: 1,
          LegalDocument1: null,
          // LegalDocument2: null,
          Name: null,
          BirthDate: null,
          Email: null,
          // Gender: null,
          Address: {
            Street: null,
            Number: null,
            // Comp: null,
            County: null,
            City: null,
            State: null,
            Country: null,
            ZipCode: null,
            // Reference: null
          },
          Phones: {
            Phone: [
              // {
              //   /**
              //    * 0: Undefined
              //    * 1: Phone
              //    * 2: Business
              //    * 3: Message
              //    * 4: Billing
              //    * 5: Temporary
              //    * 6: Mobile
              //    */
              //   Type: 0,
              //   DDI: null,
              //   DDD: null,
              //   Number: null,
              //   Extension: null
              // }
            ]
          }
        },
        ShippingData: {/* Equals to billing data */},
        Payments: [
          {
            Payment: {
              Date: null,
              Amount: null,
              PaymentTypeID: null,
              QtyInstallments: null,
              // Interest: null,
              // InterestValue: null,
              CardNumber: null,
              CardBin: null,
              CardEndNumber: null,
              CardType: null,
              CardExpirationDate: null,
              Name: null,
              LegalDocument: null,
              // Nsu: null,
              // Currency: null,
              Address: {
                Street: null,
                Number: null,
                Comp: null,
                County: null,
                City: null,
                State: null,
                Country: null,
                ZipCode: null
              }
            }
          }
        ],
        Items: [
          {
            Item: {
              ID: 1,
              Name: "Flight passage",
              ItemValue: null,
              Qty: 1,
              // GiftTypeID: null,
              // CategoryID: null,
              // CategoryName: null
            }
          }
        ],
        Passengers: {
          Passenger: [
            // {
            //   Name: null,
            //   // FrequentFlyerCard: null,
            //   /**
            //    * 1: CPF
            //    * 2: CNPJ
            //    * 3: RG
            //    * 4: IE
            //    * 5: Passport
            //    * 6: CTPS
            //    * 7: Title of voter
            //    */
            //   LegalDocumentType: null,
            //   LegalDocument: null,
            //   BirthDate: null
            // }
          ]
        },
        Connections: {
          Connection: [
            // {
            //   Company: null,
            //   FlightNumber: null,
            //   FlightDate: null,
            //   Class: null,
            //   From: null,
            //   To: null,
            //   DepartureDate: null,
            //   ArrivalDate: null
            // }
          ]
        },
        // HotelReservations: [
        //   // {
        //   //   HotelReservation: {
        //   //     Hotel: null,
        //   //     City: null,
        //   //     State: null,
        //   //     Country: null,
        //   //     ReservationDate: null,
        //   //     ReservationExpirationDate: null,
        //   //     CheckInDate: null,
        //   //     CheckOutDate: null
        //   //   }
        //   // }
        // ]
      }
    }
  }
};
