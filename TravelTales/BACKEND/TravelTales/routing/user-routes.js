const Router  = require("express");
const { getAllUsers, signup, login, getUserById }= require("../controllers/user-controllers");

const userRouter= Router();

userRouter.get("/",getAllUsers);

userRouter.get("/:id",getUserById);

userRouter.post("/signup",signup);

userRouter.post("/login",login);

module.exports=userRouter;