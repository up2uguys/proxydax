const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors()); // 🔥 Aktifkan CORS

app.get("/api/proxy/:pair", (req, res) => {  // 🔥 Perbaiki path API
    let pair = req.params.pair.toLowerCase();
    const url = `https://indodax.com/api/${pair}_idr/depth`;

    console.log(`🔍 Fetching from Indodax: ${url}`);

    request({ url, json: true }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).json({
                type: "error",
                message: error ? error.message : "Request failed"
            });
        }
        res.json(body);
    });
});

module.exports = app;
