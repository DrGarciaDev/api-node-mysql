const { request, response } = require('express');
const { mysqlDbConnection } = require('../database/config-mysql');

const getCustomers = (Request = request, Response = response) => {
    // recibe parámetros en la url por el método get 
    // const { q, nombre } = Request.query;

    // Realizar una consulta
    $query = 'SELECT * from customers';

    mysqlDbConnection.query($query, function(err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        Response.json({
            msg: 'GET Customers MySQL - desde controller',
            // q: q,
            // nombre: nombre,
            filas: rows,
            // fields: fields
        });
        console.log("Consulta ejecutada con éxito:", rows);
    });
}

const postCustomers = (Request = request, Response = response) => {
    const body = Request.body;
    const { name, email, address, phone } = Request.body;

    // Realizar una consulta
    var query = "INSERT INTO customers (name, email, address, phone) VALUES ?";
    var values = [
        [name, email, address, phone]
    ];
    mysqlDbConnection.query(query, [values], function(err, result, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            throw err;
        }

        console.log("1 record inserted, ID: " + result.insertId);

        Response.json({
            msg: 'POST Customers - desde controller',
            body: body,
            result: result,
        });

        console.log("Consulta ejecutada con éxito:", result);
    });
}
const putCustomers = (Request = request, Response = response) => {
    const id_customer = Request.params.customer_id;
    const { name, email, address, phone } = Request.body;

    // Realizar una consulta
    var query = "UPDATE customers SET ? WHERE ?";
    var values = [{
            name: name,
            email: email,
            address: address,
            phone: phone
        },
        {
            id: id_customer
        }
    ];

    const sqlquery = mysqlDbConnection.query(query, values, function(err, result, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            throw err;
        }

        console.log("Resultado de la ejecución: " + result.message);

        Response.json({
            msg: 'PUT Customers - desde controller',
            id: id_customer,
            result: result,
        });

        console.log("Consulta ejecutada con éxito:", result);
    });

    console.log(sqlquery);
}

const getCustomer = (Request = request, Response = response) => {
    const id_customer = Request.params.customer_id;
    let query = "SELECT * FROM customers WHERE id = ?";

    const sqlquery = mysqlDbConnection.query(query, id_customer, function(err, result, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            throw err;
        }

        console.log("Resultado de la ejecución: " + result);

        Response.json({
            msg: 'GET customer - desde controller',
            id: id_customer,
            result: result,
        });

        console.log("Consulta ejecutada con éxito:", result);
    });

    console.log(sqlquery);
}

const patchCustomers = (Request = request, Response = response) => {
    Response.json({
        msg: 'PATCH Customers - desde controller'
    });
}

const deleteCustomers = (Request = request, Response = response) => {
    const id_customer = Request.params.customer_id;
    let query = "DELETE FROM customers WHERE id = ?";

    const sqlquery = mysqlDbConnection.query(query, id_customer, function(err, result, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            throw err;
        }

        console.log("Resultado de la ejecución: " + result.message);

        Response.json({
            msg: 'DELETE Customers - desde controller',
            id: id_customer,
            result: result,
        });

        console.log("Consulta ejecutada con éxito:", result);
    });

    console.log(sqlquery);
}

module.exports = {
    getCustomers,
    postCustomers,
    putCustomers,
    getCustomer,
    patchCustomers,
    deleteCustomers,
}