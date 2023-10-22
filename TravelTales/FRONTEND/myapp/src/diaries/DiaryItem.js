import React, { useState } from 'react';
import {Card,CardHeader,CardContent,Avatar,Typography,IconButton, Box, CardActions, Snackbar, Alert} from '@mui/material';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate } from 'react-router-dom';
import { postDelete } from '../api-helpers/helpers';

const DiaryItem = ({title,description,image,location,date,id,user,name}) => {
  const navigate= useNavigate();
  const [open, setOpen] = useState(false);
  const isLoggedInUser = () => {
    if(localStorage.getItem("userId")===user) {
      return true
    }
    return false
  };

  const handleDelete= ()=> {
    postDelete(id).then((data)=>console.log(data)).catch((err)=>console.log(err));
    setOpen(true);
    navigate("/");
  };

  return (
    <Card sx={{ width:"50%", height:"70vh", margin:1, padding:1,display:"flex",flexDirection:"column", boxShadow:"5px 5px 10px #ccc",bgcolor:"#f0ffff"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'purple' }} aria-label="recipe">
            {name ? name.charAt(0) : ''}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {<EditLocationAltIcon/>}
          </IconButton>
        }
        title={location}
        header={location}
        subheader={date}
      />
      <img
        height="194"
        width={"100%"}
        src={image}
        alt={title}
      />
      <CardContent>
        <Typography paddingBottom={1} variant="h6" color="grey">
          {title}
        </Typography>
        <hr/>
        <Box paddingTop={1} display={'flex'}>
        <Typography paddingTop={1} width="170px" fontWeight={'bold'} variant='div'>
          {name}
        </Typography>
        <Typography paddingTop={1} variant="body2" color="text.secondary">
          {description}
        </Typography>
        </Box>
      </CardContent>
      {isLoggedInUser() && (<CardActions sx={{marginLeft:'auto'}} >
        <IconButton LinkComponent={Link} to={`/post/${id}`} color='warning'><EditIcon/></IconButton>
        <IconButton onClick={handleDelete} color='error'><DeleteForeverIcon/></IconButton>
      </CardActions>)}

      <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
      <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
         The post was deleted!
      </Alert>
      </Snackbar>

    </Card>
  )
}

export default DiaryItem
