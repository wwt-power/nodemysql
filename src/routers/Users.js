//登陆 注册
const express = require("express");
const users = express.Router();

const User = require("../models/users.js");

users.get("/test",(req,res) =>{
	res.send({msg:"测试"})
})

users.post("/register",(req,res) =>{
	const now = new Date();
	const userData = {
		name:req.body.name,
		email:req.body.email,
		password:req.body.password,
		created:now
	}
	
	//存之前 先找
	User.findOne({ where: {email: req.body.email }}).then((user) =>{
		if(!user){
			User.create(userData).then((user) =>{
				console.log(user);
				res.json("注册成功");
			})
		}else{
			res.json("数据已存在");
		}
	}).catch((err) =>{
		res.json("error:" + err);
	})
})
module.exports = users;


