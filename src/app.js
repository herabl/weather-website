const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()

//Define paths for Express config
const public_dir_path = path.join(__dirname,'../public')
const views_path =path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials') 

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

//setup static directory to sevre
app.use(express.static(public_dir_path))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Anrew Mead'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        message:'Hello from the help page',
        title:'Help',
        name: 'Andrew Mead'
    })
})


app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error : 'u must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     location:'Vienna',
    //     forecast:'5 Degrees',
    //     address: req.query.address
    // })
})


app.get('/help/*',(req,res) => {
    res.render('404', {
        title:'404',
        name:'Anrew Mead',
        error_msg:'Help article not found'
    })
})

app.get('/products', (req,res) => {

    if(!req.query.search){
       return res.send({
            error: 'u must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew Mead',
        error_msg:'Page not found'
    })
   
})


app.listen(3000, () => {
    console.log('server is on!')
})

