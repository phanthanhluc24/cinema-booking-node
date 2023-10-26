const commentModel = require("../models/comment");

class CommentRepository {
  async store(data) {
    return await commentModel.create(data);
  }

  async getStarMovie(id) {
    return await commentModel.find({ movieId: id }).select("star -_id");
  }

  async getAllCommentMovie(id) {
    return await commentModel
      .find({"movieId":id})
      .select("-_id comment userId")
      .populate({
        path:"userId",
        select:"-_id full_name"
      })
  }
}

module.exports = new CommentRepository();
