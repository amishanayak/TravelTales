const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

const getAllPosts= async(req,res,next)=> {
    let posts;
    try{
        posts=await Post.find().populate("user");
    }catch(err) {
        return console.log(err);
    }

    if(!posts)
    {
        return res.status(500).json({message:"Unexpected Error Occured"});
    }
    return res.status(200).json({posts});
}

const addPost= async(req,res,next) => {
    const {title,description,image,location,date,user}= req.body;

    if(!title && title.trim()==="" && !description && description.trim()==="" && !image && image.trim()==="" && !location && location.trim()==="" && !date && !user)
    {
        return res.status(422).json({message:"Invalid Data"});
    }

    let existingUser;

    try {
        existingUser= await User.findById(user);
    }catch(err) {
        return next(err);
    }

    if(!existingUser)
    {
        return res.status(404).json({message:"User not found"});
    }

    let newPost;

    try{
        newPost= new Post({title,description,image,location,date:new Date(`${date}`),user});
        const session= await mongoose.startSession();
        session.startTransaction();
        await existingUser.posts.push(newPost);
        existingUser.save({session});
        newpost= await newPost.save({session});
        session.commitTransaction();
    }catch(err){
        return next(err);
    }

    if(!newPost)
    {
        return res.status(500).json({message:"Unexpected error occured"});
    }

    return res.status(201).json({newPost});
};

const getPostById= async(req,res,next)=>{
    const id=req.params.id;

    let post;

    try{
        post= await Post.findById(id);
    }catch(err) {
        return next(err);
    }

    if(!post)
    {
        return res.status(500).json({message:"No Post Found"});
    }

    return res.status(201).json({post});
};

const updatePost= async(req,res,next)=>{
    const id=req.params.id;
    const {title,description,image,location}= req.body;

    if(!title && title.trim()==="" && !description && description.trim()==="" && !image && image.trim()==="" && !location && location.trim()==="")
    {
        return res.status(422).json({message:"Invalid Data"});
    }
    let post;

    try{
        post= await Post.findByIdAndUpdate(id,{title,description,image,location});
    }catch(err) {
        return next(err);
    }

    if(!post)
    {
        return res.status(500).json({message:"Unable to update Post"});
    }

    return res.status(201).json({message:"Updated Successfully"});
    
};

const deletePost= async(req,res,next)=>{
    const id=req.params.id;

    let post;

    try{
        const session= await mongoose.startSession();
        session.startTransaction();
        post= await Post.findById(id).populate("user");
        post.user.posts.pull(post);
        await post.user.save({session});
        post= await Post.findByIdAndRemove(id);
        session.commitTransaction();
    }catch(err) {
        return next(err);
    }

    if(!post)
    {
        return res.status(500).json({message:"Unable to delte the post"});
    }

    return res.status(201).json({message:"Deleted Successfully"});
};


exports.getAllPosts=getAllPosts;
exports.addPost=addPost;
exports.getPostById=getPostById;
exports.updatePost=updatePost;
exports.deletePost=deletePost;