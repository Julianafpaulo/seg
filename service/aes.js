"use strict";
const client_node_1 = require("@aws-crypto/client-node");
const crypto_1 = require("crypto");
const unencryptedMasterKey = crypto_1.randomBytes(32);

async function aesEncryptTest ( cleartext) {

    const keyName = 'aes-name';
    const keyNamespace = 'aes-namespace';
     const wrappingSuite = client_node_1.RawAesWrappingSuiteIdentifier.AES256_GCM_IV12_TAG16_NO_PADDING;
    const keyring = new client_node_1.RawAesKeyringNode({ keyName, keyNamespace, unencryptedMasterKey, wrappingSuite });

    /* hash a partir dos dados
    var data = "do shash'owania";
    var crypto = require('crypto');
    crypto.createHash('md5').update(data).digest("hex");
     hash a partir dos dados
    */
    const context = {
        stage: 'demo',
        purpose: 'simple demonstration app'
    };
    const  { result, message }  = await client_node_1.encrypt(keyring, cleartext, { encryptionContext: context });
    console.log(unencryptedMasterKey);
    console.log(result);
    let json1 = result.toString('utf8');
    const { plaintext, messageHeader } = await client_node_1.decrypt(keyring, result);
    console.log(plaintext);
    let json2 = plaintext.toString('utf8');
    return {json1,json2};
};
exports.aesEncryptTest= aesEncryptTest;

module.exports.aesDecryptTest = ( text,  unencryptedMasterKey) => {
    const keyName = 'aes-name';
    const keyNamespace = 'aes-namespace';
    const wrappingSuite = client_node_1.RawAesWrappingSuiteIdentifier.AES256_GCM_IV12_TAG16_NO_PADDING;
    const keyring = new client_node_1.RawAesKeyringNode({ keyName, keyNamespace, unencryptedMasterKey, wrappingSuite });

    const context = {
        stage: 'demo',
        purpose: 'simple demonstration app',
    };

    const plaintext = client_node_1.decrypt(keyring, result);

    return { plaintext, result, cleartext };
};
