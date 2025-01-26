let map;
let directionsService;
let directionsRenderer;
let userDestination;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.7175, lng: -117.8311 }, 
        zoom: 12,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

function setDestination(address){
    userDestination = address;
}

function calculateRoute() {
    const origin = document.getElementById('userAddress').value;
    const destination = userDestination;

    if (!origin || !destination) {
        alert('Please enter both origin and destination.');
        return;
    }

    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            const output = document.querySelector("#output");
            //output.innerHTML = "<div class='alert-info'> From: " + document.getElementById("userAddress").value + ".<br/>To: " + document.getElementById("userDestination").value + ". <br /> Driving distance:" + result.routes[0].legs[0].distance.text + ".<br /> Duration: " + result.routes[0].legs[0].duration.text + ". </div>";
            output.innerHTML = "<div class='alert-info'> Driving Distance: " + result.routes[0].legs[0].distance.text + "<br /> Driving Duration: " + result.routes[0].legs[0].duration.text + "</div>";
            directionsDisplay.setDirections(result);
        } else {
            alert('Directions request failed due to ' + status);
        }
    });
}
