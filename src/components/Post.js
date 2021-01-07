import {v4 as uuidv4} from 'uuid'
import firebase from 'firebase/app';
import React,{forwardRef,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {putPost} from '../actions/index'
import {db} from '../database/firebase'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import '../styles/Post.css'

function CommentItem({props}){
    return(
        <>
        <div key={props.uid} className="postCommentItem">
            <strong>{props.author.displayName}</strong> {props.message}
        </div>
        </>
    )
}

const Post = forwardRef(({props}, ref) => {
    const user = useSelector(state => state.user)
    const [message,setMessage] = useState("")
    const dispatch = useDispatch()

    return(
        <>
            <div ref={ref} className="postMain">
                <div className="postHeader">
                    <div className="postHeaderProfile">
                        <span className="postProfileImage borderColored">
                            <img alt="Instagram" src={props.data.author.photoURL !== null ? props.data.author.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                        </span>
                        <strong>{props.data.author.displayName}</strong>
                    </div>
                    <MoreHorizIcon />
                </div>
                <img alt="Post" src={props.data.image}></img>
                <div className="postButtons">
                    <div className="postBttnLeft">
                        <FavoriteBorderOutlinedIcon onClick={() => {
                            db.collection('posts').doc(props.id).update({
                                likes: firebase.firestore.FieldValue.increment(1)
                            })
                        }} className="icon" style={{ fontSize: 30 }} />
                        <EmailOutlinedIcon className="icon" style={{ fontSize: 30 }} />
                        <SendOutlinedIcon className="icon" style={{ fontSize: 30 }} />
                    </div>
                    <div className="postBttnRight">
                        <BookmarkBorderSharpIcon className="icon" style={{ fontSize: 30 }} />
                    </div>
                </div>
                <div className="postDesc">
                    <div className="postViews">
                        <strong>{props.data.likes} likes</strong>
                    </div>
                    <div className="postFullDesc">
                        <strong>{props.data.author.displayName}</strong> {props.data.description}
                    </div>
                    <div className="postComments">
                        <span onClick={() => {
                            dispatch(putPost(props))
                        }}>View all {props.data.comments.length} comments</span>
                    </div>
                    {(props.data.comments.slice(0,(props.data.comments.length > 2 ? 2 : props.data.comments.length))).map((item) => {
                        return <CommentItem key={item.uid} props={item} />
                    })}
                    <span>{`${props.data.timestamp.toDate()}`}</span>
                </div>
                <div className="postAddComment">
                    <input onChange={(e) => {
                        setMessage(e.target.value)
                    }} id="inputComment" placeholder="Add a comment..." />
                    <h5 onClick={(e) => {
                        if(message !== ""){
                            db.collection('posts').doc(props.id).update({
                                comments: firebase.firestore.FieldValue.arrayUnion({uid:uuidv4(),message:message,author:user})
                            })
                            setMessage("")
                            e.target.parentNode.firstChild.value = ""
                        }
                    }}>Post</h5>
                </div>
            </div>
        </>
    )
})

export default Post