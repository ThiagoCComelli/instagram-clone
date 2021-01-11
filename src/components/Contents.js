import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Post from './Post'
import NewPost from './NewPost'
import '../styles/Contents.css'
import {useSelector} from 'react-redux'
import {auth,db} from '../database/firebase'
import FlipMove from 'react-flip-move'

function Contents(){
    const user = useSelector(state => state.user)
    const [posts,setPosts] = useState([])
    const history = useHistory()

    useEffect(() => {
        db.collection('posts').where('authorUID','in',[...user.following.map((item) => {return item.uid}),user.uid]).orderBy('timestamp','desc').onSnapshot((docSnap) => {
            setPosts(docSnap.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        // eslint-disable-next-line
    }, [])

    return(
        <>
            <div className="contentsMain">
                <div className="contentsPosts">
                    <NewPost />
                    <FlipMove>
                        {posts.map((post) => {
                            return <Post key={post.id} props={post}/>
                        })}
                    </FlipMove>
                </div>
                <div id="contentsNews_" className="contentsNews">
                    <div className="contentsNewsProfile">
                        <div className="contentsNewsProfileImage">
                            <img className="icon" onClick={() => {
                                history.push(`/profile/${user.nickName}`)
                            }} alt="Instagram" src={user.photoURL !== null ? user.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                        </div>
                        <div className="contentsNewsProfileInfo">
                            <strong className="icon" onClick={() => {
                                history.push(`/profile/${user.nickName}`)
                            }}>{user.nickName}</strong>
                            <span>{user.email}</span>
                        </div>
                        <h5 onClick={() => {
                            auth.signOut()
                            localStorage.setItem('permission','')
                        }}>Logout</h5>
                    </div>
                    <div className="websiteFooter">
                        <span>About &#183; Help &#183; Press &#183; API &#183; Jobs &#183; Privacy &#183; Terms &#183; Locations &#183; Top Accounts &#183; Hashtags &#183; Language</span>
                        <span>&#169; 2021 INSTAGRAM CLONE BY THIAGO COMELLI</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contents