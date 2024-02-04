import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './Components/TopButtons';
import Input from './Components/Input';
import TimeAndLocation from './Components/TimeAndLocation';
import TemperatureAndDetails from './Components/TemperatureAndDetails';
import Forcast from './Components/Forcast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query,setQuery]=useState({q:'Bengaluru'})
  const [units,setUnits]=useState('metric')
  const [weather,setWeather]=useState(null)

  useEffect(()=>{
    const fetchWeather=async ()=>{
      const message=query.q? query.q:'current location.'
      toast.info('Fetching weather for '+message)
      const data=await getFormattedWeatherData({...query,units}).then(data=>{

        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`)
        setWeather(data);
      });
    };
  
    fetchWeather();
  },[query,units]);

  const formatBackground=()=>{
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold=units=== 'metric'?20:60
    if(weather.temp<=threshold) return 'from-cyan-700 to-blue-700'
    return 'from-yellow-700 to-orange-700'
  }


  return (
    
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
        <TopButtons setQuery={setQuery} />
        <Input setQuery={setQuery} setUnits={setUnits} units={units} />

        {weather && (
          <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forcast title="Hourly Forecast" items={weather.hourly} />
          <Forcast title="Daily Forecast" items={weather.daily} />
          </div>
        )}

        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    
    </div>
  );
}

export default App;
