import mongoose from 'mongoose';

const commentchema = new mongoose.Schema({
  postId: {
    type: String,
    require: true,
    minlength: 5,
  },
  content: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
}, {timestamps: true});

export default mongoose.model('Comment', commentchema, 'comment')
