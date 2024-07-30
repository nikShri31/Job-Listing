if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const app = express();
const expressError = require("./utils/expressError")

const port = process.env.PORT;

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    console.log("Server running")
})

app.all('*', (req, res, next) => {
    next(new expressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Internal Server Error';
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: err.statusCode
        }
    });
})

app.listen(port, () => {
    console.log( `Server running on port ${port}`)
})