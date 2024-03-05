const reviewService = require('../../src/service/ReviewsService');
const reviewsDao = require('../../src/repository/ReviewsDAO');

describe('Test to see if Review is Posted', () => {
    let validateFieldSpy;
    let postReviewSpy;

    beforeEach(() => {
        validateFieldSpy = jest.spyOn(reviewService, 'validateFields');
        postReviewSpy = jest.spyOn(reviewsDao, 'postReview');
    })

    afterEach(() => {
        validateFieldSpy.mockRestore();
        postReviewSpy.mockRestore();
    })

    /**
     * Tests for createNewReview function
     */

    //test to see success of the 
    test('Successfully Posted Review', async() => {
        //test object
        const testSuccess = {
            username: "John",
            imageUrl: "Doe.png",
            rating: "5",
            content: "Test Success"
        }

        validateFieldSpy.mockReturnValueOnce(true);
        postReviewSpy.mockReturnValueOnce(true);

        const result = await reviewService.createNewReview(testSuccess);

        expect(typeof result.recipeId).toBe("string");
        expect(typeof result.reviewId).toBe("string");
        expect(result.author).toBe(testSuccess.username);
        expect(result.imageUrl).toBe(testSuccess.imageUrl);
        expect(result.rating).toBe(testSuccess.rating);
        expect(result.content).toBe(testSuccess.content);
        expect(typeof result.createdAt).toBe("number");
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

        validateFieldSpy.mockReturnValueOnce(true);
        postReviewSpy.mockRejectedValueOnce(err);

        expect(reviewService.createNewReview(testSuccess)).rejects.toThrow();
    })

    //test that fails validation
    test('Fails when Validating Data', async() => {
        //test fail object
        const testFailNoUN = {
            username: "",
            imageUrl: "test.png",
            rating: 5,
            content: "Test Fail"
        }

        const err = new Error('Test Error');

        validateFieldSpy.mockReturnValueOnce(err);
        
        expect(reviewService.createNewReview(testFailNoUN)).rejects.toThrow();
    })

    /**
     * Tests for validateFields function
     */

    //test to see if function succeeds
    test('Success of Validate Data', () => {
        //test object
        const testSuccess = {
            username: "John",
            imageUrl: "Doe.png",
            rating: "5",
            content: "Test Success"
        }

        const result = reviewService.validateFields(testSuccess);

        expect(result).toBeTruthy();
    })

    //test to see if function Fails with empty values
    test('Failure of Validate Data (Empty Values)', () => {
        //test fail object
        const testFailNoUN = {
            username: "",
            imageUrl: "test.png",
            rating: 5,
            content: "Test Fail"
        }

        const testFailNoImg = {
            username: "John",
            imageUrl: "",
            rating: "5",
            content: "Test Fail"
        }
        
        const testFailNoRating = {
            username: "John",
            imageUrl: "test.png",
            rating: "",
            content: "Test Fail"
        }
        
        const testFailNoContent = {
            username: "John",
            imageUrl: "test.png",
            rating: "2",
            content: ""
        }

        expect(() => reviewService.validateFields(testFailNoUN)).toThrow('No Username Present');
        expect(() => reviewService.validateFields(testFailNoImg)).toThrow('No Image Present');
        expect(() => reviewService.validateFields(testFailNoRating)).toThrow('No Rating Present');
        expect(() => reviewService.validateFields(testFailNoContent)).toThrow('No Content Present');
    })

    //test to see if function fails with incorrect image file
    test('Failure to Validate Data (Incorrect Image Extension)', () => {
        const testFailureinExtension = {
            username: "John",
            imageUrl: "Doe.psg",
            rating: "5",
            content: "Test Success"
        }

        expect(() => reviewService.validateFields(testFailureinExtension)).toThrow('Image Extension Unapplicable');
    })

    //test to see if function fails with outside rating range
    test('Failure to Validate Data (Outside rating range)', () => {
        const testFailureLowerBound = {
            username: "John",
            imageUrl: "Doe.png",
            rating: "0.9",
            content: "Test Success"
        }

        const testFailureUpperBound = {
            username: "John",
            imageUrl: "Doe.png",
            rating: "5.1",
            content: "Test Success"
        }


        expect(() => reviewService.validateFields(testFailureLowerBound)).toThrow('Rating is outside range of 1-5');
        expect(() => reviewService.validateFields(testFailureUpperBound)).toThrow('Rating is outside range of 1-5');
    })
})  