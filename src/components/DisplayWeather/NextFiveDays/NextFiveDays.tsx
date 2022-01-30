import '../../../App.css'
import './NextFiveDays.css'
import DisplayCurrent from '../CurrentDayWeather/CurrentDayWeather';
const { DateTime } = require("luxon");

type Props = {
    location: any,
    displayLocation: string,
}

const NextFiveDays = (props: Props): JSX.Element => {

    const DisplayDay = (weather: any): JSX.Element[] => {

        const displayDays: JSX.Element[] = []

        weather.map((d: any, i: number) => {

            let currentDay: Date = DateTime.fromSeconds(d.dt).setZone(d.timezone).toFormat('cccc')

            displayDays.push(
                <div key={i} className="card">
                    <p className="forecast-card-text" id="bold">{currentDay}</p>
                    <p className="forecast-card-text">{d.weather[0].description}</p>
                    <img
                    className="weather-icon" 
                    src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}                   
                    alt="new"
                    />
                    <p className="forecast-card-text">High: {d.temp.max.toFixed(0)}C</p>
                    <p className="forecast-card-text">Low: {d.temp.min.toFixed(0)}C</p>
                </div>
            )
        })
        return displayDays.splice(0,5)
    }

    return (
        <div> 
            <h2 className="locationBanner"> The local time in {props.displayLocation} is {DateTime.fromSeconds(props.location.current.dt).setZone(props.location.timezone).toFormat('h:mm a')} </h2>
            <div className="weather-container">
                <DisplayCurrent currentDay={props.location.current} currentWeather={props.location.daily[0]} />
                <div className="card-container">
                    {DisplayDay(props.location.daily)}
                </div>
            </div>
        </div>
    )
}

export default NextFiveDays;