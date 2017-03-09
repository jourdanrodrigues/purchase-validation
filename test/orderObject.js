let nowDateObject = new Date();

// The upper cases DO matter!
module.exports = {
  sessionId: "123",
  order: {
    MerchantOrderId: "some_id", // Might be changed in every test due to ClearSale check
    reservationDate: nowDateObject.toSimpleDateTimeString(),
    unitValue: 15700,
    unitQuantity: 1,
    passengers: [
      {
        name: "Fly Peterson",
        documentType: "CPF",
        document: "12345678912",
        birthDate: "1996-01-15"
      }
    ],
    connections: [
      {
        company: "Azul",
        flightNumber: 1,
        flightDate: "2017-01-15T21:40:00",
        class: "Economic",
        to: "LHR",
        from: "GRU",
        departureDate: "2017-01-15T21:40:00",
        arrivalDate: "2017-01-16T00:40:00"
      }
    ],
    Customer: {
      Name: "Comprador Teste",
      Phones: [
        {
          DDD: 85,
          Number: "985858585"
        }
      ],
      Address: {
        Street: "Rua Miguel de Paiva",
        Number: "606",
        Complement: "",
        County: "Santa Teresa",
        ZipCode: "20251-370",
        City: "Rio de Janeiro",
        State: "RJ",
        Country: "BRA"
      }
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
  }
};
