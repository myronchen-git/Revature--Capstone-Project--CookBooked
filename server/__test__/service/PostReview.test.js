const reviewService = require('../../src/service/ReviewsService');
const reviewsDao = require('../../src/repository/ReviewsDAO');

describe('Test to see if Review is Posted', () => {
    /**
     * Tests for createNewReview function
     */

    //test to see success of the 
    test('Successfully Posted Review', async() => {
        //test object
        const testSuccess = {
            recipeId: '4',
            username: "John",
            imageUrl: "Doe.png",
            rating: "5",
            content: "Test Success"
        }

        jest.spyOn(reviewsDao, 'postReview').mockReturnValueOnce({
            reviewId: "0101010101"
        });

        const result = await reviewService.createNewReview(testSuccess);
        const expected = {
            reviewId: "0101010101"
        }

        expect(result).toStrictEqual(expected);
    })

    //DO TESTS FOR THE THROW ERRORS IN CREATENEWREVIEW METHOD

    //test that fails in the DAO
    test('Fails when trying to Post in DAO', async() => {
        //test object
        const testSuccess = {
            username: "John",
            imageUrl: "Doe.png",
            rating: "5",
            content: "Test Success"
        }

        const err = new Error('Test Error');

        jest.spyOn(reviewsDao, 'postReview').mockRejectedValueOnce(err);

        expect(reviewService.createNewReview(testSuccess)).rejects.toThrow();
    })
})  