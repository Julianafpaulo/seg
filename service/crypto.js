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
    return new Promise((resolve, reject) => {   
        const decrypted = crypt.decrypt(privateKey, encrypted);
        console.log("AES D "+decrypted.message);
        resolve(decrypted.message);
    })
}

module.exports.encryptWithAes = (data,aesKey) => {
    return new Promise((resolve, reject) => {
        console.log("DATA "+JSON.stringify(data));
        let aesDecTrans = CryptoJS.AES.encrypt(JSON.stringify(data), aesKey, {iv: "6162636465666768696a6b6c6d6e6f7",mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7});
        console.log("DATAE "+aesDecTrans);
        let aesEncTrans = CryptoJS.AES.decrypt(aesDecTrans, aesKey, {iv: "6162636465666768696a6b6c6d6e6f7",mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7});
        console.log("DATAEeee "+aesEncTrans);
        console.log("DATADEDE "+aesEncTrans.toString(CryptoJS.enc.Utf8));

        resolve(aesDecTrans.toString());
    }).catch((err) => {
        console.error(err);
    });
}