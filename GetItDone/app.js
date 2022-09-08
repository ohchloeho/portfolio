//process inputs
const taskInput = document.querySelector("#inputs > input[type='text']");
const dateInput = document.querySelector("#inputs > input[type='date']");
const inputBtn = document.querySelector("#inputs > button");
const output = document.querySelector(".output");

//create new task items
const newTask = (taskNameInput, taskDateInput) => {
  const newTask = document.createElement("div");
  const taskName = document.createElement("p");
  taskName.textContent = taskNameInput;
  const taskDate = document.createElement("span");
  taskDate.textContent = " " + taskDateInput + " ";
  const taskDelete = document.createElement("span");
  taskDelete.textContent = " X ";
  taskDelete.style.color = "red";
  taskDelete.style.cursor = "pointer";

  taskName.append(taskDate);
  taskName.append(taskDelete);
  newTask.append(taskName);

  //strikethrough / delete functions
  taskDelete.addEventListener("click", () => {
    if (taskName.classList.contains("strikethrough")) {
      taskName.classList.remove("strikethrough");
    } else {
      taskName.classList.add("strikethrough");
    }
  });
  taskDelete.addEventListener("dblclick", () => {
    taskName.remove();
  });

  output.append(newTask);
};

//inputBtn functions
inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskInput.value && dateInput.value) {
    newTask(taskInput.value, dateInput.value);
    //clear fields
    taskInput.value = "";
    dateInput.value = "";
  } else {
    alert("please enter values, thank you");
  }
});
