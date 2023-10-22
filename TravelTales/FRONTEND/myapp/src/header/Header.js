import React,{useState} from 'react';
import {AppBar,Toolbar,Tabs,Tab} from '@mui/material';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const linksArr= ["home","diaries","auth"];
const loggedInLinks=["home","diaries","add","profile"];

const Header = () => {
  const isLoggedIn= useSelector((state)=> state.isLoggedIn);
    const [value,setValue]= useState();
  return (
    <AppBar sx={{bgcolor:"black",position:"sticky"}}>
        <Toolbar>
            <ModeOfTravelIcon/>
            <div>TravelTales.</div>
            <Tabs value={value} onChange={(e,val)=>setValue(val)} sx={{ml:"auto",textDecoration:"none"}}>
            {isLoggedIn?
            loggedInLinks.map((link)=> (<Tab LinkComponent={Link} to={`${link==="home" ? " " : link}`} key={link} label={link} sx={{color:"white",textDecoration:"none",":hover": {textDecoration:"underline",textUnderlineOffset:'18px'} }}/>))
            :linksArr.map((link)=> (<Tab LinkComponent={Link} to={`${link==="home" ? " " : link}`} key={link} label={link} sx={{color:"white",textDecoration:"none",":hover": {textDecoration:"underline",textUnderlineOffset:'18px'} }}/>))}
            </Tabs>
        </Toolbar>
    </AppBar>
  )
}

export default Header;
