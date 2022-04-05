require('dotenv').config();
const express = require('express');

const route = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route.company);
app.use(route.employee);

app.all("*", function (req, res) {
    res.status(404);
    res.end(JSON.stringify({ message: "Endpoint does not exist" }));
});

module.exports = app;