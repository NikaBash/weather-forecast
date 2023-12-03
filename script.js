const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "19ac195453a2fd029623c5947a6f15cb"
}
const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

function enter(e) {
    if (e.keyCode === 13) {
        getInfo(input.value);
    }
    }
    
const myKey = "1ebc3a9eeed24d6ba22de91bbde407c0";
async function getIp() {
    const res = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${myKey}`);
    const result = await res.json();
    getInfo(result.city);
}   
getIp();

async function getInfo (data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    let city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate();

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].main}`;

    let variation = document.querySelector("#variation");
    variation.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>` + " " + "Max " + `${Math.round(result.main.temp_max)}<span>°</span>`
}
function getOurDate(){
    const myDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = days [myDate.getDay()];
    let todayDate = myDate.getDate();
    let month = months [myDate.getMonth()];
    let year = myDate.getFullYear();
    let showDate = document.querySelector("#date");
    showDate.textContent = `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}`;
    input.value = "";
}
