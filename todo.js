
const todo = document.getElementById("todoList");
const todoForm = document.querySelector('form');

todoForm.addEventListener('submit', event => {
    event.preventDefault();

    const taskInput = event.target['task'];
    const detailTask = document.createElement('div');
    detailTask.setAttribute("class", "detailTask");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", 'checkbox');
    checkbox.setAttribute("class", "checkbox")

    const taskName = document.createElement("span");
    taskName.innerText = taskInput.value;
    taskName.setAttribute("class", "taskName")

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.innerText = "삭제";

    detailTask.appendChild(checkbox);
    detailTask.appendChild(taskName);
    detailTask.appendChild(deleteButton);
    todo.appendChild(detailTask );

    document.getElementById("task").value = null;
    // document.getElementById("task").focus = null;
    
    checkbox.addEventListener('change', event =>{
        if(checkbox.checked){
            taskName.style.textDecorationLine = "line-through"
        }else{
            taskName.style.textDecorationLine = "none"
        }
    });
    
    deleteButton.addEventListener('click', event =>{
        event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode);
    });
});

