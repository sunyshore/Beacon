var RADIUS = 5000
var ZIP = "K7L4T8"
const API_KEY = "AIzaSyAp5Wy8XyfO2a6U0eKlFns8NhDbxFieRx0"
var LAT;
var LNG;
var REGION = 'ca'
var results = [];

let btn = document.getElementById("submit");

// Add an event handler for the click event
btn.addEventListener("click", onSubmit);


function onSubmit(){
    REGION = document.getElementById("country").value
    RADIUS = document.getElementById("radius").value
    ZIP = document.getElementById("zip").value
}


async function getCoordinates(ZIP){
    let data;
    try {
        let response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+ ZIP +'&key='+ API_KEY + '&region=' + REGION);
        data = await response.json()
        LAT = data.results[0].geometry.location.lat;
        LNG = data.results[0].geometry.location.lng;
    } catch (e) {
        LAT = 0;
        LNG = 0;
        alert("Location Does Not Exist Or Server Is Down!")
    }
  };


async function setInfo(place_id){
    let request = {
        placeId: place_id,
        fields: ['website', 'formatted_phone_number', 'opening_hours']
    }
    const service2 = new google.maps.places.PlacesService(places);

    const myPromise = new Promise((resolve,reject) => {
        service2.getDetails(request, (place, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                resolve ([place.formatted_phone_number, place.website, place.opening_hours])
            } else {
                resolve(["Unknown", "Unknown", "Unknown"])
            }
        });
    });

    return myPromise

};

async function findPlaces(){

    await getCoordinates(ZIP);

    let request = {
        location: new google.maps.LatLng(LAT, LNG),
        keyword: 'mental health',
        radius: RADIUS
    };
    
    var places = document.getElementById('places');
    var service = new google.maps.places.PlacesService(places);

    var callback = async (response, status, pagination) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.push(...response);
        }

        if (pagination.hasNextPage) {
            setTimeout(() => pagination.nextPage(), 2000);
        } else {
            await looper();
            displayResults();
        }
    }

    const displayResults = () => {
        console.log(results);
        results.sort((a, b) => a.rating > b.rating ? -1 : 1)
                .forEach(result => {
                    places.innerHTML += `<li>${result.name} - ${result.rating} <br> ${result.formatted_phone_number} - ${result.website}</li>`;
                });
    };

    const looper = async () => {
        for (i = 0; i < results.length; i++) {
            place_id = results[i].place_id;
            lis = await setInfo(place_id, results, i)
            results[i].formatted_phone_number = lis[0];
            results[i].website = lis[1];
            results[i].opening_hours = lis[2];
        }
    };

    service.nearbySearch(request, callback);
};

//findPlaces();


