import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DropDown from '../Util/DropDown'
import RecipeView from './BrowserRecipeView';

function BrowseRecipes() {
  //state to hold the dropdown menu selected Item
  const [selectedItem, setSelectedItem] = useState("All");
  //state to hold all the categories gathered from TheMealDB
  const [categories, setCategories] = useState<string[]>([]);

  //method to set the state of a selected item from the dropdown
  function selectItemFromDropdown(selected: string) {
    setSelectedItem(selected);
  }

  //useEffect to recieve all categories in the DB array
  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((response) => {
          const respCategories = response.data.categories;
          const categoryList = ["All"];
          respCategories.forEach((category: any) => {
            categoryList.push(category.strCategory);
          })

          setCategories(categoryList.sort());
          
        })
        .catch((err) => {
          console.log(err);
        });
    
  }, [])


  return (
    <>
      <div className='container-fluid mt-4'>
        <div className='row justify-content-center my-3 pb-4 border-bottom'>
          <div className='col-md-10 col-sm-12'>
            <h1 className='m-3'>Browse Recipes</h1>
          </div>
        </div>
        <div className='row justify-content-end mt-4'>
          <div className='col-md-8 ml-auto'>
            <div className='d-flex justify-content-end align-items-center me-5'>
              <h4 className='me-3'>Filter: </h4>
              <DropDown selectedItem={selectedItem} selectItemHandler={selectItemFromDropdown} categories={categories} />
            </div>
          </div>
        </div>
        <div className='row justify-content-center my-5'>
          <div className='col-2 d-flex justify-content-center'>
            <h2 className='text-decoration-underline'>{selectedItem} Recipes</h2>
          </div>
        </div>
        <div className='row d-flex justify-content-center align-items-stretch px-3'>
            <RecipeView selectedItem={selectedItem} categories={categories} />
        </div>
      </div>
    </>
  )
}

export default BrowseRecipes