const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const message_one = document.querySelector('#message_1')
const message_two = document.querySelector('#message_2')

// message_one.textContent = 'from js'

weather_form.addEventListener('submit', (e)=>{

    e.preventDefault()
    
    const location = search.value

    message_one.textContent = 'Loading...'
    message_two.textContent = ''

    fetch('/weather?address=' + location).then( (response) => {
        response.json().then( (data) => {
            if(data.error)
            {
              message_two.textContent = data.error
            }else {
                message_one.textContent = data.location
                message_two.textContent = data.forecast
               
            }
        })
    })
    
})


