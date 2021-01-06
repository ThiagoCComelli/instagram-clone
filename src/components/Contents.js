import React,{useState,useEffect} from 'react'
import Post from './Post'
import NewPost from './NewPost'
import '../styles/Contents.css'
import {useSelector} from 'react-redux'
import {auth,db} from '../database/firebase'
import FlipMove from 'react-flip-move'

function Contents(){
    const user = useSelector(state => state.user)
    const [posts,setPosts] = useState([])

    useEffect(() => {
        db.collection('posts').orderBy('timestamp','desc').onSnapshot((docSnap) => {
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
                <div className="contentsNews">
                    <div className="contentsNewsProfile">
                        <div className="contentsNewsProfileImage">
                            <img alt="Instagram" src={user.photoURL !== null ? user.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                        </div>
                        <div className="contentsNewsProfileInfo">
                            <strong>{user.displayName}</strong>
                            <span>{user.email}</span>
                        </div>
                        <h5 onClick={() => {
                            auth.signOut()
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