import React from 'react'

function RecipeView(props: any) {
    console.log("Child Props: " + JSON.stringify(props.recipe));
    return (
    <>
    {/* {
        props.recipe.forEach((recipe: any) => {
            console.log(recipe.strMeal)
        })
    } */}
    {
        props.recipe.map((rec: any, idx: any) => {
            return(
                <h1 key={idx}>{rec.strMeal}</h1>
            )
        })
    }
    </>
  )
}

export default RecipeView