import React,{useState,useEffect} from 'react'
import {auth,db,storage} from '../database/firebase'
import {useSelector} from 'react-redux'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import '../styles/Navbar.css'

function Navbar(){
    const [state,setState] = useState(`${process.env.PUBLIC_URL}/images/person-icon.png`)
    const user = useSelector(state => state.user)
    const [statePromise,setStatePromise] = useState(user.photoURL)

    useEffect(() => {
        if(state !== `${process.env.PUBLIC_URL}/images/person-icon.png`){
            storage.ref().child(`avatarImages/${user.displayName}`).put(state).then(() => {
                changeImage()
            })
            
        }
        // storage.refFromURL
        // auth.currentUser.updateProfile({
        //     photoURL: state.image
        // })
        // eslint-disable-next-line
    },[state])

    useEffect(() => {
        if(user.photoURL){
            changeImage()
        }
        // eslint-disable-next-line
    },[])

    const changeImage = () => {
        storage.ref().child(`avatarImages/${user.displayName}`).getDownloadURL().then((url) => {
            auth.currentUser.updateProfile({
                photoURL: url
            })
            db.collection('users').doc(user.email).update({
                photoURL: url
            })
            setStatePromise(url)
        })
    }

    return(
        <>
            <div className="mainNavbar">
                <div className="mainNavbarContents">
                    <img alt="Instagram" src={`${process.env.PUBLIC_URL}/images/instagram.svg`}></img>
                    <input placeholder="Search" type="text" />
                    <div className="mainNavbarContentsIcons">
                        <HomeOutlinedIcon className="icon"/>
                        <EmailOutlinedIcon className="icon"/>
                        <ExploreOutlinedIcon className="icon"/>
                        <FavoriteBorderIcon className="icon"/>
                        <span onClick={() => {
                            document.getElementById("navbarAvatarChange").click()
                        }} className="navbarAvatar">
                            <input id="navbarAvatarChange" onChange={(e) => {
                                if(e.target.files[0].size > 1000000){
                                    alert("File is too big! Maximun size 1MB");
                                    e.target.value = "";
                                    return
                                }

                                setState(e.target.files[0])

                                // var reader = new FileReader()
                                
                                // reader.readAsDataURL(e.target.files[0])
                                // reader.onload = function(){
                                //     setState(e.target.files[0])
                                // }

                            }} accept="image/*" type="file"></input>
                            <img alt="Instagram" src={user.photoURL === null ? state : statePromise }></img>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar