// to listen to an event happening on entire form
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to dynamically create the task item
var createTaskHandler = function(event) {
  event.preventDefault();
  // to prevent browser from default behaviour of refershing page
 
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
};

// an event listener statment = "on submit, create a task"
// targeting the form element
formEl.addEventListener("submit", createTaskHandler);

/* examples of 2 long anonymous event listener functions replaced by preceding code
 which uses createTaskhandler as callback function */
/* buttonEl.addEventListener("click", function() {
  var taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";
  taskItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(taskItemEl);
}); */
/* buttonEl.addEventListener("click", function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
});*/


