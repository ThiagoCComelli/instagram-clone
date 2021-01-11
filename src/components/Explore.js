import React,{useState,useEffect} from 'react';
import {db} from '../database/firebase'
import {useSelector} from 'react-redux'
import PostItem from './PostItem'
import '../styles/Explore.css'

const Explore = () => {
    const [posts,setPosts] = useState([])
    const user = useSelector(state => state.user)

    useEffect(() => {
        db.collection('posts').where('authorUID','not-in',[...user.following.map((item) => {return item.uid}),user.uid]).get().then((docs) => {
            setPosts(docs.docs.map((doc) => {return {data:doc.data(),id:doc.id}}))
        })
        // eslint-disable-next-line
    },[])

    return (
        <>
        <div className="mainExplore">
            <div className="mainExploreBox">
                {posts.map((post) => {
                    return <PostItem key={post.id} props={post} />
                })}
            </div>
        </div>
        </>
    )
}

export default Explore;
