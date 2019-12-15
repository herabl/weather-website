const request = require('request')



const forecast = (latitude,longtitude,callback) => {
    const url = 'https://api.darksky.net/forecast/ae5c846b7e9dcdd88751870a722ade01/' + latitude + ',' + longtitude + '?units=si'

    request({url, json: true}, (error,{ body})=>{
        if(error)
        {
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error)
        {
            callback('unable to find location',undefined)
        }else{
            
            callback(undefined,body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. This hight today is ' +body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow  +  '. There is a ' + body.currently.precipProbability + ' % chance of rain!')
           
        }
    })
}



module.exports = forecast