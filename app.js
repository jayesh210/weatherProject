const express = require('express');
const https = require('https');
const bodyparser=require('body-parser')
const app = express();

app.use(bodyparser.urlencoded({extended:true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"//index.html");

     

});
app.post("/",function(req,res){
    const query=req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=00620ac3b7d162e526cb24dbdd857d4a&units=metric";
    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            var weatherDescription = weatherData.weather[0].description;
            var temp = weatherData.main.temp;
            var icon = weatherData.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in "+query+" is " + temp + " degree</h1>");
            res.write("<h2>The weather is currently " + weatherDescription + "</h2>");
            res.write("<img src=" + iconurl + ">");
            res.send();
       });
    });
})


app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
