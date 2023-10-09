// script.js
// Task counter
let taskCount = 0;

// Map priority to background color
var priorityColors = {
  low: "rgba(138, 204, 161, 0.5)", // Greenish color for Low priority
  mid: "rgba(255, 193, 7, 0.5)", // Yellowish color for Mid priority
  high: "rgba(255, 0, 0, 0.5)", // Red color for High priority
  // Add more priorities and colors as needed
};

function updateDate() {
  var currentDate = new Date();

  // Get the month name
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var monthName = monthNames[currentDate.getMonth()];

  // Get the day and year
  var day = currentDate.getDate();
  var year = currentDate.getFullYear();
  // Display the current date in the 'current-time' element
  document.getElementById("current-date").innerHTML =
    monthName + " " + day + ", " + year;

  //this is for the today's task
  var formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  document.getElementById("currentDateDisplay").innerText = formattedDate;
}

// Call the updateDate function to initiate the date display
updateDate();

// Function to add a new task
function addTask() {
  // Get task details from the form
  var taskName = document.getElementById("task").value;
  var priority = document.querySelector("#newTask select").value;
  var dueDate = document.getElementById("dueDate").value;
  var description = document.getElementById("discription").value;

  // Check if any of the required fields are empty
  if (!taskName || !dueDate || !description) {
    alert("Please fill out all required fields");
    return; // Exit the function if any field is empty
  }

  // Create a new task element
  var newTaskElement = createTaskElement(
    taskName,
    dueDate,
    taskCount,
    priority,
    description
  );
  taskCount = taskCount + 1;

  // Determine if the task is due today or upcoming
  var today = new Date().toISOString().split("T")[0];
  if (dueDate === today) {
    document.getElementById("today-tasks").appendChild(newTaskElement);
  } else if (dueDate > today) {
    document.getElementById("upcoming-task").appendChild(newTaskElement);
  } else {
    alert("Choose a valid date");
  }

  // Clear input fields
  document.getElementById("task").value = "";
  document.querySelector("#newTask select").value = "low"; // Set default priority or select the appropriate default
  document.getElementById("dueDate").value = "";
  document.getElementById("discription").value = "";

  // Close the modal
  $("#AddTaskModal").modal("hide");
}

// Function to create a new task element
function createTaskElement(
  taskName,
  dueDate,
  taskCount,
  priority,
  description
) {
  // Convert the dueDate to a Date object
  var dueDateObject = new Date(dueDate);

  // Format the date as MM/DD/YYYY
  var formattedDueDate = dueDateObject.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  var taskElement = document.createElement("label");
  taskElement.className = "task d-flex col mb-2";
  taskElement.innerHTML = `
    <input class="form-check-input flex-shrink-0 strikethrough mt-2 me-1 bigger-checkbox" type="checkbox"  oninput="celebration(this)">
    <div id="task" class="d-flex row w-100 pe-2 ps-3">
      <label class="list-group-item" data-bs-toggle="collapse" href="#task-${taskCount}" role="button" aria-expanded="false" aria-controls="collapseExample" style="background-color: ${
    priorityColors[priority] || "rgba(138, 204, 161, 0.5)"
  }">
        <div class="d-flex justify-content-between">
          <span class="fw-bold">${taskName}</span>
          <span class="fw-bold">${formattedDueDate}</span>
        </div>
        <div class="collapse w-100" id="task-${taskCount}">
          <div class="mb-2">${description}</div>
          </div>
        </div>
      </label>
    <span class="close">
      <button type="button" class="btn-close mt-2 ms-1" onclick="this.parentElement.parentElement.remove()"></button>
    </span>
  `;
  return taskElement;
}

// When the task is checked
function celebration(elt) {
  var img = document.getElementById("celeb");
  if (elt.checked) {
    img.style =
      "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);";
    // Displays the celebratory img for .7 seconds when list item elt is checked
    setTimeout(function () {
      img.style = "display:none";
    }, 900);
  }
}
