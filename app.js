const express = require('express');
const mysql = require('mysql');
const crypto_1 = require("crypto");

const app = express();
app.use(express.json());
const connection = mysql.createConnection({
	host: '192.168.100.54',
	user: 'application',
	password: 'application',
	database: 'seginfo'
});

const unencryptedMasterKey = crypto_1.randomBytes(32);

const student = require('./service/student');


app.get('/', function(req, res) {
	res.send("Hello World!");
});

app.get('/students', function(req, res) {
	student.listStudents(connection, unencryptedMasterKey)
		.then((result) => {
			res.send(result);
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
	console.log("Example app listening");
});