import mongoose from 'mongoose';

const postchema = new mongoose.Schema({
  title: {
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

export default mongoose.model("Posts", postchema, 'posts')
