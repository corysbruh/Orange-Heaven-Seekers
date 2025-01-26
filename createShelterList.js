function get_shelter() {
    //     $("#table-container").empty();
    let val = document.getElementById("userAddress").value;
    let site = "http://127.0.0.1:5000/shelter_loc/" + val;
    console.log(site);

    // Fetch shelter data
    fetch(site)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson.dix);

            // funny bunnies going rogue
            localStorage.setItem('shelterData', JSON.stringify(myJson.dix));
            localStorage.setItem('origin', JSON.stringify(val));
            window.location.href = window.location.origin + '/orangeHeavenSeeker.html';
            removeLebron();

            let userLocation;
            geocodeAddress(val)
            .then((location) => {
                userLocation =  location;
            })
            console.timeEnd();
            let counter = 0;
            console.log(myJson);
            let data = createData(myJson, () => {
                counter++;
                console.log(counter);
                console.log(myJson.dix.length);
                if( counter == myJson.dix.length){
                    for( let i in data){
                        myJson.dix[i].distance = calculateHaversineDistance(userLocation, myJson.dix[i].distance);
                        console.log(myJson.dix[i].distance);
                    }
                    data.sort((a, b) => a.distance - b.distance);
                    createTable(data);
                }
            });
            // // Clear existing data and push the fetched data
            // let data = []; // Local data array
            // for (var i in myJson.dix) {
            //     data.push(myJson.dix[i]);
            // }
            // console.log(data);

            // // Create the table immediately after fetch completes
            // createTable(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function createData(json, callback){
    let data = []; 
        for (let i in json.dix) {
            setTimeout(() => {
                geocodeAddress(json.dix[i].address)
                .then((location) => {
                    console.log(location);
                    json.dix[i]["distance"] = location;
                    data.push(json.dix[i]);
                })
                callback()
            }, i * 100);
        }
    
    console.log(" s")
    return data;
}

function geocodeAddress(address) {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                const location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
            } else {
                console.error("Geocoding failed:", status);
                reject(null);
            }
        });
    });
}

function calculateHaversineDistance(loc1, loc2) {
    const R = 6371; 
    const lat1 = loc1.lat * (Math.PI / 180);
    const lat2 = loc2.lat * (Math.PI / 180);
    const deltaLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const deltaLng = (loc2.lng - loc1.lng) * (Math.PI / 180);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

// Function to create and append the table using jQuery
function createTable(data) {
    $(document).ready(function () {
        // Remove any existing table before creating a new one
        $("#table-container").empty();

        // Create the table element
        const $table = $("<table>").css({
            width: "100%",
            borderCollapse: "collapse",
        });

        // Add table headers
        const $thead = $("<thead>");
        const $headerRow = $("<tr>");
        ["Name", "Address", "Website", "Number"].forEach((header) => {
            $("<th>")
                .text(header)
                .css({
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                    textAlign: "left",
                })
                .appendTo($headerRow);
        });
        $headerRow.appendTo($thead);
        $thead.appendTo($table);

        // Add table body
        const $tbody = $("<tbody>");
        data.forEach((row) => {
            const $row = $("<tr>");
            $("<td>")
                .text(row.name)
                .css({ border: "1px solid #ddd", padding: "8px", width: "10%", height: "10%" })
                .appendTo($row);
            $("<td>")
                .text(row.address)
                .css({ border: "1px solid #ddd", padding: "8px" })
                .on("click", function () {
                    setDestination(row.address);
                    calculateRoute();
                    $(this).css("color", "blue");
                    //calculateRoute(row.address);
                    //$(this).css("color", "blue");
                })
                .appendTo($row);
            $("<td>")
                .text(row.web)
                .css({ border: "1px solid #ddd", padding: "8px" })
                .on("click", function () {
                    alert(`You clicked on: ${row.website}`);
                })
                .appendTo($row);
            $("<td>")
                .text(row.phone)
                .css({ border: "1px solid #ddd", padding: "8px" })
                .appendTo($row);
            $row.appendTo($tbody);
        });
        $tbody.appendTo($table);

        // Append the table to the container
        $("#table-container").append($table);
    });
}

function removeLebron() {
    const overlay = document.getElementById('dvd-overlay');
    overlay.classList.add('hidden');
}
