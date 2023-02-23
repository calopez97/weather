import './style.css'
import { APIKEY } from './key';

const weatherContainer = document.querySelector('.weather-container');
const searchBtn = document.querySelector('.search-form #btn-weather')
const weatherInfo = document.querySelector('.weather-container .weather-information')
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');
const notFoundMess = document.querySelector('.not-found-message');


searchBtn.addEventListener('click', function(e){
  e.preventDefault();
  const city = document.querySelector('.search-form input').value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`).then((res)=> res.json()).then((json) => {

    if (json.cod === '404') {
      weatherContainer.style.height = 'auto';
      weatherInfo.classList.remove('showIn')
      weatherDetails.classList.remove('showIn');
      notFound.classList.add('showIn');
      notFoundMess.style.display = 'block'
      notFoundMess.innerText = 'Not found location'
      return;
    }

    
    notFound.classList.remove('showIn')
    notFoundMess.style.display = 'none'

    const weatherImage = document.querySelector('.weather-information img')
    const temp = document.querySelector('.weather-information .temperature')
    const descrip = document.querySelector('.weather-information .description')
    const humidity = document.querySelector('.weather-details .humidity .text span')
    const wind = document.querySelector('.weather-details .wind .text span')

    let currWeather = json.weather[0].main ? json.weather[0].main : ''
    let currTemp =  json.main.temp ? parseInt(json.main.temp) : ''
    let currDescrip =  json.weather[0].description ? json.weather[0].description : ''
    let currHum = json.main.humidity ? json.main.humidity : ''
    let currWind = json.wind.speed ? parseInt(json.wind.speed) : ''

    const weatherAssets = {
      Clear:'./public/clear.png',
      Rain:'./public/rain.png',
      Snow:'./public/snow.png',
      Clouds:'./public/cloud.png',
      Haze:'./public/mist.png',
    }

    weatherImage.src = weatherAssets[currWeather] ? weatherAssets[currWeather] : '';
    temp.innerHTML = `${currTemp}<span>°C</span>`;
    descrip.innerHTML = `${currDescrip}`;
    humidity.innerHTML = `${currHum}%`;
    wind.innerHTML = `${currWind}Km/h`;

    weatherInfo.classList.add('showIn')
    weatherDetails.classList.add('showIn');

    weatherContainer.style.height = 'auto';
  })

  
});




