import React, { useContext } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import {Link } from "react-router-dom"
import "./navbar.scss"
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
const NavBar = () => {
  const {toggle,darkMode} = useContext(DarkModeContext)
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)
  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{textDecoration: "none"}}>
        <span>hymnDrazillSocial.</span>
        </Link>
        <HomeOutlinedIcon/>
{       !darkMode ? <DarkModeOutlinedIcon  onClick={toggle}/> : <Brightness5Icon onClick={toggle}/>}      
         <GridViewOutlinedIcon/>
        <div className="search">
        <SearchOutlinedIcon/>
        <input type="text" placeholder='search' />

        </div>
      </div>

      {/* RIGHT SIDE OF THE NAVBAR */}
      <div className="right">
        <Person2OutlinedIcon/>
        <EmailOutlinedIcon/>
        <NotificationsNoneOutlinedIcon/>
        <div className="user">
          {<img src={"/upload/"+currentUser.profilePic} alt="" />}
          <span>{currentUser.name}</span>
        </div>


      </div>

    </div>
  )
}

export default NavBar
