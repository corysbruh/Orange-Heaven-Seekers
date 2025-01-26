function get_shelter() {
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

            // Clear existing data and push the fetched data
            let data = []; // Local data array
            for (var i in myJson.dix) {
                data.push(myJson.dix[i]);
            }
            console.log(data);

            // Create the table immediately after fetch completes
            createTable(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
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
