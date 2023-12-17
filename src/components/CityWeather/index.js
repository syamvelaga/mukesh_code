import { Component } from "react";

import "./index.css";

class CityWeather extends Component {
  state = { details: this.props, cityWeatherDetails: {} };

  componentDidMount() {
    this.cityDetailsFetch();
  }

  cityDetailsFetch = async () => {
    const { details } = this.state;
    const { lat, lon } = details;
    console.log("lat", lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=70788039cb8e3f1ac5addc8d86db5aba`;

    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      weatherDetails: data,
      areaName: data.name,
      weather: data.weather[0],
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  };

  render() {
    const {
      areaName,
      weatherDetails,
      weather,
      icon,
      description,
      main,
    } = this.state;
    console.log("details", weatherDetails);
    console.log(weather);
    const image =
      icon !== undefined ? (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={icon}
        />
      ) : (
        ""
      );

    return (
      <div className="cityWeatherContainer">
        <h1>{areaName}</h1>

        <hr />
        {main}
        {image}
        <p>{description}</p>
      </div>
    );
  }
}

export default CityWeather;
