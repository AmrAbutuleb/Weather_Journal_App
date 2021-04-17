// URL and API Credentials
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const APIkey = '&appid=e7596e289078034a17a0a4d6cd744d00&units=metric'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+' / '+ d.getDate()+' / '+ d.getFullYear();

//Fetch the button ID and add an event listener
document.getElementById('generate').addEventListener('click',performaction);

//Function to Post data to the server after fetching with the openweathermap API
function performaction(e){
    const feel =  document.getElementById('feelings').value;
    const location = document.getElementById('zip').value; 

    getData(baseURL,location,APIkey)
    
    .then(function(data){
        // Add data
        console.log(data.main.temp + "\n" + newDate + "\n" + feel);
        postData('http://localhost:8000/data', {temp: data.main.temp+" Celsius", date: newDate, response: feel} )
        .then(updateUI())
      })
    
}
  
//Function to fetch with the API
const getData = async (Base,zip,key) => {
    const res = await fetch(Base+zip+key)

    try{
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error){
        console.log("error", error)
    }
}

//Posting data to the server
const postData = async (url = '', data = {}) => {
    const Request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        console.log("Ya rab")
        const newData = await Request.json();
        console.log(newData)
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

//Dynamically Update the UI 
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.response;
    }
    catch (error) {
        console.log('error', error);
    }
}

// //Function for rounding the temprature after calculating it in Celsius
// function round(value, precision) {
//     var multiplier = Math.pow(10, precision || 0);
//     return Math.round(value * multiplier) / multiplier;
// }

