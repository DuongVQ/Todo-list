let btnAddTask = document.querySelector('#add-task');
let taskName = document.querySelector('#content');


// localStorage.setItem('test', 'sv.haui.edu.vn')
// alert(localStorage.getItem('test'))
let tasks = getTaskFromLocalStorage()
renderTasks(tasks)


btnAddTask.addEventListener('click', function() {
    if (!taskName.value) {
        alert('Please, enter your task!')
        return false
    }

    let taskId = this.getAttribute('id')
    let tasks = getTaskFromLocalStorage()
    let taskItem = {name: taskName.value}
    // console.log(tasks)
    // return false

    if(taskId == 0 || taskId) {
        tasks[taskId] = taskItem
        this.removeAttribute('id')
    }
    else {
        tasks.push (taskItem)
    }
    taskName.value = ''
    
    // localStorage.getItem('test')
    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderTasks(tasks)
})

function editTask(id) {
    let tasks = getTaskFromLocalStorage()
    if(tasks.length > 0) {
        taskName.value = tasks[id].name
        btnAddTask.setAttribute('id', id)
    }
}

function deletaTask(id) {
    if(confirm('Do you want to delete it?')) {
        let tasks = getTaskFromLocalStorage()
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorage())
    }
}

function renderTasks(tasks = []) {
    let content = '<ul>'

    tasks.forEach((task, index) => {
        content += `<li>
            <div class="task-name">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Repair</a>
            <a href="#" onclick="deletaTask(${index})"><i class="fa-regular fa-trash-can"></i></a>
        </li>`
    })
    content += '</ul>'
    document.querySelector('#result').innerHTML = content
}

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}