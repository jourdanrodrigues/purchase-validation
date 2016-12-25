'use strict';

let status = require("./httpStatus");

module.exports = {
    "cielo" : {
        114: {
            code: status.HTTP_500_INTERNAL_SERVER_ERROR,
            data: {
                detail: "O ID do vendedor está em formato incorreto."
            }
        }
    }
};