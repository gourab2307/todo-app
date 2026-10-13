// Step 1: Find the elements on the page using their ids.
// "document" is the whole web page. getElementById looks up one element by its id.
// We store each element in a variable (const) so we can use it later.
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

// Step 2: Write a function that adds a task.
// A function is a named block of code that we can run whenever we want.
function addTask() {
  // Read what the user typed. .value gives the text inside the input box.
  // .trim() removes extra spaces from the start and end.
  const taskText = taskInput.value.trim();

  // If the box is empty, stop here. "return" exits the function early.
  if (taskText === "") {
    return;
  }

  // Create a brand-new list item (<li>) in memory.
  // It isn't on the page yet.
  const listItem = document.createElement("li");

  // Put the user's text inside the list item.
  listItem.textContent = taskText;

  // Add the list item into the <ul> so it now shows up on the page.
  taskList.appendChild(listItem);

  // Clear the input box so the user can type the next task.
  taskInput.value = "";

  // Put the cursor back in the input box, ready for typing.
  taskInput.focus();
}

// Step 3: Connect the button to the function.
// addEventListener means "when this happens, run this function".
// Here: when the Add button is clicked, run addTask.
// Note: we write addTask without () because we're handing over the function
// to run later, not running it right now.
addButton.addEventListener("click", addTask);