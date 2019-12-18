"use strict"
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;
const CryptoJS = require("crypto-js");
const rsa = new RSA();
var crypt = new Crypt();

module.exports.generateKeys = () => {
    return new Promise((resolve, reject) => {
        rsa.generateKeyPair(function(keyPair) {
            const publicKey = keyPair.publicKey;
            const privateKey = keyPair.privateKey;
            resolve({publicKey, privateKey});
        })
    })
}

module.exports.decryptWithPrivate = (privateKey, data, iv, encrypted) => {
    const decrypted = crypt.decrypt(privateKey, encrypted);
    console.log("AES D "+decrypted.message);
    return  decrypted.message;
}

module.exports.encryptWithAes = (data,aesKey) => {
    return new Promise((resolve, reject) => {
        console.log("DATA "+JSON.stringify(data));
        let aesDecTrans = CryptoJS.AES.encrypt(JSON.stringify(data),
            aesKey);
        console.log("DATAE "+aesDecTrans);
        let aesEncTrans = CryptoJS.AES.decrypt(aesDecTrans, aesKey);
        console.log("DATAEeee "+aesEncTrans);
        console.log("DATADEDE "+aesEncTrans.toString(CryptoJS.enc.Utf8));

        resolve(aesDecTrans);
    }).catch((err) => {
        console.error(err);
    });
}