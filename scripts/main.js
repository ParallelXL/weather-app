"use strict";

// importing static constant objects

import { isoCountries, months, dayIds, days } from "./data.js";

// Selecting elements
const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search");
const opacityBg = document.querySelector(".opacity-bg");
const cityRowEl = document.querySelector(".city-row");
const currentNameEl = document.querySelector(".city-name");
const currentRegionEl = document.querySelector(".city-region");
const currentTempEl = document.querySelector(".temprature");
const currentCityImageEl = document.querySelector(".city-image");
const weatherRowEl = document.querySelector(".weather-row");
const switchUnitEl = document.querySelector(".switch-unit");
const switchCelEl = document.querySelector(".cel");
const switchFarEl = document.querySelector(".faren");
const guideEl = document.querySelector(".guide");

const FromCurLocationBtn = document.querySelector(".location");
const popUpEl = document.querySelector(".pop-up");
const audioEl = document.querySelector("audio");
const loaderEl = document.querySelector(".loader-wrapper");
const d = new Date();

// Get current date and show in navbar
const getUserDate = () => {
  document.querySelector(".currentDate").textContent = `${
    days[d.getDay()]
  } ${d.getDate()}, ${months[d.getMonth()]} ${d.getFullYear()}`;
};
getUserDate();

// Convert ISO country to full country name eg: IN = INDIA
const ConvertIsoCountry = (countryCode) => {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
};

// Convert TimeStamp to actual data eg: 1703659740 = 27/12/2023
const convertTimestamp = (milli) => {
  let convertedDate = new Date(milli * 5000).toLocaleDateString("en-us", {
    weekday: "long",
  });
  return convertedDate;
};

// Convert Celsius to Farenhiet and vice verca
const convertToFaren = (celsi) => `${Math.round(celsi * 1.8 + 32)}<sup>°</sup>`;
const convertToCelsi = (faren) =>
  `${Math.round((faren - 32) / 1.8)}<sup>°</sup>`;

// Show pop up on error with audio
const showPopUp = function (title, msg, isError = false) {
  popUpEl.innerHTML = `
  <h1 class='pop-up-title'><i class="fa-solid fa-circle-exclamation"></i> ${title}</h1>
  <p>${msg}</p>
  `;
  if (isError) {
    popUpEl.classList.add("red");
  }

  popUpEl.classList.add("active");
  audioEl.play();
  setTimeout(() => {
    popUpEl.classList.remove("active");
    setTimeout(() => {
      popUpEl.innerHTML = "";
    }, 400);
  }, 5000);
};

// Show weather row using the weekly data
const populateWeatherRow = function (weeklyData) {
  weeklyData.pop();

  weeklyData.forEach((current) => {
    current.dt = convertTimestamp(current.dt);
  });

  weeklyData.sort((a, b) => {
    return dayIds[a.dt] - dayIds[b.dt];
  });

  weeklyData.forEach(({ dt, weather, wind_speed, humidity, temp }) => {
    let html = `
    <div class="weather-col ${dt === days[d.getDay()] ? "activated" : ""}">
      <div class="flex">
      <h1>${dt}<small>${weather[0].description}</small></h1>
      <div class='icon'>
       <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png">
      </div>

      </div>
      <div class="flex">
        <div class="l">
          <h2><i class="fa fa-wind"></i>${wind_speed}km/h</h2>
          <h2><i class="fa fa-spa"></i>${humidity}%</h2>
        </div>
        <h3 class='temp'>${Math.round(temp.day)}<sup>°</sup></h3>
      </div>
    </div>
    `;
    weatherRowEl.insertAdjacentHTML("beforeend", html);
  });
};

// Get and show Data on search
const getData = function (lat, lon, place, region) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=f1b7ba7a47f863080257931892975f3a`
  )
    .then((r) => r.json())
    .then((data) => {
      // Show current data
      currentNameEl.textContent = place;
      currentRegionEl.textContent = ConvertIsoCountry(region);
      currentTempEl.innerHTML = Math.round(data.current.temp) + "<sup>°</sup>";
      currentCityImageEl.src = `./Assets/countryVectors/${ConvertIsoCountry(
        region
      )
        .replaceAll(" ", "")
        .toLowerCase()}.min.png`;
      populateWeatherRow(data.daily);
    })
    .catch(() => {
      showPopUp(
        "Unable to find the data",
        `Cant search for countries check the spelling, Try searching for place or use current place feature, or report about this in report page`,
        true
      );
      toggleLoader(true);
    });
};

const searchPlace = function (place) {
  if (place) {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=f1b7ba7a47f863080257931892975f3a`
    )
      .then((response) => response.json())
      .then((data) => {
        let { lat, lon, country, name } = data[0];
        getData(lat, lon, name, country);
        weatherRowEl.innerHTML = " ";
        inputEl.value = "";
      })
      .catch(() => {
        showPopUp(
          "Unable to find the data",
          `Cant search for countries check the spelling, Try searching for place or use current place feature, or report about this in report page`,
          true
        );
        toggleLoader(true);
      });
  }
};

const ToggleLoaderWeatherRow = (opposite) => {
  // Hide Loader show weather row
  if (opposite) {
    loaderEl.classList.remove("hide");
    opacityBg.classList.remove("hide");
    weatherRowEl.classList.add("hide");
    cityRowEl.classList.add("hide");
    return;
  }

  // Show loader Loader Hide weather row

  loaderEl.classList.add("hide");
  opacityBg.classList.add("hide");
  weatherRowEl.classList.remove("hide");
  cityRowEl.classList.remove("hide");
};

const toggleLoader = function (status = false) {
  if (status) {
    // If status is false then stop/hide the loader
    ToggleLoaderWeatherRow(true);

    cityRowEl.classList.remove("hide");
    weatherRowEl.innerHTML = " ";
    inputEl.value = " ";
    currentNameEl.textContent = " ";
    currentTempEl.textContent = " ";
    currentRegionEl.textContent = " ";
    currentCityImageEl.src = "./Assets/placeholder.png";
  } else {
    // If status is true then start/show the loader
    loaderEl.classList.remove("hide");
    opacityBg.classList.remove("hide");
    cityRowEl.classList.add("hide");
    weatherRowEl.classList.add("hide");
  }
};

currentCityImageEl.addEventListener("onMouseDown", (e) => {
  e.preventDefault();
  return false;
});

//
// _________ EventListeners _________
//

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  toggleLoader();
  guideEl.classList.add("hide");
  searchPlace(inputEl.value);
});

// Turn on loader if the image has an error and show audio popUp
currentCityImageEl.addEventListener("error", function () {
  ToggleLoaderWeatherRow(opposite);
  showPopUp(
    "Image not found",
    "Kindly go on report page and report about the place you searched",
    true
  );
  this.src = "./Assets/placeholder.png";
});

// Turn on loader while the image is loading
currentCityImageEl.addEventListener("load", () => {
  ToggleLoaderWeatherRow();
});

FromCurLocationBtn.addEventListener("click", (e) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }

  function showPosition(position) {
    fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=f1b7ba7a47f863080257931892975f3a`
    )
      .then((r) => r.json())
      .then((data) => {
        toggleLoader();
        guideEl.classList.add("hide");
        let { lat, lon, country, name } = data[0];
        getData(lat, lon, name, country);
      });
  }
  function showError(err) {
    showPopUp(
      "ERROR",
      `${err.message} or Geolocation is not supported by the browser`,
      true
    );
  }
});

switchUnitEl.addEventListener("click", function (e) {
  if (currentTempEl.textContent) {
    if (
      e.target === switchFarEl &&
      e.target.classList.contains("activated") === false
    ) {
      e.target.classList.add("activated");
      switchCelEl.classList.remove("activated");
      currentTempEl.innerHTML = convertToFaren(
        currentTempEl.textContent.replace("°", " ")
      );
      document.querySelectorAll(".temp").forEach((el) => {
        el.innerHTML = convertToFaren(el.textContent.replace("°", " "));
      });
    }
    if (
      e.target === switchCelEl &&
      e.target.classList.contains("activated") === false
    ) {
      e.target.classList.add("activated");
      switchFarEl.classList.remove("activated");
      currentTempEl.innerHTML = convertToCelsi(
        currentTempEl.textContent.replace("°", " ")
      );
      document.querySelectorAll(".temp").forEach((el) => {
        el.innerHTML = convertToCelsi(el.textContent.replace("°", " "));
      });
    }
  }
});

// Add and remove border on if focused
inputEl.addEventListener(
  "focusin",
  () => (formEl.style.border = "2px solid var(--primary)")
);
inputEl.addEventListener(
  "focusout",
  () => (formEl.style.border = "2px solid transparent")
);

// Focus Input when we click on `SEARCH FOR THE PLACE` btn
const btnFocusInputEl = document.querySelector(".focus-input");
btnFocusInputEl.addEventListener("click", () => inputEl.focus());
