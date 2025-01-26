function get_shelter(){
    let val = document.getElementById("userAddress").value
    site = "http://127.0.0.1:5000/shelter_loc/"+val
    console.log(site)
    fetch(site)
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson.dix)
            for (var i in myJson.dix){
                data.push(myJson.dix[i])
            }
            console.log(data)
        });
}


$(document).ready(function () {
    // Table data
    data = [
        { name: "Chick-fil-A", address: "4127 Campus Dr, Irvine, CA 92612", website: "https://www.chick-fil-a.com/locations/ca/university-center-irvine?utm_source=yext&utm_medium=link", number: "+19497250230" },
        { name: "Round Table Pizza", address: "4551 Jamboree Rd, Newport Beach, CA 92660", website: "", number: "+19493879877"},
        { name: "Herb & Ranch", address: "5301 California Ave #140, Irvine, CA 92617", website: "", number: "+19493164491"},
        { name: "Starbucks", address: "4545 Campus Dr, Irvine, CA 92612", website: "", number: "+19498542301"},
        { name: "Taco Bell", address: "4101 Campus Dr, Irvine, CA 92612", website: "", number: "+19497258348"}
    ];

    // Button click event to create the table
    $("#create-table-btn").click(function () {
        // Check if the table already exists to prevent duplicates
        if ($("#table-container table").length > 0) {
            alert("The table has already been created!");
            return;
        }

        // Create the table element
        const $table = $("<table>").css({
            width: "100%",
            borderCollapse: "collapse",
        });

        // Add table headers
        const $thead = $("<thead>");
        const $headerRow = $("<tr>");
        ["Name", "Address", "Website", "Number"].forEach(header => {
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
        data.forEach(row => {
            const $row = $("<tr>");
            $("<td>")
                .text(row.name)
                .css({ border: "1px solid #ddd", padding: "8px", width: "10%", height: "10%"})
                .appendTo($row);
            $("<td>")
                .text(row.address)
                .css({ border: "1px solid #ddd", padding: "8px" })
                .on("click", function () {
                    setDestination(row.address)
                    calculateRoute()
                    $(this).css("color", "blue"); 
                })
                .appendTo($row);
            $("<td>")
                .text(row.website)
                .css({ border: "1px solid #ddd", padding: "8px" })
                .on("click", function () {
                    alert(`You clicked on: ${row.wesbite}`);
                })
                .appendTo($row);
            $("<td>")
                .text(row.number)
                .css({ border: "1px solid #ddd", padding: "8px" })
                .appendTo($row);
            $row.appendTo($tbody);
        });
        $tbody.appendTo($table);

        // Append the table to the container
        $("#table-container").append($table);
    });
});
