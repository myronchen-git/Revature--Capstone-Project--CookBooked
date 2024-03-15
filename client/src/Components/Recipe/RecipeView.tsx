import axios from 'axios'
import React, { useEffect, useState } from 'react'

function RecipeView(props: any) { 
  const [ingredList, setIngredList] = useState<any[]>([]);

  function imgAlt(str: string) {
    return `Image of ${str}`;
  }

  useEffect(() => {
    let idx = 0;
    let counter = 1;
    let ingredientsList: any[] = [];
    Object.keys(props.recipeInfo[0]).map(key => {
      //get all ingredients along with their measurement
      if(key === `strIngredient${counter}` && props.recipeInfo[0][key] !== "") {
        let item = {ingredient: props.recipeInfo[0][key]};
        ingredientsList.push(item);
        counter++;
      } else if(key === `strMeasure${counter}` && props.recipeInfo[0][key].trim() !== "") {
        ingredientsList[idx].measure = props.recipeInfo[0][key];
        console.log(ingredientsList);
        idx++;
        counter++;
      } else {
        counter = 1;
      } 
    }, [])
    setIngredList(ingredientsList);
  }, [])

  return (
    <div className='container-fluid bg-light px-5'>
        <div className='row py-5'>
            <div className='col'>
                <h1 className='text-decoration-underline'>{props.recipeInfo[0].strMeal}</h1>
            </div>
        </div>
        <div className='row mt-1 pb-5'>
            <div className='col-12 py-3 d-flex justify-content-center'>
              <div>
                <img src={props.recipeInfo[0].strMealThumb} alt={imgAlt(props.recipeInfo[0].strMeal)} className='img-fluid rounded' style={{height: '400px'}}></img>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-10 mt-5 d-flex justify-content-center'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-12'>
                      <h4 className='text-decoration-underline'>Ingredients</h4>
                    </div>
                  </div>
                  <div className='row p-3'>
                    {
                      ingredList.map((ingredient: any) => {
                        console.log(true);
                        if(ingredient.measure === undefined) {
                          return (
                            <div className='col-12 d-flex justify-content-center p-2'>
                              <h6>- {ingredient.ingredient}</h6>
                            </div>
                          )
                        }
                        return (
                          <div className='col-12 d-flex justify-content-center p-2'>
                            <h6>- {ingredient.measure} {ingredient.ingredient}</h6>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-10 mt-5 d-flex justify-content-center'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-12'>
                      <h4 className='text-decoration-underline'>Instructions</h4>
                    </div>
                  </div>
                  <div className='row p-3'>
                      {
                        props.recipeInfo[0].strInstructions.split('.').map((sentence: string) => {
                          if(sentence !== "") {
                            return(
                              <div className='col-12 d-flex justify-content-start p-2'>
                                <h6>- {sentence}.</h6>
                              </div>
                            )
                          }
                        })
                      }
                  </div>
                </div>
            </div>
            <div className='col-lg-4 col-md-12 mt-5 d-flex justify-content-center'>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-12'>
                      <h4 className='text-decoration-underline'>Other Sources</h4>
                    </div>
                  </div>
                  <div className='row p-3'>
                    <div className='col-12 d-flex justify-content-center p-2'>
                      {
                        props.recipeInfo[0].strYoutube ? (
                          <h6><a href={props.recipeInfo[0].strYoutube}>Youtube</a></h6>
                        ) : (
                          <h6>Youtube Unavailable</h6>
                        )
                      }
                    </div>
                    <div className='col-12 d-flex justify-content-center p-2'>
                      {
                        props.recipeInfo[0].strSource ? (
                          <h6><a href={props.recipeInfo[0].strSource}>Source</a></h6>
                        ) : (
                          <h6>Source Unavailable</h6>
                        )
                      }
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div className='row py-5'>
            <div className='col'>
                <h3 className='text-decoration-underline'>Reviews</h3>
            </div>
        </div>
    </div>
  )
}

export default RecipeView