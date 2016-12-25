let status = require("./httpStatus");

module.exports = {
    "cielo" : {
        114: {
            code: status.HTTP_412_PRECONDITION_FAILED,
            data: {
                detail: "O ID do vendedor está em formato incorreto."
            }
        }
    }
};