const commentService = require('../../src/service/CommentsService');
const commentDao = require('../../src/repository/CommentsDAO');

describe('Test CommentService', () => {
    //test success to see if comment service is working correctly
    test('Test Success from CommentService', async () => {
        const testSuccess = {
            reviewId: "1",
            username: "John",
            content: "Test Success"
        }

        jest.spyOn(commentDao, 'postComment').mockReturnValueOnce({reviewId: "0101010101"});

        const result = await commentService.createNewComment(testSuccess);
        const expected = {reviewId: "0101010101"}

        expect(result).toStrictEqual(expected);
    })

    //test for failure of the commentService
    test('Test Failure From CommentService', async () => {
        const testSuccess = {
            reviewId: "1",
            username: "John",
            content: "Test Success"
        }

        const err = new Error('Test Error');

        jest.spyOn(commentDao, 'postComment').mockRejectedValueOnce(err);

        expect(commentService.createNewComment(testSuccess)).rejects.toThrow();
    })
})