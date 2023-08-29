// Personal API Key for OpenWeatherMap API
// "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}"
const apiKey = '&appid=30e8cbfba3677af55ff2337a5c849712&units=imperial';  
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; 

/* Global Variables */
const zipCodeId = document.getElementById('zip');
const feelingsId = document.getElementById('feelings');
const buttonId = document.getElementById('generate');
const dateId = document.getElementById('date');
const temperatureId = document.getElementById('temp');
const contentId = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
const date = d.toDateString();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear(); 

// Event listener for the button
buttonId.addEventListener('click', (button) => {
    button.preventDefault();
    const dataUrl = `${baseURL}${zipCodeId.value}${apiKey}`;
    // console.log(dataUrl);
    retrieveData(dataUrl).then((data)=> {
            postData('/postAllData', {date:date, temp:data.main.temp, content:feelingsId.value});
        }).then((data)=> {
            getData('/getAllData');
        });
});

// async function that will get the needed data from openweathermap api
const retrieveData = async (url) => {
    try {
        const retrievedData = await fetch(url);
        const data = await retrievedData.json();
        // console.log(data);
        // return data;
        if (data.cod == 200) {
            // console.log(data);
            return data;
        } else {
            // console.log(data.message);
            return data.message;
        }
    } catch(error) {
        console.log('error', error);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newDate = await response.json();
        // console.log(newDate);
        return newDate;

    } catch (error) {
        console.log('error', error);
    }
};

const getData = async (url) => {
    const information = await fetch(url);
    try {
        const recievedInfo = await information.json();
        console.log(recievedInfo);
        if (recievedInfo.date){
            console.log("you are in the right path");
            dateId.innerHTML = recievedInfo.date;
            temperatureId.innerHTML = recievedInfo.temp;
            contentId.innerHTML = recievedInfo.content;
        } else {
            document.querySelector('#error').innerHTML = recievedInfo.message;
        }
        return recievedInfo;

    } catch (error) {
        console.log('error', error);
    }
};