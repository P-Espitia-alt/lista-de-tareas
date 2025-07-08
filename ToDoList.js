
var user;
var cont;
let dateExp;


window.onload = function () {

  if (sessionStorage.getItem('isLoggedIn') === 'true') {
    dateExp = sessionStorage.getItem('dateExp');

    if (dateExp && Date.now() < parseInt(dateExp, 10)) {
      document.getElementById('Login').style.display = "none";
      document.getElementById('ToDoList').style.display = "block";
      checkExpTime();
    } else {
      logOut();
    }
  }

  let btn = document.getElementById('Iniciar_Sesion');

  btn.addEventListener("click", function () {

    user = document.getElementById('usuario').value;
    cont = document.getElementById('password').value;
    console.log("Usuario: ", user + "     " + "Password: ", cont);

    if (user == "mariapaula" && cont == "123qwe*") {
      document.getElementById('Login').style.display = "none";
      document.getElementById('ToDoList').style.display = "block";
      m_long_session();

    } else {

      if (user !== "mariapaula") {
        alert("Usuario incorrecto");
        document.getElementById('usuario').focus();
      }

      if (cont !== "123qwe*") {
        alert("Contraseña incorrecta");
        document.getElementById('password').focus();
      }
    }

  });

  cargar_tareas();
};

function m_long_session() {
  let expiTime = Date.now() + 600000;
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('dateExp', expiTime);

  checkExpTime();
}

function checkExpTime() {
  let dateExp = parseInt(sessionStorage.getItem('dateExp'), 10);
  let now = Date.now();

  if (now >= dateExp) {
    logOut();
  } else {
    setTimeout(() => {
      logOut();
    }, dateExp - now);
  }
}

function logOut() {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('dateExp');
  alert("Sesion Caducada");
  location.reload();
}

function cargar_tareas() {

  console.log("Cargando tareas desde localStorage");
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.forEach((tarea => {
    
    Addtodo(tarea);
  }));
}


let input = document.getElementById("input_Nueva_Tarea");
let btn = document.getElementById("btn_agregar_tarea");
let cont_todo = document.querySelector(".container_todo");
let id = 1;

btn.addEventListener("click", () => {
  if (input.value === "") {
    alert("No se ha especificado ninguna nueva tarea");
    input.focus();
  } else {
    actualizar();
  }
});

function Addtodo(tarea) {
  let div_todo = document.createElement("div");
  let div_container = document.createElement("div");
  let checkbox = document.createElement("input");
  let parrafo = document.createElement("p")
  let div_boton = document.createElement("div");
  let butt = document.createElement("button");
  let icono = document.createElement("i")

  parrafo.innerHTML = tarea.texto;
  parrafo.classList.add("actividad");
  if (tarea.tachado) {
    parrafo.classList.add("tachado");
  }
  div_todo.classList.add("container_list")
  div_container.classList.add("container_list_1");
  checkbox.classList.add("casilla");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = tarea.terminado;
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
    guardar();
  });

  checkbox.addEventListener("change", () => {
    guardar(); 
  });

  console.log("Tarea agregada:", {
  texto: tarea.texto,
  terminado: tarea.terminado,
  tachado: tarea.tachado,
  id: tarea.id
  });

  
}

function guardar() {
  let tareas = [];
  let todasLasTareas = document.querySelectorAll(".container_list");

  todasLasTareas.forEach((tareaDOM) => {
    const texto = tareaDOM.querySelector(".actividad").innerText;
    const terminado = tareaDOM.querySelector("input[type='checkbox']").checked;
    const tachado = tareaDOM.querySelector(".actividad").classList.contains("tachado");

    tareas.push({
      texto: texto,
      terminado: terminado,
      tachado: tachado,
      id: Date.now()
    });
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function actualizar() {
  const nuevo = {
    texto: input_Nueva_Tarea.value,
    terminado: false,
    tachado: false,
    id: Date.now()
  };
  Addtodo(nuevo);

    input_Nueva_Tarea.value = "";

    guardar()
}

