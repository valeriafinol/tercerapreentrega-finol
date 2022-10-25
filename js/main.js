// SIMULADOR DE RECETARIO
// Este recetario permite obtener recetas a partir de los ingredientes (mostrados por el simulador) que elija el usuario

// LOGIN
/* Para ingresar al simulador, se deben ingresar los datos guardados en las 
variables: usuarioGuardado (valeriafinol) y contraseniaGuardada (1234) */

// Variables
let usuarioGuardado = "valeriafinol";
let contraseniaGuardada = "1234";
let p = document.querySelector("p");
let checkbox = document.getElementById("checkbox");

// Función para hacer login en el simulador
function login() {
  const email = document.getElementById("username").value.toLowerCase();
  const password = document.getElementById("password").value.toLowerCase();

  if (email == "" || password == "") {
    p.innerText = "Fields should not be empty";
    return;
  /* Mediante esta condición: Si checkbox está checked, los datos se guardan en el localStorage 
Si checkbox no está checked, los datos se guardan en sessionStorage */
  } else if (email === usuarioGuardado || password === contraseniaGuardada) {
    if (checkbox.checked) {
      localStorage.setItem("login", true);
    } else {
      sessionStorage.setItem("login", true);
    }
    window.location.href = "./pages/ingredients.html";
  } else {
    p.innerText = "Incorrect username or password";
  }
}