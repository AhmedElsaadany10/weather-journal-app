// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// The URL to retrieve weather information from API
const dataURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//api key
const apiKey = ",&appid=6ec4609f2031f5e9e581e9906e9c1b35&units=metric";

// the URL of the server to post data
const server = "http://127.0.0.1:8000";

// show error
const error = document.getElementById("error");

  // createData //
const createData = () => { 
  const zip = document.getElementById("zip").value;
  const feeling = document.getElementById("feeling").value;

  getWeatherData(zip).then((data) => {
    if (data) {
      const {
        main: { temp },
        name: city,
      } = data;

      const info = {
        newDate,
        city,
        temp: Math.round(temp), 
        feeling,
      };

      postData(server + "/add", info);

      updatingUI();
      document.getElementById('data').style.opacity = 1;
    }
  });
};

//click button
document.getElementById("generate").addEventListener("click", createData);

//get function
const getWeatherData = async (zip) => {
  try {
    const res = await fetch(dataURL + zip + apiKey);
    const data = await res.json();

    //to display error
    if (data.cod != 200) {
      error.innerHTML = data.message;
      setTimeout(_=> error.innerHTML = '', 2000)
      throw `${data.message}`;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// pOST function
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await res.json();
    console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

// show data
const updatingUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();
    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp + '&degC';
    document.getElementById("feel").innerHTML = savedData.feeling;
  } catch (error) {
    console.log(error);
  }
};