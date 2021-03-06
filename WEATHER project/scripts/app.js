const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = ({ cityDets, weather }) => {
  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // d-none class if present
  card.classList.contains("d-none") ? card.classList.remove("d-none") : null;

  // update the night/day & icon images
  const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`;

  let timeSrc = weather.IsDayTime ? "./img/day.svg" : "./img/night.svg";

  time.setAttribute("src", timeSrc);
  icon.setAttribute("src", iconSrc);
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with the new city;
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
  // set localstorage
  localStorage.setItem("city", city);
});

localStorage.getItem("city")
  ? forecast
      .updateCity(localStorage.getItem("city"))
      .then((data) => updateUI(data))
      .catch((err) => console.log(err))
  : null;
