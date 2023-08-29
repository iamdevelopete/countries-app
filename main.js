const countrySelect = document.getElementById("countrySelect");
const countryInfo = document.getElementById("countryInfo");
const flag = document.getElementById("flag");
const capital = document.getElementById("capital");
const population = document.getElementById("population");
const continent = document.getElementById("continent");
const language = document.getElementById("language");

// Fetch country data from Rest Countries API
async function fetchCountryData() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
}

// Create and append an option element to the dropdown
function appendOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  countrySelect.appendChild(option);
}

// Display country information
function displayCountryInfo(country) {
  flag.src = country.flags.png;
  flag.style.display = "block";
  capital.textContent = country.capital;
  population.textContent = country.population.toLocaleString();
  continent.textContent = country.region;
  language.textContent = Object.values(country.languages).join(", ");
  countryInfo.style.display = "block";
}

// Handle dropdown change event
async function handleDropdownChange() {
  const countries = await fetchCountryData();
  const selectedCountryName = countrySelect.value;
  const selectedCountry = countries.find(
    (country) => country.name.common === selectedCountryName
  );

  if (selectedCountry) {
    displayCountryInfo(selectedCountry);
  } else {
    flag.style.display = "none";
    countryInfo.style.display = "none";
  }
}

// Populate the dropdown with country names in alphabetical order
async function populateDropdown() {
  const countries = await fetchCountryData();

  // Sort country names alphabetically
  const sortedCountryNames = countries
    .map((country) => country.name.common)
    .sort();

  appendOption("", "Please choose a country");
  sortedCountryNames.forEach((countryName) =>
    appendOption(countryName, countryName)
  );
}

// Set up the app on page load
window.addEventListener("load", async () => {
  const defaultCountry = "United States";

  populateDropdown();

  countrySelect.addEventListener("change", handleDropdownChange);

  const countries = await fetchCountryData();
  const defaultCountryData = countries.find(
    (country) => country.name.common === defaultCountry
  );
  if (defaultCountryData) {
    displayCountryInfo(defaultCountryData);
    countrySelect.value = ""; // Set the default value in the dropdown
  } else {
    flag.style.display = "none";
    countryInfo.style.display = "none";
  }
});
