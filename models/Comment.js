import mongoose from 'mongoose';

const commentchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  parentId: {
    type: String,
    require: true,
  },
  postId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
}, {timestamps: true});

export default mongoose.model('Comment', commentchema, 'comment')
