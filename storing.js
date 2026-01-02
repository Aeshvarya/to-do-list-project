const addTodoBtn=document.getElementById("addTodoBtn");
let inputTag = document.getElementById("todoInput");
let todos = [];
let todostring=localStorage.getItem("todos");
const todoListUl = document.getElementById("todoList");



const itemleft = document.getElementById("itemsLeft");
function updateLeft() {
    const count = todos.filter(todo => !todo.isCompleted).length;

    itemleft.textContent =
        count === 1 ? "1 item left" : `${count} items left`;
}


if(todostring){
    todos=JSON.parse(todostring);
}
const addtodos= ()=>{
let string="";
for(const todo of todos){
  string += `<li id="todo-${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
            <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""} >
            <span class="todo-text">${todo.title}</span>
            <button class="delete-btn">×</button>
        </li>`
}
   todoListUl.innerHTML = string;
    updateLeft();
};

addTodoBtn.addEventListener("click",()=>{

 let todotext=inputTag.value;
 if(todotext==""){
    return ;
 }
let  todo={
    id: todos.length,
    title: todotext,
    isCompleted: false
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
inputTag.value="";
    addtodos();
})

addtodos();

const todocheckbox = document.querySelectorAll(".todo-checkbox")
todoListUl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("todo-checkbox")) {
        return;
    }
    const li = e.target.parentNode;
    const id = li.id; 

    if (e.target.checked) {
        li.classList.add("completed");

        todos = todos.map(todo =>
            "todo-" + todo.id === id
                ? { ...todo, isCompleted: true }
                : todo
        );
    } else {
        li.classList.remove("completed");

        todos = todos.map(todo =>
            "todo-" + todo.id === id
                ? { ...todo, isCompleted: false }
                : todo
        );
    }

    localStorage.setItem("todos", JSON.stringify(todos));
});

todoListUl.addEventListener("click", (e) => {

    if (!e.target.classList.contains("delete-btn")) {
        return;
    }
    const li = e.target.parentNode;   
    const id = li.id;                 
    todos = todos.filter(todo => "todo-" + todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));  
    li.remove();
     updateLeft();
});
