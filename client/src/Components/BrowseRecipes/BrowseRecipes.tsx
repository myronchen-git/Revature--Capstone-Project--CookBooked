import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DropDown from '../Util/DropDown'

function BrowseRecipes() {
  //state to hold the dropdown menu selected Item
  const [selectedItem, setSelectedItem] = useState("All");
  //state to hold all the categories gathered from TheMealDB
  const [categories, setCategories] = useState<string[]>([]);
  //state to hold all the recipes from a category
  const [recipes, setRecipes] = useState([]);

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
        })
  }, [])

  //this useEffect will grab the items from TheMealDB and place them in the recipes state
  useEffect(() => {
    //check if the selectedItem is all, in this case go through the category list and run every string through get recipe by category in TheMealDB
    if(selectedItem === "All") {
      console.log(true);
    } else {
      //call TheMealDB with the selectedItem as its category
      console.log(false);
    }
  }, [selectedItem])

  return (
    <>
      <div className='container-fluid mt-4'>
        <div className='row justify-content-end'>
          <div className='col-md-8 ml-auto'>
            <div className='d-flex justify-content-end align-items-center me-5'>
              <h4 className='me-3'>Filter: </h4>
              <DropDown selectedItem={selectedItem} selectItemHandler={selectItemFromDropdown} categories={categories} />
            </div>
          </div>
        </div>
        <div className='row justify-content-center mb-5 border-bottom'>
          <div className='col-md-10 col-sm-12'>
            <h1 className='m-3'>Browse Recipes</h1>
          </div>
        </div>
        <div className='row bg-secondary'>
            <div className='col'>
              <h3>{selectedItem} Recipes: </h3>
            </div>
          </div>
      </div>
    </>
  )
}

export default BrowseRecipes