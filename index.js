const $inputSearch = document.querySelector('.input-search');
const $recipesContainer = document.querySelector('.recipes-container');


const getRecipes = async (ingredient) => {
      if(ingredient == "") ingredient = "chicken"
      
      const res = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=d4df8c10&app_key=cdb9c53462418cca4a81d5bea7aea9e4`);
      const recipes = await res.data.hits;

      let html = "";

      recipes.forEach(element => {

            if (element.recipe.dietLabels.length !== 0) {
                  html += `
                        <div class="recipe">
                              <img class="recipe-img" src="${element.recipe.image}" >
                              <h2 class="recipe-title">${element.recipe.label}</h2>
                              <p class="recipe-text">Calories: ${Math.round(element.recipe.calories)}</p>
                              <span class="recipe-dietLabels">${element.recipe.dietLabels.join(", ")}</span>
                              <button class="recipe-button">See preparation</button>
                        </div>
                  `;
            } else {
                  html += `
                        <div class="recipe">
                              <img class="recipe-img" src="${element.recipe.image}" >
                              <h2 class="recipe-title">${element.recipe.label}</h2>
                              <p class="recipe-text">Calories: ${Math.round(element.recipe.calories)}</p>
                              <button class="recipe-button">See preparation</button>
                        </div>
                  `;
            };
      });

      $recipesContainer.innerHTML = html;
};



document.addEventListener("DOMContentLoaded", () => getRecipes($inputSearch.value));

$inputSearch.addEventListener("keydown", e => {
      if (e.key == "Enter") getRecipes($inputSearch.value);
});

