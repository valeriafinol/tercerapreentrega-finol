// Declaración de variables y constantes  
let list = []; // Este es un array vacío en el cual se van agregando los ingredientes que el usuario va seleccionando (mediante el método push)
let recipeList = null;
const cart = document.getElementById("cart");
const ingredient = document.createElement("ul");
ingredient.className = "selectedItem";

/* Función para comprobar si se ingresó correctamente mediante la página de login
Si no se ingresó correctamente, devuelve a la página de login, esto 
es en el caso de que se quiera acceder directamente a la página de RECIPEFINDER sin haberse loggeado */
window.onload = function () {
  let localStorageGet = localStorage.getItem("login");
  let sessionStorageGet = sessionStorage.getItem("login");

  if (!localStorageGet || !sessionStorageGet) {
    window.location.href = "../index.html";
  }else{
    fetch('../js/data/ingredients_list.json') // Mediante fetch se obtienen los datos de los ingredientes desde el archivo ingredients_list.json
      .then(response => response.json())
      .then(data => listIngredients(data))
      .catch(error => console.log(error));
    fetch('../js/data/recipes.json') // Mediante fetch se obtienen los datos de las recetas desde el archivo recipes.json
      .then(response => response.json()) 
      .then(data => recipeList = data)
      .catch(error => console.log(error));
  }
};

/* Función para agregar o eliminar cada item (ingrediente) seleccionado por el usuario mediante los checkbox, al lado derecho de la pantalla, 
que simula una especie de carrito. Para ir agregando cada ingrediente se utilizó el método push
Mediante esta función también se muestra el botón "Search Recipes" una vez que se seleccionan ingredientes, y
desaparece una vez que se hace uncheck en los ingredientes */
function toggleItem (item) {
  const button = document.getElementById("searchButton");
  if(list.includes(item)){
    const index = list.indexOf(item);
    if (index !== -1) {
      list.splice(index, 1);
      document.getElementById(item).remove();
      list.length < 1 ? button.classList.remove('is-visible') : button.classList.add('is-visible');
    }
  }else{
    list.push(item);
    list.length < 1 ? button.classList.remove('is-visible') : button.classList.add('is-visible');
    ingredient.innerHTML = ingredient.innerHTML + `<li id="${item}">${item}</li>`
    cart.appendChild(ingredient);
  }
}

// Función para agregar la card de cada ingrediente en HTML, utilizando forEach y modificando el DOM
function listIngredients (ingredients) {
  const ingredientContainer = document.getElementById("ingredientContainer");
  ingredients.meals.forEach(ingredient => {
  const ingredientCard = document.createElement("div");
  ingredientCard.className = "card";
  ingredientCard.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">
        <div class="form-check" ">
          <input class="form-check-input" type="checkbox" id="${ingredient.idIngredient}" onchange="toggleItem('${ingredient.strIngredient}')">
          <label class="form-check-label" for="${ingredient.idIngredient}">
            ${ingredient.strIngredient}
          </label>
        </div>
      </h5>
    </div>
  `
  ingredientContainer.appendChild(ingredientCard);
  })
}

// Función para hacer la búsqueda de las recetas con los ingredientes seleccionados mediante for in, forEach y modificando el DOM
function search () {
  if (list.length < 1) return;
  const modalBody = document.getElementById("modal-body");
  const myModal = new bootstrap.Modal(document.getElementById('exampleModal'))      
  let recipesFound = 0;
  for (const recipeIndex in recipeList) {
    let count = 0;
    recipeList[recipeIndex]['ingredients'].forEach(recipeIng => {
      list.forEach(listIng => {
        if(recipeIng.toLowerCase().includes(listIng.toLowerCase())) {
          count++
        }
      })
    })
    if(count > 0 && count == list.length){
      modalBody.innerHTML = ""
      recipesFound++;
      const recipeContainer = document.createElement("div");
      let ingredients = recipeList[recipeIndex].ingredients.map(ing => {return `<p class="ingredient">${ing}</p>`}).join('')
      recipeContainer.innerHTML = `
        <h2>${recipeList[recipeIndex].name}</h2>
        <h3>Ingredients</h3>
          ${ingredients}
        <h3>Instructions</h3>
          <p>${(recipeList[recipeIndex].instructions)}<p>
        <hr>
      `
      modalBody.appendChild(recipeContainer);
    }
  }
  if(recipesFound > 0) { 
    myModal.show()
  }else{
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'))   
    errorModal.show()
  }
}