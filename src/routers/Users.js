//登陆 注册
const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/users.js");
// SQl连接方式的查询
const mysqldb = require("../mysqldb/mysqldb.js");

usersRouter.get("/test",(req,res) =>{
	res.send({msg:"测试"})
})

// 登录
usersRouter.post("/login",(req,res) =>{
	
})

// 注册
usersRouter.post("/register",(req,res) =>{
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
			// 加密
			bcrypt.hash(req.body.password,10, (err,hash) =>{
				userData.password = hash;
				User.create(userData).then((user) =>{
					res.json({msg:"注册成功"});
				}).catch((err) =>{
					res.json({msg:err});
				})
			})
		}else{
			res.json({msg:"数据已存在"});
		}
	}).catch((err) =>{
		res.json({msg:err});
	})
})

// sequelize 查询表中所有数据
usersRouter.get("/list",async(ctx, res) =>{
	const users = await User.findAll();
	res.json({data:users})
})
// SQL查询所有内容
usersRouter.get('/user', (req, res) => {
  let sql = 'SELECT * FROM users';
  mysqldb.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = usersRouter;


