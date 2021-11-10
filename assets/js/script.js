var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to dynamically create the task item
var createTaskHandler = function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
}
// event listener statment = "on a button click, create a task"
buttonEl.addEventListener("click", createTaskHandler);
/* 2 long anonymous functions replaced by preceding code
 which uses createTaskhandler as callback function */
/* buttonEl.addEventListener("click", function() {
  var taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";
  taskItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(taskItemEl);
}); */
/*buttonEl.addEventListener("click", function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
});*/


