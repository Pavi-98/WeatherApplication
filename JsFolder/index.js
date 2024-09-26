const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',()=>{
    const APIKey = 'b49d2639d7e102ee4bc2b68ce8192e8b';
    const city = document.querySelector('.search-box input').value;
     
    if(city === '')
        return
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}`).then(respose =>  respose.json()).then
    (json =>{
        if(json.cod === '404'){
            container.style.height = '600px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display ='block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display ='none';
        error404.classList.remove('fadeIn');
        // const location = document.querySelector('.not-found span');
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description =document.querySelector('.weather-box .description');
        const humidity=document.querySelector('.weather-details .humidity span');
        const windSpeed = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src='./images/clear.png';
                break;
            case 'Rain':
                image.src='./images/rain.png';
                break;
            case 'Snow':
                image.src='./images/snow.png';
                break;
            case 'Clouds':
                image.src='./images/cloud.png';
                break;
            case 'Haze':
                image.src='./images/haze.png';
                break;
            default:
                image.src='./images/mist.png';
        }

        temperature.innerHTML =`${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        windSpeed.innerHTML=`${parseInt(json.wind.speed)}Km/h`;
        // location.innerHTML = `${city}`;
       
        container.style.height = '500px';
        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        
    });

});
