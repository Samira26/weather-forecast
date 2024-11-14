function newCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let searchElement = document.querySelector("h1#city");
  searchElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCity);
