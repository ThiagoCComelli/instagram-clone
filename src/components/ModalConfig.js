import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import {storage,db,auth} from '../database/firebase'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import '../styles/ModalConfig.css'

function ModalConfig({setConfig}){
    const [description,changeDescription] = useState('')
    const user = useSelector(state => state.user)

    return(
        <>
        <div className="mainModalConfig">
            <CloseIcon className="modalClose" style={{ fontSize: 50, color: "#fff" }} onClick={() => {
                setConfig(false)
            }} />
            <div className="mainModalConfigDiv">
                <div onClick={() => {
                    document.getElementById("navbarAvatarChange").click()
                }} className="mainModalConfigImage icon">
                    <AddIcon />
                    <h5>Change Avatar</h5>
                    <input id="navbarAvatarChange" onChange={(e) => {
                        try{
                            if(e.target.files[0].size > 1000000){
                                alert("File is too big! Maximun size 1MB");
                                e.target.value = "";
                                return
                            }
    
                            storage.ref().child(`avatarImages/${user.uid}`).put(e.target.files[0]).then(async (url) => {
                                alert("Profile avatar uploaded!")
                                const url_ = await url.ref.getDownloadURL()

                                auth.currentUser.updateProfile({
                                    photoURL: url_
                                })
                                db.collection('users').doc(user.uid).update({
                                    photoURL: url_
                                })
                            })
                        }catch{

                        }

                    }} accept="image/*" type="file"></input>
                </div>
                <div className="mainModalConfigDesc">
                    <p>Change profile description:</p>
                    <textarea maxLength="144" onChange={(e) => {
                        changeDescription(e.target.value)
                    }}>{user.description}</textarea>
                </div>
                <button onClick={() => {
                    db.collection('users').doc(user.uid).update({description:description})
                    setConfig(false)
                }}>Submit</button>
            </div>
        </div>
        </>
    )
}

export default ModalConfig