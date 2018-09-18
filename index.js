const express = require('express')
const path = require('path')
const app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var x = 0

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'));


setInterval(function(){
    x++
    io.sockets.emit('timer', {x: x})
}, 1500)

app.get('/', function(req, res){
    res.render('index')
});

http.listen(3000, function(){
    console.log('listening on 3000')
})

/*
function intervalFxTest(){
    x++
    console.log(x)
}

setInterval(intervalFxTest, 1500)

*/