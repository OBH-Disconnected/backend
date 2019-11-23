var r = require('jsrsasign');
var fs = require('fs')
var path = require('path')
const { Certificate } = require("@fidm/x509")

const forge = require("node-forge")
const { pki } = forge;

// var r = require('jsrsasign-util');


class AuthService {
    constructor() {

    }

    sign(body) {
        var oHeader = { alg: 'RS256', typ: 'JWT' };
        var cert = Certificate.fromPEM(fs.readFileSync(path.join(__dirname, "../../credentials", "certifcate-2.crt")))
        var fingerprint = pki.certificateFromPem(fs.readFileSync(path.join(__dirname, "../../credentials", "certifcate-2.crt")))
        var sdfsdf = pki.getPublicKeyFingerprint(fingerprint.publicKey, {
            md: forge.md.sha256.create(),
            encoding: 'hex'
        })
        sdfsdf = Buffer.from(sdfsdf).toString('base64');
        oHeader["kid"] = cert.subjectKeyIdentifier
        oHeader["x5u"] = "http://quizzer.ct8.pl/cert2.crt"
        oHeader["x5t#S256"] = sdfsdf
        console.log(oHeader)
        var prvKey = r.KEYUTIL.getKey(r.KEYUTIL.getKeyFromCSRPEM(fs.readFileSync(path.join(__dirname, "../../credentials", "certifcate-3.txt"), "utf-8")));
        console.log(prvKey)
        var sJWS = r.KJUR.jws.JWS.sign("RS256", JSON.stringify(oHeader), "{}", prvKey);
        console.log(sJWS)
    }
}


module.exports = AuthService