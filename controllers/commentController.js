import Comment from '../models/Comment.js';
import response from '../helpers/response.js';

const commentController = {
  create: async(req, res) => {
    try {
      const { body: { postId, content, parentId = null }, user: { user: { _id : userId } } } = req;
      const newComment = await new Comment({
        content,
        parentId,
        postId,
        userId,
      })
      const comment = await newComment.save();

      return response.success(res, comment)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const { user: { user: { _id : userId, admin } } } = req;
      const comment = await Comment.findById(req.params.id)
      if (userId == comment._id || admin) {
        const result = await Comment.findByIdAndDelete(req.params.id)
        return response.success(res, result);
      }

      return response.error(res, 'Unauthorized', 401);
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { user: { user: { _id : userId, admin } } } = req;
      const comment = await Comment.findById(req.params.id)
      if (userId == comment._id || admin) {
        const result = await Comment.findByIdAndUpdate(req.params.id, req.body)
        return response.success(res, result);
      }

      return response.error(res, 'Unauthorized', 401);
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  getListComments: async(req, res) => {
    try {
      const { query: { postId, parentId } } = req
      const match = {}

      if (postId) {
        Object.assign(match, { postId, parentId: null })
      } else if (parentId) {
        Object.assign(match, { parentId })
      } else if (!postId && !parentId) {
        Object.assign(match, { postId: null })
      }

      const listComments = await Comment.aggregate([
        {
          $addFields: {
            userId: {
              $toObjectId: "$userId"
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
          }
        },
        { $match : match },
      ])
      const commentIds = listComments.map(({_id}) => _id);
      const data = await Comment.aggregate([
        {
          $addFields: {
            parentId: {
              $toObjectId: "$parentId"
            }
          }
        },
        {$match: { parentId: { $in: commentIds } } },
        {$group: {_id: "$parentId", totalReply:{$sum:1}}},
      ])

      const result = listComments.map( item => {
        const { totalReply = 0 } = data.find( e => e._id.toString() == item._id.toString()) || {}

        return { ...item, totalReply }
      })

      return response.success(res, result)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
}

export default commentController;
