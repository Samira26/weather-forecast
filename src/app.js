function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-element");
  let temperature = response.data.temperature.current;
  let searchElement = document.querySelector("h1#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let currentDateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let weatherIconElement = document.querySelector("#weather-icon");

  console.log(response.data);

  searchElement.innerHTML = response.data.city;
  currentDateElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  weatherIconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                alt=""
                class="temperature-emoji"
              />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day}, ${hour}:${minutes},`;
}

function searchCity(city) {
  let apiKey = "df24oeedc433a37t0bf85c483b145ecb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function newCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  searchCity(cityInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "df24oeedc433a37t0bf85c483b145ecb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast-daily">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <div >
  <img src = "${day.condition.icon_url}" class="weather-forecast-icon"/>
  </div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">${Math.round(
      day.temperature.maximum
    )}°</div>
    <div class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum
    )}°</div>
  </div>
</div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast-overview");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCity);

searchCity("Berlin");
