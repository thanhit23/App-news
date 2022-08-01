import Posts from '../models/Posts.js';
import response from '../helpers/response.js';

const postsController = {
  create: async(req, res) => {
    try {
      const { body: { title, content }, user: { user: { _id : userId } } } = req;
      const newPosts = await new Posts({
        title,
        content,
        userId,
      })
      const post = await newPosts.save();

      return response.success(res, post);
    } catch (error) {
      response.serverError(res, error)
    }
  },
  delete: async(req, res) => {
    try {
      const { user: { user: { _id : authId } } } = req;
      const post = await Posts.findById(req.params.id)

      if (!post) {
        return response.error(res, 'Not Found', 404)
      }

      if (authId != postId.userId) {
        return response.error(res, 'You not allowed to delete', 403)
      }
      const result = await Posts.findByIdAndDelete(req.params.id);
      return response.success(res, result, 'Delete posts successfully');
    } catch (error) {
      response.serverError(res, error)
    }
  },
  update: async(req, res) => {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body)
    const message = post ? 'Update posts successfully': 'Update posts failed';
    return response.success(res, Boolean(post), message);
  },
  getList: async(req, res) => {
    const joined = await Posts.aggregate([
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
      }
    ])
    
    return response.success(res, joined);
  },
  detail: async(req, res) => {
    const post = await Posts.findById(req.params.id)
    return response.success(res, post);
  }
}

export default postsController;
