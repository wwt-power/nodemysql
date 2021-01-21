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

const Users = require("./src/routers/Users.js");
app.use("/api/v1" , Users);


var server = app.listen(port,() =>{
	console.log("启动端口为 "+ port + "的端口 ");
})