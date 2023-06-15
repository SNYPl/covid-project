// const data = require("./data");
const https = require("https");

exports.dashboard = async (req, res, next) => {
  const url =
    "https://api.apify.com/v2/key-value-stores/SmuuI0oebnTWjRTUh/records/LATEST?disableRedirect=true";

  https
    .get(url, (response) => {
      let dataStatic = [];

      response.on("data", (chunk) => {
        dataStatic.push(chunk);
      });

      response.on("end", (resp) => {
        const covidStatic = JSON.parse(Buffer.concat(dataStatic).toString());
        try {
          res.status(200).send({
            ...covidStatic,
          });
        } catch (err) {
          res.send(err);
        }
      });
    })
    .on("error", (err) => {
      console.log(err);
      console.log("Error: ", err.message);
    });
};
