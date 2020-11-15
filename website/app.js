/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=c331803b5ffd1d905064a646bfd65f9b&units=metric'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const generateBtn = document.getElementById('generate')

generateBtn.addEventListener('click', generateData)

function generateData(e){
    const zip = document.getElementById('zip').value
    if(zip){
        getWeatherFromApi(baseUrl, zip, apiKey)
        .then(function(data){
            console.log(data.main.temp)
            const userFeelings = document.getElementById('feelings').value
            postDataToServer('/set-weather', {
                temperature: data.main.temp,
                date: newDate,
                userFeelings: userFeelings
            })
        })
        .then(
            reflectData()
        )
    }
}

const getWeatherFromApi = async (url, zip, key)=>{

    const res = await fetch(url+zip+key)
    try{
        const weather = await res.json();
        return weather;
    }catch(error){
        console.log('error', error);
    }
}

const postDataToServer = async (url='', data = {})=>{

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
            return newData;
      }catch(error) {
      console.log("error", error);
      }
}

const reflectData = async () => {

    const request = await fetch('/get-weather');
    try{
      const weather = await request.json();
      document.getElementById('date').innerHTML = weather.date;
      document.getElementById('temp').innerHTML = weather.temperature;
      document.getElementById('content').innerHTML = weather.userFeelings;
  
    }catch(error){
      console.log("error", error);
    }
  }