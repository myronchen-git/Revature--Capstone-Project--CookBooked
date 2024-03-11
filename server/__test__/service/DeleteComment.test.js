const { deleteComment } = require("../../src/service/CommentsService");
const commentsDao = require("../../src/repository/CommentsDAO");
const ArgumentError = require("../../src/errors/ArgumentError");

describe("Test DeleteComment", ()=> {
    //test success of the deleteComment feature
    test("Test Success for User", async ()=> {
        const inputData = {
            username: "Test",
            isAdmin: false,
            reviewId: "1",
            commentId: "1"
        }

        const expectedComment = {
            author: "Test",
            reviewId: "1",
            commentId: "1"
        }

        const expectedClone = structuredClone(expectedComment)

        jest.spyOn(commentsDao, "getOneCommentById").mockReturnValueOnce(expectedClone);
        jest.spyOn(commentsDao, "deleteCommentById").mockReturnValueOnce(true);

        const result = await deleteComment(inputData);
        
        expect(result).toEqual(expectedComment);

    })

    //test success for Admin
    test("Test Success for Admin", async () => {
        const inputData = {
            username: "Admin_Test",
            isAdmin: true,
            reviewId: "1",
            commentId: "1"
        }

        const expectedComment = {
            author: "Test",
            reviewId: "1",
            commentId: "1"
        }

        const expectedClone = structuredClone(expectedComment)

        jest.spyOn(commentsDao, "getOneCommentById").mockReturnValueOnce(expectedClone);
        jest.spyOn(commentsDao, "deleteCommentById").mockReturnValueOnce(true);

        const result = await deleteComment(inputData);

        expect(result).toEqual(expectedComment);
    })

    //test fail if no reviewId given
    test("Test fail if No ReviewId Given", async () => {
        const inputData = {
            username: "Test",
            isAdmin: false,
            commentId: "1"
        }

        expect(async () => await deleteComment(inputData)).rejects.toThrow(ArgumentError);
    })

    //test if the GetOneCommentByID returns undefined
    test("Test fail if There is No Comment by that ID", async () => {
        const inputData = {
            username: "Test",
            isAdmin: false,
            reviewId: "1",
            commentId: "1"
        }

        jest.spyOn(commentsDao, "getOneCommentById").mockReturnValueOnce(undefined);

        expect(async () => await deleteComment(inputData)).rejects.toThrow();
    })

    //test fails if the user is not Admin or not the user for the COmment
    test("Test fail if incorrect user and not Admin", async() => {
        const inputData = {
            username: "Test",
            isAdmin: false,
            reviewId: "1",
            commentId: "1"
        }

        const expectedComment = {
            author: "Tester",
            reviewId: "1",
            commentId: "1"
        }

        jest.spyOn(commentsDao, "getOneCommentById").mockReturnValueOnce(expectedComment);

        expect(async () => await deleteComment(inputData)).rejects.toThrow();
    })

    //test fails in the DAO
    test("Test fail in DAO", async() => {
        const inputData = {
            username: "Test",
            isAdmin: false,
            reviewId: "1",
            commentId: "1"
        }

        const expectedComment = {
            author: "Test",
            reviewId: "1",
            commentId: "1"
        }

        jest.spyOn(commentsDao, "getOneCommentById").mockReturnValueOnce(expectedComment);

        const err = new Error('Test Error');

        jest.spyOn(commentsDao, 'deleteCommentById').mockRejectedValueOnce(err);

        expect(async () => await deleteComment(inputData)).rejects.toThrow();
    })
})