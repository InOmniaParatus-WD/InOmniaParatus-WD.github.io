const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const randomBtn = document.querySelector("#random");

const meals = document.querySelector("#meals");
const resultHeading = document.querySelector("#result-heading");
const singleMeal = document.querySelector("#single-meal-container");

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal - DO WE REALLY NEED THIS??
  singleMeal.innerHTML = "";

  // Get search term
  const term = search.value;
  //Check for empty
  if (term) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>No results. Please try again</h2>`;
        } else {
          meals.innerHTML = data.meals
            .map(
              (meal) => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `
            )
            .join("");
        }
      });
    // Clear search text
    search.value = "";
  } else {
    alert("Please enter a meal");
  }
}

// Get the meal by ID
function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Get a random meal
function getRandomMeal() {
  // Clear meals and heading
  meals.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  // WOULD AN OBJECT BE BETTER???  Faster an easier to loop through later??
  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
  <div class="single-meal">
    <button class="close-recipe" id="close-recipe"> <i class="fa-solid fa-xmark"></i> </button>
    <header>
      <h2 class="meal-name">${meal.strMeal}</h2>
      <span>~ ${meal.strArea} Recipe ~</span>
    </header> 

    <section class="chosen-meal-img">
      <div class="image">         
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      </div>
      <div class="list-of-ingredients">
        <ul>
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="preparation">
      <div class="main">
        <h2 class="method">Preparation Method</h2>
        <p>${meal.strInstructions}</p>
      <div>
    </section>
  </div>
  `;

  document.querySelector("#close-recipe").addEventListener("click", () => {
    singleMeal.innerHTML = "";
    singleMeal.classList.remove("show");
  });
}
// Event listeners
submit.addEventListener("submit", searchMeal);
randomBtn.addEventListener("click", () => {
  getRandomMeal();
  singleMeal.classList.add("show");
});

meals.addEventListener("click", (e) => {
  const mealID = e.target.closest(".meal-info").dataset.mealid;
  getMealById(mealID);
  singleMeal.classList.add("show");
});

