require('dotenv').config();
const passportJWT = require('passport-jwt');
const { User } = require('./models')

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;

let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {

  try {
    const user = await User.findOne({
      where: {
        id: jwt_payload.id
      }
    });

    if(!user) {
      return next(null, false)
    }

    next(null, user)

  } catch(err) {
    next(err, false)
  }
});


module.exports = strategy;