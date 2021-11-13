// variable to create an id to the current task being created
var taskIdCounter = 0;

// to listen to an event happening on entire form
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to dynamically create the task item
var taskFormHandler = function(event) {

  event.preventDefault();
  // to prevent browser from default behaviour of refreshing page

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    // When used in a condition, empty strings and the number 0 are evaluated as falsy values
    // ! -> the "not" operator is used to check if taskNameInput variable is empty by asking if it's a falsy value.
    alert("You need to fill out the task form!");
    return false;
  }
  // to reset form after submitting task
  formEl.reset();

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput, 
    type: taskTypeInput
  };

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};

//function to create tasks as list item and to have an id for each task
var createTaskEl = function(taskDataObj) {
  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div")
  // give it a class name
  taskInfoEl.className = "task-info";

  // add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // to add edit, delete, select options to listed tasks, using taskIdCounter to create buttons that correspond to current task id. 
  var taskActionsEl = createTaskActions(taskIdCounter);
  // append taskActionsEl to listItemEl before listItem El is appended to the page
  listItemEl.appendChild(taskActionsEl);


  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id by one (to keep each id unique)
  taskIdCounter++;
};

//form elements (buttons & dropdowns) for tasks need to be dynamically created in JS, because tasks are dynamically created in JS.
// this function returns a DOM element that can be stored in a variable i.e.,(taskActionsEl)
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.classname = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  //properties & methods of the <button> elements

  actionContainerEl.appendChild(editButtonEl);
  // appendChild() method will add this <button> to the <div>

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);
 
  var statusSelectEl = document.createElement("select");
  
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  // array declaration of variables for select options elements
  // e.g. statusChoices[0] = "To Do"; statusChoices[1] = "In Progress", and so on. 

  // for loop to execute option element a certain number of times
  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement("option");
    
    // statusChoices[i] returns the value of the array at given index
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;

};
/* an event listener statment = "on submit, create a task" targeting the form element */
formEl.addEventListener("submit", taskFormHandler);