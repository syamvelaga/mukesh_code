import { Component } from "react";
import { Audio } from "react-loader-spinner";
import CityWeather from "../CityWeather";

import "./index.css";

const weatherConstants = {
  initial: "Initial",
  inprogress: "Inprogress",
  success: "Success",
  failure: "Failure",
};

const englandCities = [
  { name: "London", population: 8982000 },
  { name: "Birmingham", population: 1141000 },
  { name: "Manchester", population: 547600 },
  { name: "Glasgow", population: 626400 },
  { name: "Liverpool", population: 498042 },
  { name: "Newcastle", population: 155700 },
  { name: "Sheffield", population: 582506 },
  { name: "Bristol", population: 463400 },
  { name: "Leeds", population: 789194 },
  { name: "Nottingham", population: 331000 },
];

class WeatherView extends Component {
  state = {
    weatherDetails: [],
    weatherApiStatus: weatherConstants.initial,
    initialCity: "London",
    newCity: "",
  };

  componentDidMount() {
    this.fetchingDetails();
  }

  fetchingDetails = async () => {
    this.setState({ weatherApiStatus: weatherConstants.inprogress });
    const { initialCity } = this.state;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${initialCity}&limit=5&appid=70788039cb8e3f1ac5addc8d86db5aba`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({
        weatherApiStatus: weatherConstants.success,
        weatherDetails: data,
      });
    } else {
      this.setState({ weatherApiStatus: weatherConstants.failure });
    }
  };

  onChangeNewCity = (event) => {
    this.setState({ newCity: event.target.value });
  };

  onChangeInitialCity = (event) => {
    this.setState({ initialCity: event.target.value }, this.fetchingDetails);
  };
  render() {
    const { weatherApiStatus, weatherDetails, newCity } = this.state;
    console.log(weatherDetails, weatherApiStatus);

    const searchInput = (
      <div>
        <label htmlFor="citySearch">Search</label>
        <input
          type="search"
          id="citySearch"
          onChange={this.onChangeNewCity}
          value={newCity}
        />
      </div>
    );

    const filteredCities = englandCities.filter((each) =>
      each.name.toLowerCase().includes(newCity.toLowerCase())
    );

    const cityDropDown = (
      <div>
        <label>England Cities</label>
        <select id="cityDropDown" onChange={this.onChangeInitialCity}>
          {filteredCities.map((each) => (
            <option>{each.name}</option>
          ))}
        </select>
      </div>
    );

    const loader = (
      <div>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );

    const successView = weatherDetails.map((each) => (
      <div>
        <CityWeather
          lat={each.lat}
          lon={each.lon}
          name={each.name}
          each={each}
        />
      </div>
    ));

    let finalView = "";
    switch (weatherApiStatus) {
      case weatherConstants.success:
        finalView = successView;
        break;
      case weatherConstants.inprogress:
        finalView = loader;
        break;
      case weatherConstants.failure:
        finalView = (
          <div>
            <h1>Something went Wrong</h1>
          </div>
        );
        break;

      default:
        finalView = "";
        break;
    }
    return (
      <div className="weatherContainer">
        <h1>Weather</h1>
        {searchInput}

        {cityDropDown}
        <div className="finalViewContainer">{finalView}</div>
      </div>
    );
  }
}

export default WeatherView;
