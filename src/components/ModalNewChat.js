import React,{useEffect,useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import firebase from 'firebase/app'
import {useSelector} from 'react-redux'
import {db} from '../database/firebase'

import '../styles/ModalNewChat.css'

const NewChatItem = ({props,setChat,setState}) => {
    const [user,setUser] = useState(null)
    const myUser = useSelector(state => state.user)

    const newChat = async () => {
        var exist = await db.collection('users').doc(myUser.uid).get().then((doc) => {
            return doc.data().chats.some((item) => {
                return item.with === user.uid
            })
        })
        
        if(!exist){
            let newChat = await db.collection('chats').add({
                users:[myUser.uid,user.uid],
                messages:[]
            })
            
            db.collection('users').doc(myUser.uid).update({
                chats: firebase.firestore.FieldValue.arrayUnion({
                    chatId: newChat.id,
                    title: user.nickName,
                    with: user.uid
                })
            })

            db.collection('users').doc(user.uid).update({
                chats: firebase.firestore.FieldValue.arrayUnion({
                    chatId: newChat.id,
                    title: myUser.nickName,
                    with: myUser.uid
                })
            })
            
            setChat({chat:{with:user.uid,chatId:newChat.id,title:user.nickName},user:user})
        }
        setState(false)
    }

    useEffect(() => {
        db.collection('users').doc(props.uid).get().then((doc) => {
            setUser(doc.data())
        })
        // eslint-disable-next-line
    },[])

    return (
        <>
        <div onClick={() => {newChat()}} className="chatItem">
            <div className="chatItemContent">
                <span className="chatItemImage">
                <img alt="" src={user !== null ? (user.photoURL !== null ? user.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`) : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                </span>
                <div className="chatItemDesc">
                    <span>{user !== null ? user.nickName : ''}</span>
                    <span>{user !== null ? user.fullName : ''}</span>
                </div>
            </div>
        </div>
        </>
    )
}

const ModalNewChat = ({setState,user,setChat}) => {
    return (
        <>
        <div className="mainModalNewChat">
            <CloseIcon className="modalClose" style={{ fontSize: 50, color: "#fff" }} onClick={() => {setState(false)}} />
            <div className="mainModalNewChatBox">
                <div className="modalNewChat">
                    <CloseIcon className="icon" style={{ position: "absolute", left: 10 }} onClick={() => {setState(false)}} />
                    <h3>New Message</h3>
                </div>
                <div className="modalNewChatUsers">
                    <h4>Users Following</h4>
                    {user.following.map((user_) => {
                        return <NewChatItem key={user_.uid} setChat={setChat} props={user_} setState={setState}/>
                    })}
                </div>
            </div>
        </div>
        </>
    );
}

export default ModalNewChat;
