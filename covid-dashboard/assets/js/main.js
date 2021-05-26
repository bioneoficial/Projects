const baseUrl = "https://api.covid19api.com"; // API base url
const numFormat = new Intl.NumberFormat("PT-br");

const confirmed = document.getElementById("confirmed");
const death = document.getElementById("death");
const recovered = document.getElementById("recovered");
const active = document.getElementById("active");
const tconfirmed = document.getElementById("tconfirmed");
const tdeath = document.getElementById("tdeath");
const trecovered = document.getElementById("trecovered");
const tactive = document.getElementById("tactive");
const combo = document.getElementById("combo");
const today = document.getElementById("today");
const arrow = document.getElementsByClassName("arrow");
var countries;

window.addEventListener("load", () => {
    fetchSummary();
});

const fetchSummary = async () => {
    const responseJSON = await fetchData(`${baseUrl}/summary`);
    const summary = responseJSON.Global;
    countries = responseJSON.Countries;
    const date = responseJSON.Date;

    setSummaryData(summary, date); // populate summary data
    setCountryData(countries); // populate coutries combo
};

const fetchCountryTotal = async (country, date) => {
    const fullDate = new Date(date.replace(/-/g, ',')); //Mon May 24 2021 00:00:00 GMT-0300 (Brasilia Standard Time)
    const yesterday = `${fullDate.getFullYear()}-${("0" + (fullDate.getMonth() + 1)).slice(-2)}-${fullDate.getDate() - 1}`; // 2021-05-24

    const comboCountry = await fetchData(`${baseUrl}/total/country/${country}`);
    const countryData = comboCountry.find((item) => item.Date == `${date}T00:00:00Z`); // Date: "2021-05-25T00:00:00Z"
    const countryYesterdayData = comboCountry.find((item) => item.Date == `${yesterday}T00:00:00Z`); // Date: "2021-05-24T00:00:00Z"

    setSummaryData(countryData, date, countryYesterdayData, 'countryChanged');
};

const fetchData = async (url) => {
    const response = await fetch(url);
    const responseJSON = await response.json();

    return responseJSON;
};

const setSummaryData = async (data, date, yesterdayData, countryChanged) => {
    if (countryChanged) {
        // clear old data
        clearDaily();
        // total numbers
        confirmed.textContent = numFormat.format(data.Confirmed);
        death.textContent = numFormat.format(data.Deaths);
        recovered.textContent = numFormat.format(data.Recovered);
        active.textContent = numFormat.format(data.Active);
        // daily numbers compared to yesterday
        tconfirmed.textContent = numFormat.format(data.Confirmed - yesterdayData.Confirmed);
        tdeath.textContent = numFormat.format(data.Deaths - yesterdayData.Deaths);
        trecovered.textContent = numFormat.format(data.Recovered - yesterdayData.Recovered);
        tactive.textContent = numFormat.format(data.Active - yesterdayData.Active);
        // arrow adjust
        (tconfirmed.textContent == 0) ? arrow[0].src = "/assets/img/equals.svg" : (tconfirmed.textContent >= 1) ? arrow[0].src = "/assets/img/up.png" : arrow[0].src = "/assets/img/down.png";
        (tdeath.textContent == 0) ? arrow[1].src = "/assets/img/equals.svg" : (tdeath.textContent >= 1) ? arrow[1].src = "/assets/img/up.png" : arrow[1].src = "/assets/img/down.png";
        (trecovered.textContent == 0) ? arrow[2].src = "/assets/img/equals.svg" : (trecovered.textContent >= 1) ? arrow[2].src = "/assets/img/up.png" : arrow[2].src = "/assets/img/down.png";
        (tactive.textContent == 0) ? arrow[3].src = "/assets/img/equals.svg" : (tactive.textContent >= 1) ? arrow[3].src = "/assets/img/up.png" : arrow[3].src = "/assets/img/down.png";
    } else {
        today.value = date.substring(0, 10); // set date

        confirmed.textContent = numFormat.format(data.TotalConfirmed);
        death.textContent = numFormat.format(data.TotalDeaths);
        recovered.textContent = numFormat.format(data.TotalRecovered);
        active.textContent = numFormat.format(data.TotalConfirmed - (data.TotalDeaths + data.TotalRecovered));
    };
};

const setCountryData = async (data) => { // set options in countries combo
    data.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = item.Slug;
        option.text = item.Country;

        combo.appendChild(option);
    });
};

combo.addEventListener("change", (e) => { // countries combo onChange event
    const country = e.target.value;
    const countryData = countries.filter((item) => item.Slug == country)

    if (country == "global") {
        fetchSummary();
        clearDaily();
    } else if (new Date().toJSON().slice(0, 10) == today.value) { // if today equals date input value get summary data
        setSummaryData(countryData[0], today.value);
    } else {
        fetchCountryTotal(country, today.value);
    };
});

today.addEventListener("change", (e) => { // date combo onChange event
    const date = e.target.value;

    if (combo.value !== "global") {
        fetchCountryTotal(combo.value, date);
    };
});

const clearDaily = () => {
    tconfirmed.textContent = "";
    tdeath.textContent = "";
    trecovered.textContent = "";
    tactive.textContent = "";

    for (let i = 0; i < arrow.length; i++) {
        arrow[i].src = "";
    };
};