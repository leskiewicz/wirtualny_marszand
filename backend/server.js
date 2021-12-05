require('dotenv').config();
const passport = require('passport');
const express = require('express')
const app = express()
const port = process.env.PORT;

const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')


const strategy = require('./strategy');
passport.use(strategy);

app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRoute)
app.use('/auth', authRoute)

app.all('*', (req, res) => {
  res.send({ errorMessage: "This page doesn't exist." })
})

app.listen(port, async() => {
    console.log("server UP")
	console.log(port);
})