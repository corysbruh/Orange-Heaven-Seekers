let map;
let directionsService;
let directionsRenderer;
let userDestination;
let geocoder;
let markers = []

function remove_marker(){
    if(markers.length!=0){
        for(var i =0;i<markers.length;i++){
            markers[i].setMap(null)
        }
    }
    else{}
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.7175, lng: -117.8311 }, 
        zoom: 12,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    geocoder = new google.maps.Geocoder()
    marker = new google.maps.Marker()
}

function setDestination(address){
    userDestination = address;
}

function calculateRoute() {
    remove_marker()
    const origin = document.getElementById('userAddress').value;
    const destination = userDestination;

    if (!origin || !destination) {
        alert('Please enter both origin and destination.');
        return;
    }
    geocoder.geocode({"address":origin}, (result, status) =>{
        latLngOrigin = result[0].geometry.location;
        var markerO = new google.maps.Marker({
            position:{lat:latLngOrigin.lat(), lng:latLngOrigin.lng()},
            zIndex:999,
            map:map,
            icon: {
                url: 'lebronsun.png', 
                scaledSize: new google.maps.Size(120,60)
            }
        });
        markers.push(markerO)
    });
    geocoder.geocode({"address":destination}, (result, status) =>{
        latLngDest = result[0].geometry.location;
        var markerD = new google.maps.Marker({
            position:{lat:latLngDest.lat(), lng:latLngDest.lng()},
            zIndex:999,
            map:map,
            icon: {
                url: 'lebronjams.png', 
                scaledSize: new google.maps.Size(50,50)
            }
        });
        markers.push(markerD)
    });
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
