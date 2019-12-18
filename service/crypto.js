"use strict"
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

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
    console.log("AES cryptografada com a chave publica: " + data)
    return new Promise((resolve, reject) => {   
        const decrypted = crypt.decrypt(privateKey, encrypted);
        resolve(decrypted.message);
    })
}

module.exports.encryptWithAes = (aesKey, data) => {
    return new Promise((resolve, reject) => {
        const encryptedData = 123;
    })
}