import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecipeView from './RecipeView';
import DisplayReviews from './DisplayReviews';
import { Review } from '../../types/types';

function Recipe() {
  //grab the recipesId
  const { recipeId } = useParams();

  const [recipeInfo, setRecipeInfo] = useState(null);
  const [recipeName, setRecipeName] = useState("");
   
  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId)
      .then((response: any) => {
        setRecipeInfo(response.data.meals);
        setRecipeName(response.data.meals[0].strMeal);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  if(recipeInfo === null) {
    return <div></div>
  }

  return (
    <>
      <RecipeView recipeInfo={recipeInfo} />
      <DisplayReviews recipeId={recipeId} recipeName={recipeName} />
    </>
  )
}

export default Recipe