import { getByText, render, screen, act } from "@testing-library/react";
import BrowseRecipes from "./BrowseRecipes";
import axios from "axios";

jest.mock("axios");
jest.mock('../Util/DropDown', () => ({ selectedItem, selectItemHandler, categories }) => (
    <div data-testid="dropdownComponent" >
      <p data-testid="selectedItem">{selectedItem}</p>
      <ul>
        {categories.map((category, index) => (
          <li data-testid="dropdownCategories" key={index} onClick={() => selectItemHandler(category)}>{category}</li>
        ))}
      </ul>
    </div>
  ));
jest.mock('./BrowserRecipeView', () => () => <div data-testid="browseRecipeView"></div>);

describe("Tests for BrowseRecipes", () => {
    let dummyCategories;
    let dummylength;

    beforeEach(() => {
        dummyCategories = {
            categories: [
                {
                    strCategory: "Test1"
                },
                {
                    strCategory: "Test2"
                }
            ]
        }

        dummylength = dummyCategories.categories.length;

        //mock the axios calls to return these categories        
        axios.get.mockResolvedValue({data: dummyCategories});
    })

    //see if the text elements are present
    test("Test if All Elements are Present", async () => {       
        render(<BrowseRecipes />);

        const filterPresent = await screen.findByText("Filter:");
        const recipeTitle = await screen.findByText("All Recipes");

        expect(filterPresent).toBeInTheDocument();
        expect(recipeTitle).toBeInTheDocument();
    })

    //See if the dropdown is present
    test("Dropdown menu Present", async () => {

        render(<BrowseRecipes />)

        const dropDownPresent = await screen.findByTestId("dropdownComponent");
        
        expect(dropDownPresent).toBeInTheDocument();
    })

    //check the length of the dropdown menu
    test("Dropdown menu list length", async () => {
        render(<BrowseRecipes />)

        const dropDownCategories = await screen.findAllByTestId("dropdownCategories");

        expect(dropDownCategories.length).toBe(dummylength + 1);
    })

    //See if recipeview is present
    test("Recipe View is Present", async () => {

        render(<BrowseRecipes />)

        const browseRecipeViewPresent = await screen.findByTestId("browseRecipeView");
        
        expect(browseRecipeViewPresent).toBeInTheDocument();
    })
})