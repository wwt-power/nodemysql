//登陆 注册
const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/users.js");
// SQl连接方式的查询
const mysqldb = require("../mysqldb/mysqldb.js");
//定义到环境变量
process.env.SECRET_KEY = 'secret';
// jsonwebtoken
const jwt = require('jsonwebtoken');
// passport
const passport = require("passport");

usersRouter.get("/test",(req,res) =>{
	res.send({msg:"测试"})
})

// 登录
usersRouter.post("/login",(req,res) =>{
	User.findOne({ where: {email: req.body.email }}).then(async(result) =>{
		if(result){
			//密码匹配
			if (await bcrypt.compare(req.body.password, result.password)) {
				//生成token
				let token = jwt.sign(result.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 });// expiresIn过期时间
				//https://jwt.io    解析token
				res.status(200).json({
					msg:"登陆成功！",
					data:"",
					token:"Bearer " + token
				});
			}else{
				res.status(400).json({ msg: "密码不正确！" })
				console.log("密码不正确");
			}
		}else{
			res.status(400).json({ msg: "邮箱不存在！" })
			console.log("邮箱不存在");
		}
	}).catch((err) =>{
		res.status(400).json({ error: err })
		console.log("error");
	})
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
	User.findOne({ where: {email: req.body.email }}).then((result) =>{
		if(!result){
			// 加密
			bcrypt.hash(req.body.password,10, (err,hash) =>{
				userData.password = hash;
				User.create(userData).then((user) =>{
					res.status(200).json({ data: req.body.email,"msg":"注册成功" });
				}).catch((err) =>{
					res.status(400).json({ error: err })
				})
			})
		}else{
			res.status(400).json({ data: "用户已存在!" })
		}
	}).catch((err) =>{
		res.status(400).json({ error: '注册失败,请检查数据是否完整' })
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

// 验证token
usersRouter.get('/current',passport.authenticate("jwt",{session:false}),(req, res) => {
	res.json({
		id:req.user.id,
		name:req.user.name,
		email:req.user.email
	});
});

module.exports = usersRouter;


