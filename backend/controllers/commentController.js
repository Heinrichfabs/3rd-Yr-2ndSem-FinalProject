const Comment = require("../models/Comment");
const SuccessHandler = require("../utils/successHandler");
const ErrorHandler = require("../utils/errorHandler");
const commentsAction = require("../actions/commentAction");
const asyncHandler = require("express-async-handler");
const checkRequiredFields = require("../helpers/checkRequiredFields");

exports.getAllComment = asyncHandler(async (req, res, next) => {
  const comments = await commentsAction.getAllCommentsData();

  return !comments?.length
    ? next(new ErrorHandler("No comment found"))
    : SuccessHandler(
        res,
        `Comment with texts ${comments
          .map((u) => u.text)
          .join(", ")} and IDs ${comments
          .map((u) => u._id)
          .join(", ")} retrieved`,
        comments
      );
});

exports.getSingleComment = asyncHandler(async (req, res, next) => {
  const comment = await commentsAction.getSingleCommentData(req.params.id);

  return !comment
    ? next(new ErrorHandler("No comment found"))
    : SuccessHandler(
        res,
        `Comment ${comment.text} with ID ${comment._id} retrieved`,
        comment
      );
});

exports.createNewComment = [
  checkRequiredFields(["transaction", "ratings", "text"]),
  asyncHandler(async (req, res, next) => {
    const comment = await commentsAction.CreateCommentData(req);

    return SuccessHandler(
      res,
      `New comment ${comment.text} created with an ID ${comment._id}`,
      comment
    );
  }),
];

exports.updateComment = [
  checkRequiredFields(["transaction", "ratings", "text"]),
  asyncHandler(async (req, res, next) => {
    const comment = await commentsAction.updateCommentData(
      req,
      res,
      req.params.id
    );

    return SuccessHandler(
      res,
      `Comment ${comment.text} with ID ${comment._id} is updated`,
      comment
    );
  }),
];

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await commentsAction.deleteCommentData(req.params.id);

  return !comment
    ? next(new ErrorHandler("No comment found"))
    : SuccessHandler(
        res,
        `Comment ${comment.text} with ID ${comment._id} is deleted`,
        comment
      );
});
