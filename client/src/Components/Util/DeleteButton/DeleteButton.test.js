import { fireEvent, render, screen } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

// ==================================================

describe("Deletebutton", () => {
  let mockClickHandler;

  beforeEach(() => {
    mockClickHandler = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Renders trash.svg image.", () => {
    // Arrange
    render(<DeleteButton onClick={mockClickHandler} />);
    const image = screen.getByAltText("Delete");

    // Act

    // Assert
    expect(image.src).toContain("trash.svg");
  });

  test("Calls back a function when clicked.", () => {
    // Arrange
    render(<DeleteButton onClick={mockClickHandler} />);
    const image = screen.getByAltText("Delete");

    // Act
    fireEvent.click(image);

    // Assert
    expect(mockClickHandler).toHaveBeenCalled();
  });
});
