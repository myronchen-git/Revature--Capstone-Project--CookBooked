import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DropDown from '../Util/DropDown'
import RecipeView from './BrowserRecipeView';
import './BrowserRecipeView.css'

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
      <div className='container-fluid'>
        <div className='row justify-content-end pt-4 background-card-color px-3'>
          <div className='col-md-8 ml-auto'>
            <div className='d-flex justify-content-end align-items-center me-lg-5 me-sm-3'>
              <h4 className='me-3 text-danger'>Filter: </h4>
              <DropDown selectedItem={selectedItem} selectItemHandler={selectItemFromDropdown} categories={categories} />
            </div>
          </div>
        </div>
        <div className='row justify-content-center p-4 background-card-color px-3'>
          <div className='col-2 d-flex justify-content-center'>
            <h2 className='text-danger text-decoration-underline'>{selectedItem} Recipes</h2>
          </div>
        </div>
        <div className='row d-flex justify-content-center px-3'>
            <RecipeView selectedItem={selectedItem} categories={categories} />
        </div>
      </div>
    </>
  )
}

export default BrowseRecipes