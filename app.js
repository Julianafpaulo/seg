const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'application',
	password: 'application',
	database: 'seginfo'
});


const student = require('./service/student');
const crypto = require('./service/crypto');

let rsaPublicKey = null;
let rsaPrivateKey = null;
let aesKey = null;
let data1 = null;
let iv = null;

app.get('/getPublicKey', function(req, res) {
	crypto.generateKeys().then((result) => {
		rsaPublicKey = result.publicKey;
		rsaPrivateKey = result.privateKey;
		res.send(rsaPublicKey);
	}).catch((err) => {
		console.log(err);
		return res.result(500).send();
	})
});

app.get('/students', function(req, res) {
	const rsaEncryptedAesKey = req.header('rsaEncryptedAesKey')
	const iv = req.header('iv')
	const encrypted = req.header('encrypted')
	crypto.decryptWithPrivate(rsaPrivateKey, rsaEncryptedAesKey, iv, encrypted).then((result) => {
		aesKey = result;
	})

	student.listStudents(connection, aesKey)
		.then((result) => {
			console.log("AESKEY" + aesKey);
			crypto.encryptWithAes(result, aesKey,iv).then((result1) => {
				res.send(result1.toString());
			}).catch((err) => {
				console.error(err);
				return res.status(500).send();
			});;
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).send();
		});
});

app.get('/student/:id', function(req, res) {
	student.getStudent(connection, req.params.id)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).send();
		});
});

app.post('/student', function(req, res) {
	student.createStudent(connection, req.body)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).send();
		});
});

app.put('/student', function(req, res) {
	student.editStudent(connection, req.body)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).send();
		});
})

app.listen(8080, function() {
	connection.connect((err) => {
		if(err){
			console.error('error connecting: ' + err.stack);
			return;
		}
		
		console.log('connected as id ' + connection.threadId);
	});


	crypto.generateKeys().then((keys) => {
		rsaPrivateKey = keys.privateKey;
		rsaPublicKey = keys.publicKey;
	})
	.catch((err) => {
		console.log(err);
	});
	console.log("Example app listening");
});