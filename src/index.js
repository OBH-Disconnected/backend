var express = require("express")
var AuthService = require("./services/AuthService")
const app = express();
var https = require('https')
var fs = require('fs')

var authService = new AuthService();



app.get("/", (req, res) => {
    var body = {
        "requestHeader": {
            "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "userAgent": "string",
            "ipAddress": "string",
            "sendDate": "2019-11-23T15:58:33.667Z",
            "tppId": "string",
            "isCompanyContext": true,
            "psuIdentifierType": "string",
            "psuIdentifierValue": "string",
            "psuContextIdentifierType": "string",
            "psuContextIdentifierValue": "string"
        },
        "response_type": "string",
        "client_id": "string",
        "redirect_uri": "string",
        "scope": "string",
        "scope_details": {
            "privilegeList": [
                {
                    "accountNumber": "string",
                    "ais-accounts:getAccounts": {
                        "scopeUsageLimit": "single"
                    },
                    "ais:getAccount": {
                        "scopeUsageLimit": "single"
                    }
                }
            ],
            "scopeGroupType": "ais-accounts",
            "consentId": "string",
            "scopeTimeLimit": "2019-11-23T15:58:33.668Z",
            "throttlingPolicy": "psd2Regulatory"
        },
        "state": "string"
    }
    var options = {
        hostname: 'https://api-obh.kir.pl',
        port: 80,
        path: '/v2_1_3.1/auth/v2_1_3.1/authorize',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': ""
        },
        key: fs.readFileSync(path.join(__dirname, "../credentials", "certifcate-3.pem")),
        cert: fs.readFileSync(path.join(__dirname, "../credentials", "certifcate-1.pem")),
        rejectUnauthorized: false,
        body: JSON.stringify(body)
    };

    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            console.log(data)
        });
    });
})

app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);