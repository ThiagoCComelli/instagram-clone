import React,{useEffect,useState} from 'react'
import {db} from '../database/firebase'
import {useDispatch,useSelector} from 'react-redux'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {putPost} from '../actions/index'
import ModalConfig from './ModalConfig'
import firebase from 'firebase/app';
import '../styles/Profile.css'

function Profile(props){
    const myUser = useSelector(state => state.user)
    const [user,setUser] = useState(null) 
    const [posts,setPosts] = useState([])
    const [config,setConfig] = useState(false)
    const dispatch = useDispatch()

    const postItem = (props) => {
        return(
            <div key={props.id} onClick={() => {
                dispatch(putPost(props))
            }} className="mainProfilePostItem">
                <span className="mainProfilePostItemImage">
                    <img alt="" src={props.data.image}></img>
                    <div className="mainProfileMiniInfos">
                        <div>
                            <FavoriteIcon style={{color: "white"}}/>
                            <p>{props.data.likes}</p>
                        </div>
                        <div>
                            <ChatBubbleIcon style={{color: "white"}}/>
                            <p>{props.data.comments.length}</p>
                        </div>
                    </div>
                </span>
            </div>
        )
    }

    const addUser = (uid) => {
        db.collection('users').doc(myUser.uid).update({
            following: firebase.firestore.FieldValue.arrayUnion({uid:uid})
        })
        db.collection('users').doc(uid).update({
            followers: firebase.firestore.FieldValue.arrayUnion({uid:myUser.uid})
        })
    }

    useEffect(() => {
        db.collection('users').where('nickName','==',props.match.params.uid).onSnapshot((docSnap) => {
            setUser(docSnap.docs[0].data())
        })

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user !== null && user !== undefined){
            db.collection('posts').where('authorUID','==',user.uid).orderBy('timestamp','desc').onSnapshot((docSnap) => {
                setPosts(docSnap.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    },[user])

    if(user === null || user === undefined){
        return null
    } else {
        
    }

    return(
        <>
        {config ? <ModalConfig setConfig={setConfig} /> : null}
        <div className="mainProfile">
            <div className="mainProfileContent">
                <div className="mainProfileInfos">
                    <span className="mainProfileImage">
                        <img alt="" src={user.photoURL !== null ? user.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                    </span>
                    <div className="mainProfileInfosDesc">
                        <div className="mainProfileTitle">
                            <h2>{user.nickName}</h2>
                            <div className="profileInfosButton">
                                {myUser.nickName === props.match.params.uid ? null : (
                                    <>
                                        <button onClick={() => {addUser(user.uid)}}><PersonAddIcon /></button>
                                        <button>Message</button>
                                    </>
                                )}
                                <button onClick={async () => {
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
                                    }
                                    
                                }}><ArrowDropDownIcon /></button>
                                {myUser.email === user.email ? <MoreHorizIcon onClick={() => {
                                    setConfig(true)
                                }} className="icon" /> : null}
                            </div>
                        </div>
                        <div className="mainProfileNumbers">
                            <p><strong>{posts.length}</strong> <span>posts</span></p>
                            <p><strong>{user.followers.length}</strong> <span>followers</span></p>
                            <p><strong>{user.following.length}</strong> <span>following</span></p>
                        </div>
                        <div className="mainProfileDesc">
                            <strong>{user.fullName}</strong>
                            <p>{user.description}</p>
                        </div>
                    </div>
                </div>
                <div className="mainProfilePosts">
                    {posts.map((item) => {
                        return postItem(item)
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile