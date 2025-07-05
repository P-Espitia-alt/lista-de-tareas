
var user
var cont

window.onload = function () {
  let btn = document.getElementById('Iniciar_Sesion');

  btn.addEventListener("click", function () {

    user = document.getElementById('usuario').value;
    cont = document.getElementById('Contrasena').value;
    console.log("Usuario: ", user + "     " + "Password: ", cont);

    if (user == "mariapaula" && cont == "123qwe*") {
      document.getElementById('Login').style.display = "none";
      document.getElementById('ToDoList').style.display = "block";

    } else {

      if (user !== "mariapaula") {
        alert("Usuario incorrecto");
        document.getElementById('usuario').focus();
      }

      if (cont !== "123qwe*") {
        alert("Contrase\u00f1a incorrecta");
        document.getElementById('Contrasena').focus();
      }
    }

  });
  cargar_tareas();
};

function cargar_tareas() {
  // TODO: Si ya hice login, se debe validar mi sesión activa
  // TODO: La sesión activa debe durar 10 minutos

  console.log("Cargando tareas desde localStorage");
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  
  console.log(tareas);
  tareas.forEach((tarea => {

    input.value = tarea; // Asignar el valor de la tarea al input

    // input.value = todoObj.texto;
    // todoObj.terminado
    Addtodo();
  }));
}


// var texto = 'tarea 1';
// var terminado = true; //false
// var id = 123123; // usar Guid o usar random o usar timestamp de la fecha en que se crea (fecha actual) 
// [
// {
// 	"texto" : 'Tarea 1',
// 	"terminado" : true,
// 	"id": 8798543
// },{
// 	"texto" : 'Tarea 2',
// 	"terminado" : false,
// 	"id": 8798545
// },{
// 	"texto" : 'Tarea 3',
// 	"terminado" : true,
// 	"id": 8798555
// },{
// 	"texto" : 'Tarea 4',
// 	"terminado" : true,
// 	"id": 8798666
// }
// ]


let input = document.getElementById("input"); // TODO: Cambiar el id del input a "input_tarea" para mayor claridad
let btn = document.getElementById("btn_todo"); // todo: Cambiar el id del botón a "btn_agregar_tarea" para mayor claridad
let cont_todo = document.querySelector(".container_todo");
let id = 1;

btn.addEventListener("click", () => {
  if (input.value === "") {
    alert("No se a especificado ninguna nueva tarea")
    document.getElementById('input').focus();
  } else {
    Addtodo()
  }


})

function Addtodo() {
  let div_todo = document.createElement("div");
  let div_container = document.createElement("div");
  let checkbox = document.createElement("input");
  let parrafo = document.createElement("p")
  let div_boton = document.createElement("div");
  let butt = document.createElement("button");
  let icono = document.createElement("i")

  parrafo.innerHTML = input.value;
  parrafo.classList.add("actividad");
  div_todo.classList.add("container_list")
  div_container.classList.add("container_list_1");
  checkbox.classList.add("casilla");
  checkbox.setAttribute("type", "checkbox");
  div_boton.classList.add("container_list_btn");
  butt.classList.add("btn-eliminar");

  butt.setAttribute("id", id++);

  icono.classList.add("fa-solid", "fa-minus");

  div_todo.appendChild(div_container);
  div_todo.appendChild(div_boton);
  div_container.appendChild(checkbox);
  div_container.appendChild(parrafo);
  butt.appendChild(icono);
  div_boton.appendChild(butt);

  cont_todo.appendChild(div_todo);

  butt.addEventListener("click", () => {
    parrafo.classList.toggle("tachado");
  });


  input.value = "";

  guardar();
}

function guardar() {
  let tareas = [];
  let todasLasTareas = document.querySelectorAll(".actividad");

  console.log(todasLasTareas);


  todasLasTareas.forEach((tarea) => {
    tareas.push(tarea.innerText);
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

