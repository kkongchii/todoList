
const todo = document.getElementById("todoList");
const todoForm = document.querySelector('form');
const todoInput = document.querySelector("#taskInput");
// localStorage.clear();


function addTask(event){
    event.preventDefault();
    if(todoInput.value == ''){  
        alert("할 일을 입력해주세요!");
        return;
    }
    let taskNum = 0;
    while(true){
        if (localStorage.getItem(`task${taskNum}`) == null)
            break;
        taskNum++;
    }
    const taskObject = {};
    taskObject["text"] = todoInput.value;
    taskObject["checked"] = false;
    taskObject["id"] = `task${taskNum}`;
    localStorage.setItem(`task${taskNum}`, JSON.stringify(taskObject));
    printTask(taskObject);
    todoInput.value = null;
}

function changeCheck(event){

    id = event.target.parentNode.id;
    console.log(event.target.parentNode.id);
    data = JSON.parse(localStorage.getItem(id));
    console.log(data);
    data.checked = event.target.checked;
    localStorage.setItem(id, JSON.stringify(data));

    if(event.target.checked){
        event.target.nextSibling.style.textDecorationLine = "line-through";
    }else{
        event.target.nextSibling.style.textDecorationLine = "none";
    }

}

function deleteTask(event){
    console.log(event);
    localStorage.removeItem(event.target.parentNode.id);
    event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode);
}

function printTask(task) {
    const detailTask = document.createElement("div");
    detailTask.setAttribute("class", "detailTask"); 

    const taskName = document.createElement("span");
    taskName.innerText = task.text;
    taskName.setAttribute("class", "taskName");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("type", "checkbox");
    if(task.checked == true){
        checkbox.checked = true;
        taskName.style.textDecorationLine = "line-through";
    }
    else{
        checkbox.checked = false;
        taskName.style.textDecorationLine = "none";
    }
    checkbox.addEventListener("click", changeCheck);


    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.setAttribute("type", "button");
    deleteButton.innerText = "삭제";
    deleteButton.addEventListener("click", deleteTask);

    detailTask.appendChild(checkbox);
    detailTask.appendChild(taskName);
    detailTask.appendChild(deleteButton);
    detailTask.setAttribute("id", task.id);

    todo.appendChild(detailTask);
}

function printWindow(){
    for(let i=0; i<localStorage.length; i++){
        // key 찾기
        const key = localStorage.key(i);
            
        // value 찾기
        const value = JSON.parse(localStorage.getItem(key));

        printTask(value);
    }
}

function init() {
    printWindow();
    todoForm.addEventListener("submit", addTask);
}

init();
