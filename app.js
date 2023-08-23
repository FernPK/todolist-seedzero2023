const toDoList = [];
const checked = [];
function handleAddTodo(event) {
  event.preventDefault();
  const input = document.querySelector("#todo-input");
  const todo = input.value.trim();
  if (todo === "") {
    // alert("할 일을 입력해주세요");
    alert("Please enter a to-do");
    return;
  }
  toDoList.push(todo);
  input.value = "";
  renderToDoList();
}

function handleDelete(event) {
  // const todo = event.target.previousElementSibling.innerText;
  // const idx = toDoList.indexOf(todo);
  // toDoList.splice(idx, 1);
  const idx = event.target.id; 
  toDoList.forEach((todo, i) => {
    if (todo + i + 'bt'=== idx) {
      toDoList.splice(i, 1);
    }
  });
  renderToDoList();
}

function handleChecked(event) {
  const idx = event.target.id;
  // const label = document.querySelector(`label[for=${idx}]`);
  const label = document.getElementById(idx+'lb');
  if (event.target.checked) {
    label.classList.add("label-checked");
    checked.push(event.target.name);
  }
  else {
    label.classList.remove("label-checked");
    checked.splice(checked.indexOf(event.target.name), 1);
  }
}

function renderChecked() {
  if (checked.length > 0) {
    toDoList.forEach((todo, idx) => {
      checked.forEach((check) => {
        if (todo === check) {
          const label = document.getElementById(todo+idx+'lb');
          label.classList.add("label-checked");
          const checkbox = document.getElementById(todo+idx);
          checkbox.checked = true;
        }
      });
    });
  }
}

function renderToDoList() {
  const renderList = document.querySelector("#todo-list");
    renderList.innerHTML = "";
    toDoList.forEach((todo,idx) => {
      renderList.innerHTML += 
      `<li class="todo-list-item">
        <input type="checkbox" name=${todo} id=${todo+idx} onchange="handleChecked(event)">
        <label for=${todo+idx} id=${todo+idx+'lb'}>${todo}</label>
        <button onclick="handleDelete(event)" id=${todo+idx+'bt'}>Delete</button>
      </li>`;
    });
  renderChecked();
}