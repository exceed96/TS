const form = document.querySelector("#todoform")! as HTMLFormElement;
const input = document.querySelector("#todoinput")! as HTMLInputElement;
const ul = document.querySelector("#ul")! as HTMLUListElement;

interface Todo{
    list : string;
    completed: boolean;
}

const todos : Todo[] = createTodos();
todos.forEach(showTodos);

function saveTodos (){
    localStorage.setItem("todos", JSON.stringify(todos));
}
function showTodos (todo : Todo) {
    const li = document.createElement("li");
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = todo.completed;
    newCheckbox.addEventListener("change", ()=> {
        // if(newCheckbox.checked){
        //     todo.completed = false;
        // }
        todo.completed = newCheckbox.checked;
        saveTodos();
    })
    li.append(todo.list);
    li.append(newCheckbox);
    ul.append(li);
}

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const todoObj : Todo = {
        list : input.value,
        completed: false,
    };
    showTodos(todoObj);
    todos.push(todoObj);
    saveTodos();
    input.value = "";
})

function createTodos () : Todo[] {
    const getTodos = localStorage.getItem("todos");
    if (getTodos === null){
        return [];
    }else{
        return JSON.parse(getTodos);
    }
}