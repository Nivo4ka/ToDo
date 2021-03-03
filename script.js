const inputElement = document.querySelector("#add-form");

const todoTasksElement = document.querySelector(".main_list_tasks");

const test = document.getElementsByName("color");

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
                <p> ${realTodoTasks.length}. ${value}
                </p>
                <img class="delete main_list_tasks_item" src="pictures/delete.svg">
            </li>`;
        todoTasksElement.innerHTML += pattern;
    }
}

todoTasksElement.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        // let num=+e.target.parentNode.slice(84, e.target.parentNode.indexOf("."));
        // console.log(num);
        // realTodoTasks.splice(1, num-1);
        e.target.parentNode.remove();
    }
    if (
        e.target.classList.contains("icon-check") &&
        !e.target.classList.contains("cross-out")
    ) {
        e.target.classList.add("cross-out");
    } else if (
        e.target.classList.contains("cross-out")
    ) {
        e.target.classList.remove("cross-out");
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
























// const inputElement = document.querySelector(".todo_input");
// const todoTasksElement = document.querySelector(".todo_tasks");

// let realTodoTasks = [];
// let currentButton = "link__all";

// inputElement.addEventListener("keydown", function (event) {
//     if (event.code != "Enter" || !inputElement.value.trim()) {
//         return;
//     }

//     createNewTask(inputElement.value);

//     inputElement.value = "";
// })

// function createNewTask(text) {
//     const todoTask = document.createElement("div");
//     todoTask.classList.add("todo_task");

//     todoTask.addEventListener("mouseenter", function () {
//         const crossElement = todoTask.querySelector(".task_cross");

//         crossElement.classList.add("task_cross_hovered");
//     });

//     todoTask.addEventListener("mouseleave", function () {
//         const crossElement = todoTask.querySelector(".task_cross");

//         crossElement.classList.remove("task_cross_hovered");
//     })

//     todoTask.addEventListener("click", function (event) {
//         const target = event.target;

//         if (target.className.includes("task_cross")) {
//             removeTask(target)
//         }

//         if (target.className.includes("task_toggle")) {
//             changeTaskStatus(target);
//         }
//     })

//     todoTask.addEventListener("dblclick", function (event) {
//         if (!event.target.closest(".task__center")) {
//             return;
//         }

//         const currentTodoTask = event.target.closest(".todo_task");
//         const editingInputElement = document.createElement("input");
//         editingInputElement.className = "todo_task_editing";
//         editingInputElement.value = currentTodoTask.querySelector(".task_label").textContent;

//         currentTodoTask.replaceWith(editingInputElement);

//         editingInputElement.focus();

//         editingInputElement.addEventListener("blur", function (event) {
//             if (!editingInputElement.value.trim()) {
//                 return;
//             }

//             currentTodoTask.querySelector(".task_label").textContent = editingInputElement.value;
//             editingInputElement.replaceWith(currentTodoTask);
//         })
//     })

//     todoTask.innerHTML = `
//         <div class="task_left">
//             <span class="task_toggle"></span>
//         </div>
//         <div class="task_center">
//             <label class="task_label">${text}</label>
//         </div>
//         <div class="task_right">
//             <span class="task_cross"></span>
//         </div>
//     `

//     todoTasksElement.append(todoTask);

//     realTodoTasks.push(todoTask);

// }