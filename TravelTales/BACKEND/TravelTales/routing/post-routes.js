const Router = require("express");
const { getAllPosts, addPost, getPostById, updatePost, deletePost } = require("../controllers/post-controller");

const postRouter= Router();

postRouter.get("/",getAllPosts);
postRouter.get("/:id",getPostById);
postRouter.post("/add",addPost);
postRouter.put("/:id",updatePost);
postRouter.delete("/:id",deletePost);


module.exports=postRouter;