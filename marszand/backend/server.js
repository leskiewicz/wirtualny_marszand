require('dotenv').config();
const passport = require('passport');
const express = require('express')
const app = express()
const port = process.env.PORT;


const adminAuth = require('./middlewares/adminAuth'); 
const hotelAuth = require('./middlewares/hotelAuth');
const klientAuth = require('./middlewares/klientAuth'); 
const artystaAuth = require('./middlewares/artystaAuth'); 
const userAuth = require('./middlewares/userAuth')

const authRoute = require('./routes/authRoute')
const artystaRoute = require('./routes/artystaRoute')
const klientRoute = require('./routes/klientRoute')
const hotelRoute = require('./routes/hotelRoute')
const userRoute = require('./routes/userRoute')



app.use(express.static('public'))

const strategy = require('./strategy');
passport.use(strategy);

app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/auth', authRoute)

app.use('/user', passport.authenticate('jwt', { session: false }), userAuth, userRoute)
app.use('/hotel', passport.authenticate('jwt', { session: false }), hotelAuth, hotelRoute)
app.use('/klient', passport.authenticate('jwt', { session: false }), klientAuth,  klientRoute)
app.use('/artysta', passport.authenticate('jwt', { session: false }), artystaAuth, artystaRoute)

//app.use('/hotel', passport.authenticate('jwt', { session: false }), hotelAuth, hotelRoute)
//app.use('/klient', passport.authenticate('jwt', { session: false }), klientAuth,  klientRoute)
//app.use('/artysta', passport.authenticate('jwt', { session: false }), artystaAuth,  artystaRoute)

app.all('*', (req, res) => {
  res.send({ errorMessage: "This page doesn't exist." })
})

app.listen(port, async() => {
    console.log("server UP")
	console.log(port);
})