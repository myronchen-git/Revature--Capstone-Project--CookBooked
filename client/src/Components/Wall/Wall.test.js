import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";

import Wall from "./Wall";

jest.mock("axios");
jest.mock("../Util/ReviewsList/ReviewsList");

// --------------------------------------------------

const APP_TITLE = "CookBooked";
const PAGE_TITLE = "Recent Reviews";
const REVIEW_ID1 = "5678";
const REVIEW_ID2 = "review2";

// ==================================================

describe("Wall", () => {
  let dummyData;
  let dummyDataLength;

  beforeEach(() => {
    // Arrange
    dummyData = {
      items: [
        {
          recipeId: "1234",
          reviewId: REVIEW_ID1,
          recipeName: "abc",
          author: "author1",
          imageUrl: "image url",
          rating: 5,
          content: "content",
          createdAt: 56789,
          isRecent: 1,
        },
        {
          recipeId: "recipe2",
          reviewId: REVIEW_ID2,
          recipeName: "name2",
          author: "author2",
          imageUrl: "image url",
          rating: 5,
          content: "content",
          createdAt: 89908,
          isRecent: 1,
        },
      ],
    };

    dummyDataLength = dummyData.items.length;

    axios.get.mockResolvedValue({ data: { ReviewPosts: dummyData } });
  });

  test("Renders app title.", async () => {
    // Arrange

    // Act
    render(<Wall />);

    // Assert
    const textElement = await screen.findByText(APP_TITLE);
    expect(textElement).toBeInTheDocument();
  });

  test("Renders recent reviews title.", async () => {
    // Arrange

    // Act
    render(<Wall />);

    // Assert
    const textElement = await screen.findByText(PAGE_TITLE);
    expect(textElement).toBeInTheDocument();
  });

  test("Renders reviews.", async () => {
    // Arrange

    // Act
    render(<Wall />);

    // Assert
    const section = await screen.findByTestId("section");
    expect(section.childElementCount).toBe(dummyDataLength);
  });

  test("Deleting a review removes it from the home page wall.", async () => {
    // Arrange
    render(<Wall />);
    const section = await screen.findByTestId("section");
    const review1 = section.children[0];

    // Act
    fireEvent.click(review1);

    // Assert
    const review2 = await screen.findByText(REVIEW_ID2);
    expect(review2).toBeInTheDocument();
    expect(section.childElementCount).toBe(dummyDataLength - 1);
  });
});
