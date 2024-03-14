import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './BrowserRecipeView.css'

function BrowserRecipeView(props: any) {
    //state to hold all the recipes from a category
   const [recipes, setRecipes] = useState<any[]>([]);
   //check if loaded
   const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      //allow the categories to load before the effect
      setLoaded(false)
      //on render and after the categories are populated run the getAllRecipes
      getAllRecipes();
      setLoaded(true);
    }, [props.categories])
    
    //this useEffect will grab the items from TheMealDB and place them in the recipes state
    useEffect(() => {
      setLoaded(false)
      //on render and after the categories are populated run the getAllRecipes
      getAllRecipes();
      setLoaded(true);
    }, [props.selectedItem])

    /**
   * Function calls the MealDB to grab All of the category recipes
   */
  function getAllRecipes() {
    const recipeList: any[] = [];
    const [all, ...restOfCategories] = props.categories;
    let endLoop = restOfCategories.length;

    if(props.selectedItem == all) {
    
      //run a foreach through each of the categories presented by theMealDB
      restOfCategories.forEach(async (category: string) => {
        const response = await axios("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category);
        recipeList.push(...response.data.meals);
        endLoop--;
        if(endLoop === 0) {
            recipeList.sort((a: any, b: any) => a.strMeal.localeCompare(b.strMeal));
            setRecipes(recipeList);
        }
      })
    } else {
        axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + props.selectedItem)
          .then((response: any) => {
            recipeList.push(...response.data.meals);  
            setRecipes(recipeList.sort((a: any, b: any) => a.strMeal.localeCompare(b.strMeal))); 
          })
          .catch((err) => {
            console.log(err);
          })
        }
    }

    function altText(recipe: string) {
      return `Image of ${recipe}`;
    }
      
    return (
    <>
        {
            (
                !loaded ? <h1>Loading...</h1>: 
                recipes.map((recipe, idx) => {
                    return(
                        <div className='col-sm-8 col-md-3 mx-5 gy-5 m-5'>
                          <div className='row bg-danger rounded'>
                            <div className='col-12 d-flex justify-content-end'>
                              <p>{recipe.idMeal}</p>
                            </div>
                            <div className='col-12 d-flex justify-content-center'>
                              <div className='img-container'>
                                <img src={recipe.strMealThumb} alt={altText(recipe.strMeal)} className='img-fluid'></img>
                              </div>
                            </div>
                            <div className='col-10 text-sm text-md text-lg d-flex justify-content-center m-4 text-wrap'>
                              <h3>{recipe.strMeal}</h3>
                            </div>
                            <div className='col-12 text-sm text-md text-lg d-flex justify-content-center mb-4'>
                              <h5>Click Card For More</h5>
                            </div>
                          </div>
                        </div>
                    )
                })
            )
        }
    </>
  )
}

export default BrowserRecipeView