import React,{useEffect,useState} from 'react'
import {db} from '../database/firebase'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ModalConfig from './ModalConfig'
import firebase from 'firebase/app';
import PostItem from './PostItem'
import '../styles/Profile.css'

function Profile(props){
    const myUser = useSelector(state => state.user)
    const [user,setUser] = useState(null) 
    const [posts,setPosts] = useState([])
    const [config,setConfig] = useState(false)
    const history = useHistory()

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
            try{
                setUser(docSnap.docs[0].data())
            }catch{
                setUser({nickName: "User not find"})
            }
        })

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user !== null && user !== undefined && user.nickName !== "User not find"){
            db.collection('posts').where('authorUID','==',user.uid).orderBy('timestamp','desc').onSnapshot((docSnap) => {
                setPosts(docSnap.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    },[user])

    const SuccessFind = () => {
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
                                    <button><ArrowDropDownIcon /></button>
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
                            return <PostItem key={item.id} props={item} />
                        })}
                    </div>
                </div>
            </div>
            </>
        )
    }

    const ErrorFind = () => {
        return(
            <>
                <div className="mainError">
                    <h2>Sorry, this page isn't available.</h2>
                    <p>The link you followed may be broken, or the page may have been removed. <span onClick={() => {history.push("/")}}>Go back to Instagram</span>.</p>
                </div>
            </>
        )
    }

    if(user === null || user === undefined){
        return null
    }

    return(
        <>
        {user.nickName === 'User not find' ? ErrorFind() : SuccessFind()}
        </>
    )
}

export default Profile