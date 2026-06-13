let tasks = document.querySelector(".tasks")
let display = document.querySelector("input")
let add = document.querySelector(".Add")

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || []

function setDirection(element, text){
    let rtlChars = /[\u0600-\u06FF]/
    if(rtlChars.test(text)){
        element.style.direction = "rtl"
        element.style.textAlign = "right"
    } else {
        element.style.direction = "ltr"
        element.style.textAlign = "left"
    }
}

function addDeleteHandler(deleteBtn, task, taskText){
    deleteBtn.addEventListener("click", function(){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#66BB6A",
            cancelButtonColor: "#E57373",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if(result.isConfirmed){
                task.remove()
                let index = tasksArray.indexOf(taskText)
                tasksArray.splice(index, 1)
                localStorage.setItem("tasks", JSON.stringify(tasksArray))

                Swal.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success"
                })
            }
        })
    })
}

tasksArray.forEach(function(taskText){
    let task = document.createElement("li")
    let deleteBtn = document.createElement("button")

    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete")

    task.textContent = taskText
    setDirection(task, taskText)
    task.appendChild(deleteBtn)
    tasks.appendChild(task)

    addDeleteHandler(deleteBtn, task, taskText)
})

add.addEventListener("click" , function(){
    let task = document.createElement("li")
    let deleteBtn = document.createElement("button")
    let taskText = display.value

    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete")

    tasks.appendChild(task)
    task.textContent = taskText
    setDirection(task, taskText)
    tasksArray.push(taskText)
    task.appendChild(deleteBtn)
    localStorage.setItem("tasks", JSON.stringify(tasksArray))
    display.value = ""

    addDeleteHandler(deleteBtn, task, taskText)
})
