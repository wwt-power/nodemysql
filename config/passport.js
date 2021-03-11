var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// 数据模型
const db = require("../src/database/db.js");
const User = require("../src/models/users.js");

module.exports = passport =>{
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		User.findOne({ where: {id: jwt_payload.id }}).then(user =>{
			if(user){
				return done(null,user);
			}
			return done(null,false);
		}).catch(err =>{
			console.log(err);
		})
	}));
}