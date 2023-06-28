"use strict";

// Selecting elements
const TodayEl = document.querySelector(".currentDate");
const btnSearchEl = document.querySelector(".btn-search");
const inputEl = document.querySelector("#search");
const opacityBg = document.querySelector(".opacity-bg");
const cityRowEl = document.querySelector(".city-row");
const currentNameEl = document.querySelector(".city-name");
const currentRegionEl = document.querySelector(".city-region");
const currentTempEl = document.querySelector(".temprature");
const currentCityImageEl = document.querySelector(".city-image");
const weatherRowEl = document.querySelector(".weather-row");
const weatherColEl = document.querySelector(".weather-col");
const switchDaysEl = document.querySelector(".switch-days");
const switchUnitEl = document.querySelector(".switch-unit");
const switchCelEl = document.querySelector(".cel");
const switchFarEl = document.querySelector(".faren");
const formEl = document.querySelector("form");
const guideEl = document.querySelector(".guide");
const guideLinksEl = document.querySelector(".guide-links");
const btnFocusInputEl = document.querySelector(".F-input");
const btnLocationEl = document.querySelector(".location");
const popUpEl = document.querySelector(".pop-up");
const popUpTitleEl = document.querySelector(".pop-up-title");
const audioEl = document.querySelector("audio");
const loaderEl = document.querySelector(".loader");
const d = new Date();

let isoCountries = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, Democratic Republic",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island & Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic Of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle Of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States Of",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And Sandwich Isl.",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

const months = [
  "Janruary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octobur",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayIds = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

const getUserDate = () => {
  TodayEl.textContent = `${days[d.getDay()]} ${d.getDate()}, ${
    months[d.getMonth()]
  } ${d.getFullYear()}`;
};

const getCountryName = (countryCode) => {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
};

const convertTimestamp = (milli) => {
  let datee = new Date(milli * 5000).toLocaleDateString("en-us", {
    weekday: "long",
  });
  return datee;
};

const convertToFaren = (celsi) => `${Math.round(celsi * 1.8 + 32)}<sup>°</sup>`;
const convertToCelsi = (faren) =>
  `${Math.round((faren - 32) / 1.8)}<sup>°</sup>`;

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

const populateWeatherRow = function (week) {
  week.pop();
  week.forEach((current) => {
    current.dt = convertTimestamp(current.dt);
  });
  week.sort((a, b) => {
    return dayIds[a.dt] - dayIds[b.dt];
  });
  week.forEach((current) => {
    let html = `
    <div class="weather-col ${
      current.dt === days[d.getDay()] ? "activated" : ""
    }">
      <div class="flex">
      <h1>${current.dt}<small>${current.weather[0].description}</small></h1>
      <div class='icon'>
       <img src="https://openweathermap.org/img/wn/${
         current.weather[0].icon
       }@2x.png">
      </div>

      </div>
      <div class="flex">
        <div class="l">
          <h2><i class="fa fa-wind"></i>${current.wind_speed}km/h</h2>
          <h2><i class="fa fa-spa"></i>${current.humidity}%</h2>
        </div>
        <h3 class='temp'>${Math.round(current.temp.day)}<sup>°</sup></h3>
      </div>
    </div>
    `;
    weatherRowEl.insertAdjacentHTML("beforeend", html);
  });
};

const getData = function (lat, lon, place, region) {
  const data = fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=f1b7ba7a47f863080257931892975f3a`
  )
    .then((r) => r.json())
    .then((data) => {
      // Show current data
      currentNameEl.textContent = place;
      currentRegionEl.textContent = getCountryName(region);
      currentTempEl.innerHTML = Math.round(data.current.temp) + "<sup>°</sup>";
      currentCityImageEl.src = `./resourse/countryVectors/${getCountryName(
        region
      )
        .replaceAll(" ", "")
        .toLowerCase()}.min.png`;
      populateWeatherRow(data.daily);
    });
};

const searchPlace = function (place) {
  if (place) {
    const data = fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=f1b7ba7a47f863080257931892975f3a`
    )
      .then((r) => r.json())
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
        startLoader(true);
      });
  }
};

const startLoader = function (stop = false) {
  // For stoping loader
  if (stop) {
    loaderEl.classList.add("hide");
    opacityBg.classList.add("hide");
    cityRowEl.classList.remove("hide");
    guideEl.classList.remove("hide");
    weatherRowEl.classList.remove("hide");

    weatherRowEl.innerHTML = " ";
    inputEl.value = " ";
    currentNameEl.textContent = " ";
    currentTempEl.textContent = " ";
    currentRegionEl.textContent = " ";
    currentCityImageEl.src = "./resourse/placeholder.png";
    // For starting loader
  } else {
    loaderEl.classList.remove("hide");
    opacityBg.classList.remove("hide");
    cityRowEl.classList.add("hide");
    weatherRowEl.classList.add("hide");
  }
};
//
//
// EVENTS
//
//

btnSearchEl.addEventListener("click", (e) => {
  startLoader();
  guideEl.classList.add("hide");
  searchPlace(inputEl.value);
});

currentCityImageEl.addEventListener("error", function () {
  opacityBg.classList.add("hide");
  loaderEl.classList.add("hide");
  cityRowEl.classList.remove("hide");
  weatherRowEl.classList.remove("hide");

  showPopUp(
    "Image not found",
    "Kindly go on report page and report about the place you searched",
    true
  );
  this.src = "./resourse/placeholder.png";
});

currentCityImageEl.addEventListener("load", (e) => {
  loaderEl.classList.add("hide");
  opacityBg.classList.add("hide");
  weatherRowEl.classList.remove("hide");
  cityRowEl.classList.remove("hide");
});

btnLocationEl.addEventListener("click", (e) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }

  function showPosition(position) {
    const data = fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=f1b7ba7a47f863080257931892975f3a`
    )
      .then((r) => r.json())
      .then((data) => {
        startLoader();
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

inputEl.addEventListener(
  "focusin",
  () =>
    (document.querySelector(".top-right").style.border =
      "2px solid var(--primary)")
);
inputEl.addEventListener(
  "focusout",
  () =>
    (document.querySelector(".top-right").style.border =
      "2px solid transparent")
);

formEl.addEventListener("submit", (e) => e.preventDefault());
btnFocusInputEl.addEventListener("click", (e) => inputEl.focus());
