function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature-element");
  let temperature = response.data.temperature.current;
  let searchElement = document.querySelector("h1#city");

  searchElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCity);

searchCity("Berlin");
