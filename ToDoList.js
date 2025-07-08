
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
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach((texto) => {
    input.value = texto;
    Addtodo();
  });
}

let input = document.getElementById("input");
let btn = document.getElementById("btn_todo");
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

function guardar() {
  let tareas = [];
  let todasLasTareas = document.querySelectorAll(".actividad");

  todasLasTareas.forEach((tarea) => {
    tareas.push(tarea.innerText);
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

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


