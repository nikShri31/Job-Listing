if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const app = express();
const expressError = require("./utils/expressError")
const cors = require('cors')
const mongoose = require('mongoose');

const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const applicationRoutes = require('./Routes/applicationRoutes');
const jobLisitngRoutes = require('./Routes/jobListingRoutes');
const organisationRoutes = require('./Routes/organisationRoutes');

const port = process.env.PORT;

mongoose.connect(process.env.mongoUrl)
    .then(() => console.log('Connected!'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/job', jobLisitngRoutes)
app.use('/api/application', applicationRoutes)
app.use('/api/organisation', organisationRoutes)

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