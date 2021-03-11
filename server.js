const express = require("express");
const app = express();
// bodyParser
const bodyParser = require("body-parser");
// 端口号
const port = process.env.PORT || 3000;
// 引入passport
const passport = require("passport");

// 使用body-parser 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 初始化passport
app.use(passport.initialize());
require("./config/passport.js")(passport);

// 登录注册接口
const usersRouter = require("./src/routers/Users.js");
app.use("/api/v1" , usersRouter);

// 监听端口号
var server = app.listen(port,() =>{
	console.log("启动端口为 "+ port + "的端口 ");
})