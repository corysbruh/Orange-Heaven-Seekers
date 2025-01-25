$(document).ready(function () {
    // Table data
    const data = [
        { name: "John Doe", address: 28, website: " ", number: "New York" }
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
                .on("click", function () {
                    alert(`You clicked on: ${row.name}`);
                })
                .appendTo($row);
            $("<td>")
                .text(row.address)
                .css({ border: "1px solid #ddd", padding: "8px" })
                .on("click", function () {
                    alert(`You clicked on: ${row.address}`);
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
                .on("click", function () {
                    alert(`You clicked on: ${row.number}`);
                })
                .appendTo($row);
            $row.appendTo($tbody);
        });
        $tbody.appendTo($table);

        // Append the table to the container
        $("#table-container").append($table);
    });
});
