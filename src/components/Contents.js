import React,{useState,useEffect} from 'react'
import Post from './Post'
import '../styles/Contents.css'
import { auth } from '../database/firebase'

function Contents(){
    const [posts,setPosts] = useState([])

    useEffect(() => {
        setPosts([...posts,{nome:'Thiago Comelli',idade:20,uid:0},{nome:'Outro Nome',idade:21,uid:1}])
        // eslint-disable-next-line
    }, [])

    return(
        <>
            <div className="contentsMain">
                <div className="contentsPosts">
                    {posts.map((post) => {
                        return <Post key={post.uid} nome={post.nome} idade={post.idade}/>
                    })}
                </div>
                <div className="contentsNews">
                    <div className="contentsNewsProfile">
                        <div className="contentsNewsProfileImage">
                            <img alt="Instagram" src={`${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                        </div>
                        <div className="contentsNewsProfileInfo">
                            <strong>thiagocomelli_</strong>
                            <span>Thiago Comelli</span>
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