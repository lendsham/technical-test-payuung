const express = require('express');

const route = require('./routes/axios.route')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`))