const taskInput = document.querySelector(".inputlist input"),
      filters = document.querySelectorAll(".filters span"),
      clearAll = document.querySelector(".clear"),
      taskBox = document.querySelector(".taskbox");

let editList,
    isEdit = false;
    todo = JSON.parse(localStorage.getItem("todolist"));

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showToDo(btn.id);
  });
});

function showToDo(filter){
  let liTag = "";
  if(todo){
  todo.forEach((todo, id) => {
    let completed = todo.status == "completed" ? "checked" : "";
    if(filter == todo.status || filter == "alltask"){
      liTag += 
      `<li class="task">
        <label for="$(id)">
          <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}> 
          <p class="${completed}">${todo.name}</p>
        </label>
        <div class="settings">
        <i onclick="tampil(this)" class="bi bi-list"></i></i>
          <ul class="task-menu">
            <li onclick='editTask(${id}, "${todo.name}")'>Edit</li>
            <li onclick='deleteList(${id}, "${filter}")'>Delete</li>
          </ul>
        </div>
      </li>`;
    }
  });
}
    taskBox.innerHTML = liTag || `<span>Don't have any task</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showToDo("alltask");

function tampil(selectedTask){
  let list = selectedTask.parentElement.lastElementChild;
  list.classList.add("show");
  document.addEventListener("click", e => {
    if(e.target.tagName != "I" || e.target != selectedTask){
      list.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask){
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked){
    taskName.classList.add("checked");
    todo[selectedTask.id].status = "completed";
  }else{
    taskName.classList.remove("checked");
    todo[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todolist", JSON.stringify(todo))
}

function editTask(taskId, textName){
  editList = taskId;
  isEdit = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
}

function deleteList(deleteId, filter){
  isEdit = false;
  todo.splice(deleteId, 1);
  localStorage.setItem("todolist", JSON.stringify(todo));
  showToDo(filter);
}

clearAll.addEventListener("click", () => {
  isEdit = false;
  todo.splice(0, todo.length);
  localStorage.setItem("todolist", JSON.stringify(todo));
  showToDo()
});

taskInput.addEventListener("keyup", e => {
  let userTask = taskInput.value.trim();
  if(e.key == "Enter" && userTask) {
      if(!isEdit) {
          todo = !todo ? [] : todo;
          let taskInfo = {name: userTask, status: "pending"};
          todo.push(taskInfo);
      }else{
          isEdit = false;
          todo[editList].name = userTask;
      }
      taskInput.value = "";
      localStorage.setItem("todolist", JSON.stringify(todo));
      showToDo(document.querySelector("span.active").id);
  }
});