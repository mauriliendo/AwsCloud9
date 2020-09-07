var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'host',
    user: 'user',
    password: 'password',
    database: 'database'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all attitudes 
app.get('/attitudes', function (req, res) {
    dbConn.query('SELECT * FROM attitudes', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'attitudes list.' });
    });
});
 
 
// Retrieve attitude with id 
app.get('/attitude/:id', function (req, res) {
  
    let attitude_id = req.params.id;
  
    if (!attitude_id) {
        return res.status(400).send({ error: true, message: 'Please provide attitude_id' });
    }
  
    dbConn.query('SELECT * FROM attitudes where id=?', attitude_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'attitudes list.' });
    });
  
});
 
 
// Add a new attitude  
app.post('/attitude', function (req, res) {
  
    let name = req.body.name;
    let description = req.body.description;
  
    if (!name || !description) {
        return res.status(400).send({ error:true, message: 'Please provide name and description' });
    }
  
    dbConn.query("INSERT INTO attitudes SET ? ", { name: name, description: description }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New attitude has been created successfully.' });
    });
});
 
 
//  Update attitude with id
app.put('/attitude', function (req, res) {
  
    let attitude_id = req.body.attitude_id;
    let attitude = req.body.attitude;
  
    if (!attitude_id || !attitude) {
        return res.status(400).send({ error: attitude, message: 'Please provide attitude and attitude_id' });
    }
  
    dbConn.query("UPDATE attitudes SET attitude = ? WHERE id = ?", [attitude, attitude_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'attitude has been deleted successfully.' });
    });
});
 
 
//  Delete attitude
app.delete('/attitude', function (req, res) {
  
    let attitude_id = req.body.attitude_id;
  
    if (!attitude_id) {
        return res.status(400).send({ error: true, message: 'Please provide attitude_id' });
    }
    dbConn.query('DELETE FROM attitudes WHERE id = ?', [attitude_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'attitude has been updated successfully.' });
    });
}); 
 
// set port
app.listen(8888, function () {
    console.log('Node app is running on port 8888');
});
 
module.exports = app;
