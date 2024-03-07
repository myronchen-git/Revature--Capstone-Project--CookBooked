const reviewHelper = require('../../src/controller/ReviewsHelper');

describe('Test to check Review Helper Functions', () => {
    /**
     * Tests for validatation functions
     */

    const RECIPE_ID = "4";
    const USERNAME = "John";
    const IMAGE_URL = "https://thumbs.dreamstime.com/b/heart-shape-variou…d-concept-isolated-white-background-140287808.jpg";
    const RATING = 5;
    const CONTENT = "Test Success"

    //test to see if function succeeds
    test('Success of Validate Data', () => {
        //test object
        const testSuccess = {
            recipeId: RECIPE_ID,
            username: USERNAME,
            imageUrl: IMAGE_URL,
            rating: RATING,
            content: CONTENT
        }

        const result = reviewHelper.validateNewReview(testSuccess);

        expect(result).toBeTruthy();
    })

    //test to see if function Fails with empty values
    test('Failure of Validate Data (Empty Values)', () => {
        //test fail object
        const testFailNoRecipe = {
            recipeId: '',
            username: USERNAME,
            imageUrl: IMAGE_URL,
            rating: RATING,
            content: CONTENT
        }

        const testFailNoUN = {
            recipeId: RECIPE_ID,
            username: "",
            imageUrl: IMAGE_URL,
            rating: RATING,
            content: CONTENT
        }

        const testFailNoImg = {
            recipeId: RECIPE_ID,
            username: USERNAME,
            imageUrl: "",
            rating: RATING,
            content: CONTENT
        }
        
        const testFailNoRating = {
            recipeId: RECIPE_ID,
            username: USERNAME,
            imageUrl: IMAGE_URL,
            rating: "",
            content: CONTENT
        }
        
        const testFailNoContent = {
            recipeId: RECIPE_ID,
            username: USERNAME,
            imageUrl: IMAGE_URL,
            rating: RATING,
            content: ""
        }

        expect(() => reviewHelper.validateNewReview(testFailNoRecipe)).toThrow("Invalid request to the server");
        expect(() => reviewHelper.validateNewReview(testFailNoUN)).toThrow("Invalid request to the server");
        expect(() => reviewHelper.validateNewReview(testFailNoImg)).toThrow("Invalid URL");
        expect(() => reviewHelper.validateNewReview(testFailNoRating)).toThrow("Rating is not a number");
        expect(() => reviewHelper.validateNewReview(testFailNoContent)).toThrow("Invalid request to the server");
    })

    //test to see if function contains correct image file
    test('Sanatize Image Function Success', () => {
        const testCorrectExtensionPng = 'https://png.pngtree.com/png-clipart/20221001/ourmi…ee-fast-food-big-ham-burger-png-image_6244235.png';
        const testCorrectExtensionJpg = 'https://thumbs.dreamstime.com/b/heart-shape-variou…d-concept-isolated-white-background-140287808.jpg';
        const testCorrectExtensionJpeg = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg';

        const result = reviewHelper.sanitizeImage(testCorrectExtensionPng);
        const result2 = reviewHelper.sanitizeImage(testCorrectExtensionJpg);
        const result3 = reviewHelper.sanitizeImage(testCorrectExtensionJpeg)

        expect(result).toBe(testCorrectExtensionPng);
        expect(result2).toBe(testCorrectExtensionJpg);
        expect(result3).toBe(testCorrectExtensionJpeg);
    })

    //test to see if function fails with incorrect image file
    test('Sanatize Image Function (Incorrect Image Extension)', () => {
        const testFailureinExtension = 'https://cdn3.vox-cdn.com/uploads/chorus_asset/file/704658/tumblr_m6oolzvXsJ1qfvx4yo1_500.0.gif'

        expect(() => reviewHelper.sanitizeImage(testFailureinExtension)).toThrow('Please Enter a Valid Image');
    })

    //test to see if function succeeds with value within range
    test('Success validating Rating (Within rating range)', () => {
        const testSuccessRating = 2;

        const result = reviewHelper.sanitizeRating(testSuccessRating);

        expect(result).toBe(testSuccessRating);
    })

    //test to see if function fails with outside rating range
    test('Failure to Validate Rating (Outside rating range and not Integer)', () => {
        const testFailureLowerBound = 0;
        const testFailureUpperBound = 6;
        const testFailureDecimal = 2.2;
        const testFailureNoInt = "2";


        expect(() => reviewHelper.sanitizeRating(testFailureLowerBound)).toThrow('Rating is outside range of 1-5');
        expect(() => reviewHelper.sanitizeRating(testFailureUpperBound)).toThrow('Rating is outside range of 1-5');
        expect(() => reviewHelper.sanitizeRating(testFailureDecimal)).toThrow('Rating is not a number');
        expect(() => reviewHelper.sanitizeRating(testFailureNoInt)).toThrow('Rating is not a number');
    })

    //test is string method to make sure it returns the string back if the parameter is of type string
    test('Success to check for String type', () => {
        const string = "Hello";

        const result = reviewHelper.isString(string);

        expect(result).toBe(string);
    })

    //failure in the stirng test if the parameter is not a string
    test('Failure to check for String type', () => {
        const failBool = true;
        const failObj = {};
        const failInt = 30;

        expect(() => reviewHelper.isString(failBool)).toThrow(`${failBool} must be of type String`);
        expect(() => reviewHelper.isString(failObj)).toThrow(`${failObj} must be of type String`);
        expect(() => reviewHelper.isString(failInt)).toThrow(`${failInt} must be of type String`);
    })
})