const { DataTypes , Sequelize } = require('sequelize');
const db = require("../database/db.js");

module.exports = db.sequelize.define("user",{
	id:{
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoTncrement:true
	},
	name:{
		type:DataTypes.STRING,
	},
	email:{
		type:DataTypes.STRING,
	},
	password:{
		type:DataTypes.STRING,
	},
	created:{
		type:DataTypes.DATE,
		defaultValue:Sequelize.Now
	}
},{
	timestamps: false
})