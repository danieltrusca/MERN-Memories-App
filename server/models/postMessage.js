const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// const postSchema = mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     message: String,
//     creator: String,
//     tags: [String],
//     selectedFile: String,
//     likeCount: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("PostMessage", postSchema);
