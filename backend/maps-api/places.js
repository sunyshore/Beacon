var RADIUS = 5000
var ZIP = "L4B3G4"
const API_KEY = "AIzaSyAp5Wy8XyfO2a6U0eKlFns8NhDbxFieRx0"


function getCoordinates(ZIP, _callback){
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+ ZIP +'&key='+ API_KEY + '&region=ca')
      .then(response => response.json())
      .then(data => {
        LAT = data.results[0].geometry.location.lat;
        LNG = data.results[0].geometry.location.lng;
        console.log(LAT,LNG)
        _callback();
      })
  };

function findPlaces(){
    
    let request = {
        location: new google.maps.LatLng(LAT, LNG),
        keyword: 'mental health',
        radius: RADIUS
    };

    const results = [];
    const places = document.getElementById('places');
    const service = new google.maps.places.PlacesService(places);

    const callback = (response, status, pagination) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.push(...response);
        }

        if (pagination.hasNextPage) {
            setTimeout(() => pagination.nextPage(), 2000);
        } else {
            displayResults();
        }
    }

    const displayResults = () => {
        results.sort((a, b) => a.rating > b.rating ? -1 : 1)
                .forEach(result => {
                    places.innerHTML += `<li>${result.name} - ${result.rating}</li>`;
                });
    };

    service.nearbySearch(request, callback);

};

getCoordinates(ZIP, findPlaces);
