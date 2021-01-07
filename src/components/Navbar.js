import React from 'react'
import {auth} from '../database/firebase'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../styles/Navbar.css'

function Navbar(){
    const user = useSelector(state => state.user)
    const history = useHistory()

    return(
        <>
            <div className="mainNavbar">
                <div className="mainNavbarContents">
                    <img onClick={() => {
                        history.push("/")
                    }} className="icon" alt="Instagram" src={`${process.env.PUBLIC_URL}/images/instagram.svg`}></img>
                    <input placeholder="Search" type="text" />
                    <div className="mainNavbarContentsIcons">
                        <HomeOutlinedIcon className="icon"/>
                        <EmailOutlinedIcon className="icon"/>
                        <ExploreOutlinedIcon className="icon"/>
                        <FavoriteBorderIcon onClick={() => {
                            auth.signOut()
                        }} className="icon"/>
                        <span onClick={() => {
                            history.push(`/profile/${user.nickName}`)
                        }} className="navbarAvatar">
                            <img alt="" src={user.photoURL !== null ? user.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar