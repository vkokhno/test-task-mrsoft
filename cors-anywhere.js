const cors_proxy = require("cors-anywhere");
// Listen on a specific host via the HOST environment variable
const host = "0.0.0.0";
// Listen on a specific port via the PORT environment variable
const port = 8181;

cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
  })
  .listen(port, host, function () {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
