import React,{useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import firebase from 'firebase/app';
import {useSelector,useDispatch} from 'react-redux'
import {db} from '../database/firebase'
import {removePost} from '../actions/index'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import CloseIcon from '@material-ui/icons/Close';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import '../styles/Modal.css'

function CommentItem({props}){
    return(
        <>
        <div className="modalCommentItem">
            <div className="modalCommentDivImage">
                <span className="modalCommentItemImage">
                    <img alt="" src={props.author.photoURL}></img>
                </span>
            </div>
            <div className="modalCommentDivComment">
                <p><strong>{props.author.displayName}</strong> {props.message}</p>
            </div>
        </div>
        </>
    )
}

function Modal({props}){
    const user = useSelector(state => state.user)
    const [message,setMessage] = useState("")
    const dispatch = useDispatch()

    return(
        <>
        <div className="modalMain">
            <CloseIcon className="modalClose" style={{ fontSize: 50, color: "#fff" }} onClick={() => {
                dispatch(removePost())
            }} />
            <div className="modalPost">
                <div className="modalImage">
                    <img alt="" src={props.data.image}></img>
                </div>
                <div className="modalInfos">
                    <div className="modalProfile">
                        <div className="modalHeaderProfile">
                            <span className="modalProfileImage">
                                <img alt="Instagram" src={props.data.author.photoURL !== null ? props.data.author.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                            </span>
                            <strong>{props.data.author.displayName}</strong>
                        </div>
                        <MoreHorizIcon />
                    </div>
                    <div className="modalComments">
                        {props.data.comments.map((item) => {
                            return <CommentItem key={item.uid} props={item} />
                        })}
                    </div>
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
                    <div className="modalViews">
                        <strong>{props.data.likes} likes</strong>
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
            </div>
        </div>
        </>
    )
}

export default Modal