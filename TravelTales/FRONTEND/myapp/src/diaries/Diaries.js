import React, { useEffect, useState } from 'react'
import DiaryItem from './DiaryItem'
import { Box } from '@mui/material'
import { getAllPosts } from '../api-helpers/helpers'

const Diaries = () => {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        getAllPosts().then((data)=>setPosts(data?.posts)).catch(err=>console.log(err));
    },[])
  return (
    <Box display={'flex'} flexDirection={'column'} padding={5} justifyContent={'center'} alignItems={'center'}
    > 
    {" "}
    {posts && posts.map((item,index)=>
    <DiaryItem 
    date={new Date(`${item.date}`).toLocaleDateString()}
    description={item.description}
    title={item.title}
    image={item.image}
    location={item.location}
    id={item._id}
    key={index}
    user={item.user._id}
    name={item.user.name}
    />)}
    </Box>
  )
}

export default Diaries
