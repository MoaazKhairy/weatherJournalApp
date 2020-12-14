/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';   ///url of weather API of openweather.org
const apiKey = '&appid=4d47a6d38d292cba7e90924055b0cf56';             /// key from subscribtion to API
const clesiusConvert = '&units=metric';           /// additional part which added to Fetched URL to convert temp. to celisus unit

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// create Event Listener to do action when click on button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;   // get entered Zip code from form
    const newFeeling = document.getElementById('feelings').value; // get entered newFeeling from form
    //  condition if newZip not entered give alert
    if (newZip === "") {
        alert("Enter Zip Code");
        return;
    }
    //  using Chain promises of get data from API by zip code to get temp then post data into localhost then update UI 
    getTempFromAPI(baseURL, newZip, apiKey).then(function (data) {
        postData('/add', { date: newDate, temp: data.main.temp, feeling: newFeeling })
    }).then(setTimeout(updateUI, 450)) /// use delay 450ms to fetch data from API and post in localhost then updateUI to affected by getting data from local

}

//  fetch temp from API by baseURL, newZip and apiKey by async function
const getTempFromAPI = async (baseURL, newZip, apiKey) => {
    const res = await fetch(baseURL + newZip + clesiusConvert + apiKey); // make complete api url
    try {
        const data = await res.json();   
        return data;
    }
    catch (err) {
        console.log('err is: ' + err);
    }
}

//  fetch post request by async function with url and object data
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch (err) {
        console.log('err is: ' + err);
    }
}

//  update UI by async function after getting data and put it in innerHtml of DOM Elements
const updateUI = async () => {
    const request = await fetch('/getProjectData');
    try {
        const updatedData = await request.json();
        document.getElementById('date').innerHTML = updatedData.date; //select element from DOM and update it
        document.getElementById('temp').innerHTML = updatedData.temp;
        document.getElementById('content').innerHTML = updatedData.feeling;
    }
    catch (err) {
        console.log('err is: ' + err);
    }
}
