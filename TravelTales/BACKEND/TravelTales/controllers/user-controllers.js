const { hashSync, compareSync } = require('bcryptjs');
const User= require('../models/User');

const getAllUsers = async (req,res,next)=> {
    let users;
    try{
        users= await User.find();
    }catch(err) {
        return next(err);
    }

    if(!users)
    {
        return res.status(500).json({message:"Unexpected Error Occured"});
    }
    return res.status(200).json({users});
};

const signup= async(req,res,next) =>{
    const { name, email, password}= req.body;

    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.length <6 )
    {
        return res.status(422).json({message:"Invalid Data"});
    }

    const hashedPassword= hashSync(password);

    let users;

    try{
        user= new User({name,email,password:hashedPassword});
        await user.save();
    }catch(err) {
        return next(err);
    }

    if(!user)
    {
        return res.status(500).json({message:"Unexpected error occured"});
    }

    return res.status(201).json({user});
    
};

const login= async(req,res,next) => {
    const {email, password}= req.body;

    if(!email && email.trim()==="" && !password && password.length <6 )
    {
        return res.status(422).json({message:"Invalid Data"});
    }

    let existingUser;

    try{
        existingUser= await User.findOne({email});
    }catch(err) {
        return next(err);
    }

    if(!existingUser)
    {
        return res.status(404).json({message:"No User Found"});
    }

    const isPasswordCorrect= compareSync(password,existingUser.password);

    if(!isPasswordCorrect)
    {
        return res.status(400).json({message:"Incorrect password"});
    }

    return res.status(200).json({id:existingUser._id,message:"Login Succesful"})
}

const getUserById= async(req,res,next)=>{
    const id= req.params.id;
    let users;
    try{
        user= await User.findById(id).populate("posts");
    } catch(err) {
        return console.log(err);
    }

    if(!user) {
        return res.status(404).json({message:"No user found"});
    }
    return res.status(200).json({user});
}

exports.getAllUsers=getAllUsers;
exports.signup=signup;
exports.login=login;
exports.getUserById=getUserById;