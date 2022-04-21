
import React, { useState} from 'react';


const api = {
      key : "33960d88e65a0b9884d9a793cbcde7cc",
      base :"https://api.openweathermap.org/data/2.5/"

}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather]  = useState({});

  const search = event => {

       if (event.key === "Enter") {
         fetch (`${api.base}weather?zip=${query}&units=imperial&APPID=${api.key}`)
         .then (response => response.json()) 
         .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);

         });

         }
      }

  const dateCreator = (d) => {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
     return `${day} ${date} ${month} ${year}`
   
}
   

  return (
    <div className= {(typeof weather.main != "undefined") ? ((weather.main.temp > 60) ? 'app warm': 'app') : 'app' }>

        <main>
      <div className="search-box">
        <input  type = "text" className='search-bar' placeholder='search...'               
          onChange={e => setQuery(e.target.value)}
          value ={query}
          onKeyPress={search}>
        </input>
        </div>
        {(typeof weather.main != "undefined") ? (
      
      <div>
        <div className ="location-box">
         <div className = "location">{weather.name}</div>
         <div className="date">{dateCreator(new Date())}</div>
         <div className="date">{new Date(weather.dt * 1000).toLocaleTimeString('en-IN')}</div>
        
        </div>
        <div className="weather-box">
          <div  className="temp"> {Math.round(weather.main.temp)}°F</div>
         
         <div  className="highlow">
          <span>HIGH:{Math.round(weather.main.temp_max)}°F </span>
          <span> LOW:{Math.round(weather.main.temp_min)}°F </span>
          </div>

          <div  className="feel">
             <span>FEELS LIKE: {Math.round(weather.main.feels_like)}°F</span>
             <span> HUMIDITY:{Math.round(weather.main.humidity)}% </span>
          </div>

          <div  className="pressure">
          <span> PRESSURE:{(weather.main.pressure)}</span>
          <span>  WIND:{Math.round(weather.wind.speed)}mph</span>
          </div>
          
          <div className="weather">{weather.weather[0].description} 
      
          
          </div>
          </div>
          </div>
        ) : ('')}
       </main>  
      </div>  
     

  );

}

export default App;
