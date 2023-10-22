import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostDetails, postUpdate } from '../api-helpers/helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const DiaryUpdate = () => {
    const [post, setPost] = useState();
 const [inputs,setInputs]=useState({title:"",description:"",location:"",imageUrl:""});
  const id= useParams().id;
  console.log(id);
  useEffect(()=>{getPostDetails(id).then((data)=>{
    setPost(data.post)
    setInputs({
        title:data.post.title,
        description:data.post.description,
        imageUrl:data.post.image,
        location:data.post.location,
    })
    })
    .catch(err=>console.log(err))},[id]);
  const handleChange=(e)=>{
    setInputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
    }))
  };  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    postUpdate(inputs,id).then((data)=>console.log(data)).catch((err)=>console.log(err));
  };
  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="100%" >
        <Box display="flex" margin="auto" padding={2} >
            <Typography fontWeight="bold" variant="h4" fontFamily={"dancing script"} >
                Add Your Travel Tale
            </Typography>
            <TravelExploreIcon sx={{fontSize:"40px",paddingLeft:1,color:"lightcoral" }}/>
        </Box>
        {post && (<form onSubmit={handleSubmit} >
            <Box borderRadius={11} bgcolor="lightblue" padding={3} display="flex" width="80%" margin="auto" flexDirection={"column"} >
                <FormLabel sx={{fontFamily:"Quicksand"}}>Title</FormLabel>
                <TextField onChange={handleChange} name="title" value={inputs.title} variant='standard' margin="normal"/>
                <FormLabel sx={{fontFamily:"Quicksand"}}>Description</FormLabel>
                <TextField onChange={handleChange} name="description" value={inputs.description} variant='standard' margin="normal"/>
                <FormLabel sx={{fontFamily:"Quicksand"}}>Location</FormLabel>
                <TextField onChange={handleChange} name="location" value={inputs.location} variant='standard' margin="normal"/>
                <FormLabel sx={{fontFamily:"Quicksand"}}>Image URL</FormLabel>
                <TextField onChange={handleChange} name="imageUrl" value={inputs.imageUrl} variant='standard' margin="normal"/>
                <Button type='submit' variant='contained' sx={{width:"30%",margin:"auto",mt:3,borderRadius:"7px"}} color="error">Post</Button>
            </Box>
        </form>)}
    </Box>
  )
}

export default DiaryUpdate
