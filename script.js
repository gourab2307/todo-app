// Step 1: Find the elements on the page using their ids.
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

// Step 2: Keep our tasks as DATA, separate from what's on the page.
// "tasks" is an array (a list). Each task is an object that looks like:
//   { text: "Buy milk", done: false }
// "let" (instead of const) is used because we will replace this list
// with the saved one when the page loads.
let tasks = [];

// Remembers which filter is selected: "all", "active" or "completed".
// This is NOT saved in localStorage, so it resets to "all" on refresh.
let currentFilter = "all";

// Step 3: Save the tasks in the browser.
// localStorage is a small storage space inside the browser that survives
// refreshes. It can only store text, so JSON.stringify turns our array
// into text first. "tasks" is the name (key) we save it under.
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Step 4: Load saved tasks when the page opens.
function loadTasks() {
  // Look for text saved earlier under the name "tasks".
  const saved = localStorage.getItem("tasks");

  // If something was saved, JSON.parse turns the text back into an array.
  // If nothing was saved (first visit), saved is null and we keep the empty list.
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// Step 5: Draw the whole list on the page from the tasks array.
// Whenever the data changes, we clear the list and draw it again.
// This keeps the page and the saved data always matching.
function renderTasks() {
  // Empty the <ul> so we don't draw tasks twice.
  taskList.innerHTML = "";

  // forEach runs the code below once for every task in the array.
  // "task" is the current task, "index" is its position (0, 1, 2...).
  tasks.forEach(function (task, index) {
    // Skip tasks that don't match the selected filter.
    // "return" here only skips THIS task and moves on to the next one.
    // We still loop over the full array so "index" stays correct for
    // delete, even when some tasks are hidden.
    if (currentFilter === "active" && task.done) {
      return;
    }
    if (currentFilter === "completed" && !task.done) {
      return;
    }

    const listItem = document.createElement("li");

    // The task text, in its own span.
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    // If this task is marked done, give it the "done" class (strikethrough).
    if (task.done) {
      taskSpan.classList.add("done");
    }

    // Clicking the text flips done between true and false,
    // saves the change, and redraws the list.
    taskSpan.addEventListener("click", function () {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    // The delete button.
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Give the button a class so CSS can style it (see .delete-button).
    deleteButton.className = "delete-button";

    // Clicking Delete removes this task from the array.
    // splice(index, 1) means "remove 1 item starting at this position".
    // Then we save and redraw.
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    // Put the text and button in the list item, and the item in the list.
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

// Step 6: Add a new task.
function addTask() {
  const taskText = taskInput.value.trim();

  // Don't add empty tasks.
  if (taskText === "") {
    return;
  }

  // Add a new task object to the END of the array.
  tasks.push({ text: taskText, done: false });

  // Save, then redraw the list so the new task appears.
  saveTasks();
  renderTasks();

  // Clear the input box and put the cursor back in it.
  taskInput.value = "";
  taskInput.focus();
}

// Step 7: Connect the Add button to the addTask function.
addButton.addEventListener("click", addTask);

// Step 8: Make the filter buttons work.
// querySelectorAll finds ALL elements with the class "filter-button".
const filterButtons = document.querySelectorAll(".filter-button");

// Loop over each filter button and give it a click listener.
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Read the value from the button's data-filter attribute.
    currentFilter = button.dataset.filter;

    // Move the "active" class to the button that was just clicked,
    // so it looks selected. First remove it from every button...
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    // ...then add it to the clicked one.
    button.classList.add("active");

    // Redraw the list using the new filter.
    renderTasks();
  });
});

// Step 9: When the page first opens, load saved tasks and draw them.
loadTasks();
renderTasks();