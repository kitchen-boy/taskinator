var pageContentEl = document.querySelector("#page-content");

// variable to create an id to the current task being created
var taskIdCounter = 0;

// to listen to an event happening on entire form
var formEl = document.querySelector("#task-form");

// variables to reference the 3 columms: Tasks To Do, Tasks In Progress, Tasks Complete
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// Task Array Variable
// this is an empty tasks array - when a new task is created,the object holding all of its data can be added to the array.
var tasks = [];

// Originally part of createTaskHandler function, but refactored into 2 separate functions
// This function is to handle the form submission, get the form values, & pass those values to the second function as arguments. 
// function to dynamically create the task item, i.e. to add a form to the HTML document.
var taskFormHandler = function(event) {

  event.preventDefault();
  // to prevent browser from default behaviour of refreshing page

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  // to retrieve the form's values upon submission to access the submitted text in the input form
  // i.e. retrieved data from a form element using its value property.

  // check if input values are empty strings to prevent creating empty task items
  if (!taskNameInput || !taskTypeInput) {
    // When used in a condition, empty strings and the number 0 are evaluated as falsy values
    // ! -> the "not" operator is used to check if taskNameInput variable is empty by asking if it's a falsy value. 4.2.8.
    alert("You need to fill out the task form!");
    return false;
  }
  // to reset form to default values after submitting task
  // So don't have to erase previous task's content (each task name & task type) before filling out form & submitting a new task.
  // Used reset() method on a form element.
  formEl.reset();

  // declaration to know if form element has attribute "data-task-id"
  var isEdit = formEl.hasAttribute("data-task-id");
  // console.log(isEdit);
  // when submit form to create new task, isEdit wll be false, console.log will say false
  // when form is submitted after editing, isEdit will be true, true will display in console
  
  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {

    // package up data to be an object.
    // instead of having to add another parameter to the function everytime we want to use more data, set up function to accept object as argument.
    var taskDataObj = {
      name: taskNameInput, 
      type: taskTypeInput, 
      status: "to do"
    };

  // createTaskEl will only get called if isEdit = false
  // if isEdit = true, new function completeEditTask() will be called, passing it 3 arguments: name input value, type input value, task id.
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
  }
};

// originally part of createTaskHandler function, but refactored into 2 separate functions
// This first function is to accept the form values as arguments & use them to create the new task item's HTML 
// i.e. to hold the code that creates a new task HTML element. 
//function to create tasks as list item and to have an id for each task
var createTaskEl = function(taskDataObj) {
//debugger
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
  // in each <li>, each nested <div> has <h3> & <span> elements, i.e. set data into the <div>
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  //used DOM element property, innerHTML, to write HTML code instead of simple text.
  listItemEl.appendChild(taskInfoEl);
  // appended data to the <li>

  // to add edit, delete, select options to listed tasks, using taskIdCounter to create buttons that correspond to current task id. 
  var taskActionsEl = createTaskActions(taskIdCounter);
  // append taskActionsEl to listItemEl before listItem El is appended to the page
  listItemEl.appendChild(taskActionsEl);

  // add entire list item to list
  if (taskDataObj.status === "to do") {
    tasksToDoEl.appendChild(listItemEl);
  };
  if (taskDataObj.status === "in progress") {
    tasksInProgressEl.appendChild(listItemEl);
  };
  if (taskDataObj.status === "completed") {
    tasksCompletedEl.appendChild(listItemEl);
  };

  // already have the value of taskDataObj id in the taskIdCounter variable
  //added value of taskDataObj id as a property to the taskDataObj argument variable 
  taskDataObj.id = taskIdCounter;

  // add the entire object to the tasks array.
  // using array method called push() - this method adds any content between the parentheses to the end of the specified array.
  tasks.push(taskDataObj);

  // save tasks to localStorage
  saveTasks();

  // increase task counter for next unique id by one (to keep each id unique)
  taskIdCounter++;

  // to ensure that status property in var TaskDataObj gets to createTaskEl()function via taskDataObj parameter  
  //console.log(taskDataObj);
  //console.log(taskDataObj.status);

};

//form elements (buttons & dropdowns) for tasks need to be dynamically created in JS, because tasks are dynamically created in JS.
// this function returns a DOM element that can be stored in a variable i.e.,(taskActionsEl)
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

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
  // using querySelector() with a selector like .task-item[data-task-id='0'] allowed us to find a different element with the same data-task-id attribute. 
  // selected element by its class name "data-task-id"and then checking to see if it also has the specific data attribute value.
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
// submitting forms using the submit event listener.
formEl.addEventListener("submit", taskFormHandler);


var taskButtonHandler = function(event) {
  
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
  //use event delegation and matches() method to check class name
    var taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }

  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    // get the element's task id by getting HTML attribute "data-task-id"
    //the "data-task-id" attribute was applied to both Delete button & task's <li> element
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

// delete Task function
var deleteTask = function(taskId) {
  // searching for <li class="task-item" data-task-id="value of taskId">
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //console.log(taskId);
  //console.log(taskSelected);
  taskSelected.remove();

  // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  // reassign task array to be the same as updatedTaskArr
  tasks = updatedTaskArr;

  // save tasks to localStorage
  saveTasks();
};

// edit Task function
var editTask = function(taskId) {
  //console.log("editing task #" + taskId);
  // get task list item element aka <li class="task-item" data-task-id="value of taskId">
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  //console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  //console.log(taskType);

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // update text of submit button to say "Save Task" during "edit mode"
  document.querySelector("#save-task").textContent = "Save Task";

  // this will add the taskId to a data-task-id attribute on the form itself
  formEl.setAttribute("data-task-id", taskId);
  //console.log ("task-form");
};

// completeEditTask() function
var completeEditTask = function(taskName, taskType, taskId) {
  //console.log(taskName, taskType, taskId);
  // find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // loop through tasks array and task object with new content
  // completeEditTask() function to update task array
  //debugger
  for (var i = 0; i <tasks.length; i ++) {
    //at each iteration of this for loop, checking to see if individual task's id property matches the taskId argument that was passed into completeEditTask().
    if (tasks[i].id === parseInt(taskId)) {
      //tasks[i].id = number, taskId = string, so wrapped taskId with parseInt() function & convert it to a number for comparison.
      tasks[i].name = taskName;
      tasks[i].type = taskType;
      // if the 2 id values match, then confirmed task at that iteration of the for loop is the one we want to update.
      // then reassigned that task's name & type property to the new content submitted by the form when we finished editing it. 
    }
  //debugger
  }

  alert("Task Updated!");

  // save tasks to localStorage
  saveTasks();

  // reset form by removing taskid & changing button text back to normal
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
}

//function to move task between columns based on status
var taskStatusChangeHandler = function(event) {
  //console.log(event.target);
  //console.log(event.target.getAttribute("data-task-id"));
  
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");
  
  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();
  
  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
    // statusValue referred to at top of page:  var tasksToDoEl = document.querySelector("#tasks-to-do");
  }

  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  }

  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  // tasksToDoEl, taskInProgressEl, tasksCompleted = references to the <ul> elements
  /* if the user selects "In Progress" from the dropdown,
  it will append the current task item to the <ul id="tasks-in-progress"> element 
  with the tasksInProgressEl.appendChild(taskSelected) method. 
  i.e. appendChild() moved task item from its original location in the DOM into the other <ul>  */
  }

  //update task's id in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
    tasks[i].status = statusValue;
    }
  } 
  console.log(tasks);
  // save tasks to localStorage
  saveTasks();

};

// function to save tasks to localStorage everytime we add, update or delete any tasks.
var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // used js tool stringify method to convert tasks array into a string, because localStorage can only store one type of data: strings
  // JSON = JavaScript Object Notation = means of organizing and structuring data that's transferred from one place to another
}

// function to load tasks
var loadTasks = function () {
  //debugger
  // retreive task items from localStorage
  var savedTasks = localStorage.getItem("tasks");
  // test the task retrieval
  console.log(localStorage.getItem("tasks"));
  // if nothing returns from localStorage, tasks === null
  // check if tasks is equal to null by using an if statement
  // If it is, set tasks back to an empty array by reassigning it to [] & adding a return false
  if (!savedTasks) {
    return false;
  }
  console.log("Saved tasks found!");

  // else (if it's not null), load up on saved tasks

  // converts tasks from the string format back into an array of objects
  savedTasks = JSON.parse(savedTasks);
  console.log(savedTasks);

  //Print task items to the page
  // Iterates through a tasks array and creates task elements on the page from it.
  for (var i = 0; i < savedTasks.length; i++) {
    //pass each task object into the 'createTaskEl()' function
    createTaskEl(savedTasks[i]);
    
    // test <for> loop to 
    console.log(tasks[i]);
    //
  }
};

// event listener for page-content element at top
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();