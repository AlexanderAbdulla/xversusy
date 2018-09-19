const express = require('express')
const path = require('path')
const app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var x = 0
var pic1 = 5;
var pic2 = 5; 
var picCounter = 0; 

const testFolder = './public/img/';
const fs = require('fs');


app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'))


setInterval(function(){
    x++
    io.sockets.emit('timer', {x: x})
}, 1500)

setInterval(function(){
    pic1 = Math.floor((Math.random() * 10) + 1)
    pic2 = Math.floor((Math.random() * 10) + 1)
    while (pic2 == pic1) {
       pic2 = Math.floor((Math.random() * 10) + 1)  
    } 
 
    console.log("The first picture is " + pic1)
    console.log("The second picture is " + pic2)

    fs.readdirSync(testFolder).forEach(file => {
        picCounter++;
        if(picCounter == pic1) {
            console.log("found pic 1" + pic1 + file)
            pic1 = "/img/" + file; 
        }

        if(picCounter == pic2) {
            console.log("found pic 2" + pic2 + file)
            pic2 = "/img/" + file;
        }
        //console.log("File number" + picCounter + " is called" + file);
    })
    

    io.sockets.emit('imageSwapper', {pic1: pic1, pic2: pic2})
    picCounter = 0; 
}, 5000)

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