const express = require("express");
const app = express();
// bodyParser
const bodyParser = require("body-parser");
// 端口号
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 路由
app.get("/",(req,res)=>{
	res.send(server);
})

// 登录注册接口
const usersRouter = require("./src/routers/Users.js");
app.use("/api/v1" , usersRouter);

// 监听端口号
var server = app.listen(port,() =>{
	console.log("启动端口为 "+ port + "的端口 ");
})