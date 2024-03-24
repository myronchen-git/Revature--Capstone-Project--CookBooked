import { fireEvent, render } from "@testing-library/react";
import DropDown from "./DropDown";

describe("Test the dropdown", () => {
    test("Test elements of a Dropdown", () => {
        const mockProps = {
            selectedItem: "Test",
            categories: ["Test", "Category1"]
        }

        const { getByText, getAllByText } = render(<DropDown {...mockProps} />);

        const displayedOnDropdown = getAllByText("Test");
        const displayedOtherOptions = getByText("Category1");

        expect(displayedOnDropdown[0]).toBeInTheDocument();
        expect(displayedOnDropdown[1]).toBeInTheDocument();
        expect(displayedOtherOptions).toBeInTheDocument();
    })
})