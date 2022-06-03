const express = require("express");

const router = express.Router();

const {
  getPost,
  getPosts,
  getPostsBySearch,
  getPostsByCreator,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} = require("../controllers/posts");
const { auth } = require("../middleware/auth");

router.get("/", getPosts);
router.get("/post/:id", getPost);
router.get("/search", getPostsBySearch);
router.get("/creator", getPostsByCreator);
// router.get("/test", (req, res)=>{
//     console.log('test');
// });
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

module.exports = router;
