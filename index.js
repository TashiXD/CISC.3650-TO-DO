// script.js

function updateDate() {
    var currentDate = new Date();

    // Get the month name
    var monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    var monthName = monthNames[currentDate.getMonth()];

    // Get the day and year
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();

    // Display the current date in the 'current-time' element
    document.getElementById("current-date").innerHTML =
        monthName + " " + day + ", " + year;
}

// Call the updateDate function to initiate the date display
updateDate();

$('#exampleModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})