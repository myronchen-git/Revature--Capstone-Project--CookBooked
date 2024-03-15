import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecipeView from './RecipeView';

function Recipe() {
  //grab the recipesId
  const { recipeId } = useParams();

  const [recipeInfo, setRecipeInfo] = useState(null);
    
  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId)
      .then((response: any) => {
        setRecipeInfo(response.data.meals)
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
    </>
  )
}

export default Recipe