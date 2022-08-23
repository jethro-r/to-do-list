const newItemInput = document.querySelector(".input");
const newItemButton = document.querySelector(".inputButton");

function get(elementClass) {
  let element = document.querySelector("." + elementClass);
  return element;
}
function gets(elementsClass) {
  let elements = document.querySelectorAll("." + elementsClass);
  return elements;
}

function addCurrentItem(text) {
  let currentToDoList = get("currentToDoList");

  const listItem = document.createElement("li");
  listItem.setAttribute("class", "toDoItem");

  listItem.innerHTML = `
  
  <input value="${text}" class="toDoItemText">
  <button class="complete">Complete</button>
  <div class="dropdown">
    <ul class="dropdownButton" onclick="showDropdown()">
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <!-- menu -->
    <div id="myDropdown" class="dropdownContent">
      <button id="delete">Delete</button>
    </div>
  </div>
  `;

  if (text !== "") {
    currentToDoList.appendChild(listItem);
    addEventListenersToDoItem(listItem);
    newItemInput.value = "";
  } else {
    console.log("Text is needed to create list item"); // add more code to remind user to give a valid input
  }
}

function addCompletedItem(text) {
  let completedToDoList = get("completedToDoList");

  const listItem = document.createElement("li");
  listItem.setAttribute("class", "toDoItem completedItem");

  listItem.innerHTML = `
  <input value="${text}" class="completedItemText">
  <button class="reset">Reset</button>
  <div class="dropdown">
    <ul class="dropdownButton" onclick="showDropdown()">
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <!-- menu -->
    <div id="myDropdown" class="dropdownContent">
      <button id="delete">Delete</button>
    </div>
  </div>
  `;

  if (text !== "") {
    completedToDoList.appendChild(listItem);
    addEventListenersToDoItem(listItem);
    newItemInput.value = "";
  } else {
    console.log("Text is needed to create list item"); // add more code to remind user to give a valid input
  }
}

function completeToDoItem(e) {
  let toDoItem = e.target.parentElement;
  let inputText = toDoItem.querySelector("input").value;
  toDoItem.remove();

  addCompletedItem(inputText);
}

function resetToDoItem(e) {
  let toDoItem = e.target.parentElement;
  let inputText = toDoItem.querySelector("input").value;
  toDoItem.remove();
  addCurrentItem(inputText);
}

function deleteToDoItem(e) {
  e.target.closest("li").remove();
}

function addEventListenersToDoItem(listItem) {
  let deleteButton = listItem.querySelector("#delete");
  deleteButton.addEventListener("click", deleteToDoItem);

  let completeButton = listItem.querySelector(".complete");
  let resetButton = listItem.querySelector(".reset");

  if (completeButton) {
    completeButton.addEventListener("click", completeToDoItem);
  }
  if (resetButton) {
    resetButton.addEventListener("click", resetToDoItem);
  }
}

function saveToDoItems() {
  let currentToDoListOfInputs =
    get("currentToDoList").querySelectorAll(".toDoItemText");
  let completedToDoListOfInputs =
    get("completedToDoList").querySelectorAll(".toDoItemText");

  if (currentToDoListOfInputs) {
    let currentListValues = Array.from(currentToDoListOfInputs).map(
      (item) => item.value
    );
    localStorage.currentToDoList = JSON.stringify(currentListValues);
  }

  if (completedToDoListOfInputs) {
    let completedListValues = Array.from(completedToDoListOfInputs).map(
      (item) => item.value
    );
    localStorage.completedToDoList = JSON.stringify(completedListValues);
  }
}

function loadToDoItems() {
  if (localStorage.currentToDoList) {
    let currentlistValues = localStorage.currentToDoList;
    currentListValuesText = JSON.parse(currentlistValues);
    currentListValuesText.forEach((item) => {
      addCurrentItem(item);
    });
  } else {
    addCurrentItem("Template");
  }
  if (localStorage.completedToDoList) {
    let completedListValues = localStorage.completedToDoList;
    completedListValuesText = JSON.parse(completedListValues);
    completedListValuesText.forEach((item) => {
      addCompletedItem(item);
    });
  } else {
    addCompletedItem("Template");
  }
}

function showDropdown() {
  let clickedItem = event.target.parentElement;
  clickedItem.querySelector(".dropdownContent").classList.toggle("show");
}

function initialSetup() {
  document.addEventListener("keypress", saveToDoItems);
  document.addEventListener("click", saveToDoItems);

  window.onclick = function (event) {
    if (!event.target.matches(".dropdownButton")) {
      var dropdowns = document.getElementsByClassName("dropdownContent");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  newItemButton.addEventListener("click", () => {
    addCurrentItem(newItemInput.value);
    newItemInput.focus();
  });
  newItemInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (document.activeElement === newItemInput) {
        addCurrentItem(newItemInput.value);
      }
    }
  });
  loadToDoItems();
}

initialSetup();
