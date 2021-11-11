// to listen to an event happening on entire form
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to dynamically create the task item
var createTaskHandler = function(event) {

  event.preventDefault();
  // to prevent browser from default behaviour of refreshing page

  var taskNameInput = document.querySelector("input[name='task-name']").value;
 
 
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = taskNameInput;
  tasksToDoEl.appendChild(listItemEl);
};

// an event listener statment = "on submit, create a task"
// targeting the form element
formEl.addEventListener("submit", createTaskHandler);