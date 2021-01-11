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

    const find = (e) => {
        if(e.key === "Enter"){
            history.push(`/profile/${e.target.value}`)
            e.target.value = ""
        }
    }

    return(
        <>
            <div className="mainNavbar">
                <div className="mainNavbarContents">
                    <img onClick={() => {
                        history.push("/")
                    }} className="icon" alt="Instagram" src={`${process.env.PUBLIC_URL}/images/instagram.svg`}></img>
                    <input onKeyDown={(e) => {find(e)}} placeholder="Search" type="text" />
                    <div className="mainNavbarContentsIcons">
                        <HomeOutlinedIcon onClick={() => {
                            history.push("/")
                        }} className="icon"/>
                        <EmailOutlinedIcon onClick={() => {
                            history.push('/messages')
                        }} className="icon"/>
                        <ExploreOutlinedIcon onClick={() => {
                            history.push("/explore")
                        }} className="icon"/>
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