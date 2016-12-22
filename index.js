if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

const PORT = process.env.PORT || "8080";

let http = require("http");

function handleRequest(request, response) {
    response.end(`Path Hit: ${request.url}`);
}

let server = http.createServer(handleRequest);

server.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}/.`);
});