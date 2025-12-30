const addTodoBtn=document.getElementById("addTodoBtn");
let inputTag = document.getElementById("todoInput");
let todos = [];
let todostring=localStorage.getItem("todos");
const todoListUl = document.getElementById("todoList");
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
};

addTodoBtn.addEventListener("click",()=>{

 let todotext=inputTag.value;
 if(todotext=""){
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


