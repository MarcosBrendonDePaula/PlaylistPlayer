const Express = require('express')
const path = require('path')

const bodyparser = require('body-parser')
const app = Express()

app.use(bodyparser.urlencoded({limit: '200mb',extended:false}))

app.use(bodyparser.json())

app.use(Express.static(path.join(__dirname,"public")))

const http = require('http').Server(app);
http.listen((process.env.PORT || 7002))