const inputElement = document.querySelector("#add-form");

const todoTasksElement = document.querySelector(".main_list_tasks");

const test = document.getElementsByName("color");



const deleteDo = document.querySelector(".main_delete_all");

const sortDo = document.querySelector(".main_sort");

const todoOptions = document.querySelector(".main_sort_items");

// const todoTasksElement = document.querySelector(".list");

let realTodoTasks = [];

inputElement.addEventListener("submit", (event) => {
  event.preventDefault(event);
  const value = inputElement.addTodoInput.value;
  addGoal(value);
  inputElement.addTodoInput.value = "";
});

function addGoal(value) {
  let characters = /[A-Za-z0-9А-Яа-я]/;
  let changecolor;
  if (characters.test(value)) {
    for (var elem in test) {
      if (test[elem].checked) {
        if (test[elem].value === 'red') changecolor = '#ff8080';
        else if (test[elem].value === 'yellow') changecolor = '#fffc80';
        else if (test[elem].value === 'green') changecolor = '#80ff80';
      }
    }

    realTodoTasks.push(value);
    const pattern = ` 
            <li class="icon-check" style="background-color: ${changecolor};">
            <div class="main_list_tasks_items">
                <p> ${realTodoTasks.length}. ${value}
                </p>
                <img class="delete main_list_tasks_item" src="pictures/delete.svg">
                </div>
            </li>`;
    todoTasksElement.innerHTML += pattern;
  }
}

todoTasksElement.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.parentNode.remove();
  }
  if (
    e.target.parentNode.classList.contains("icon-check") &&
    !e.target.parentNode.classList.contains("cross-out")
  ) {
    e.target.parentNode.classList.add("cross-out");
  } else if (
    e.target.parentNode.classList.contains("cross-out")
  ) {
    e.target.parentNode.classList.remove("cross-out");
  }
});

//--------------------------------------------------------------------------------------------------

function initializeClock(id) {
  let clock = document.getElementById(id);
  let hoursSpan = clock.querySelector('.hours');
  let minutesSpan = clock.querySelector('.minutes');
  let secondsSpan = clock.querySelector('.seconds');
  function updateClock() {
    let dt = new Date
    let tz = dt.getTimezoneOffset()
    let now = Math.floor(dt / 1000 - tz * 60)
    let next = Math.ceil((dt / 1000 / 60 - tz) / 60 / 24) * 60 * 60 * 24
    let left = next - now

    let seconds = ~~(left % 60);
    let minutes = ~~(left / 60 % 60);
    let hours = ~~(left / 60 / 60);

    hoursSpan.innerHTML = hours;
    minutesSpan.innerHTML = minutes;
    secondsSpan.innerHTML = seconds;
  }
  updateClock();
  setInterval(updateClock, 1000);
}
initializeClock('countdown');

//--------------------------------------------------------------------------------------------------

todoOptions.addEventListener("click", e => {
  e.preventDefault();
  const list = Array.from(todoTasksElement.children);

  if (e.target.classList.contains("all-todos")) {
    list.forEach(todo => todo.classList.remove("hide"));
  } else if (e.target.classList.contains("complited-todos")) {
    list.forEach(todo => {
      if (todo.classList.contains("cross-out")) {
        todo.classList.remove("hide");
      } else {
        todo.classList.add("hide");
      }
    });
  } else if (e.target.classList.contains("active-todos")) {
    list.forEach(todo => {
      if (todo.classList.contains("cross-out")) {
        todo.classList.add("hide");
      } else {
        todo.classList.remove("hide");
      }
    });
  }
});


deleteDo.addEventListener("click", e => {
  e.preventDefault();
  const list = Array.from(todoTasksElement.children);
  if (e.target.classList.contains("delete")) {
    list.forEach(todo => {
      todo.remove();
    })
    realTodoTasks=[];
  }
})
