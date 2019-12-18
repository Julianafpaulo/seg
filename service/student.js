"use strict";


module.exports.listStudents = (connection, aesKey) => {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM students', (error, result, fields) => {
			if(error){
				reject(error);
				return;
			}
			
			resolve(result);
		});
	});
};

module.exports.getStudent = (connection, id) => {
	return new Promise((resolve, reject) => {
		connection.query('SELECT * FROM students WHERE id = ? LIMIT 1', [id], (error, result, fields) => {
			if(error){
				reject(error);
				return;
			}
			if(result.length > 0)
				resolve(result[0]);
			else 
				resolve({});
		});
	});
};

module.exports.createStudent = (connection, student) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'INSERT INTO students(name, student_registration, email, phone) VALUES (?, ?, ?, ?)', 
			[student.name, student.student_registration, student.email, student.phone], 
			(error, result, fields) => {
				if(error){
					reject(error);
					return;
				}
				resolve(result);
			}
		)
	});
};

module.exports.editStudent = (connection, student) => {
	return new Promise((resolve, reject) => {
		connection.query(
			'UPDATE students SET name = ?, student_registration = ?, email = ?, phone = ? WHERE id = ?', 
			[student.name, student.student_registration, student.email, student.phone, student.id], 
			(error, result, fields) => {
				if(error){
					reject(error);
					return;
				}
				resolve(result);
			}
		)
	});
};

