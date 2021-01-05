import React,{forwardRef} from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import '../styles/Post.css'

const Post = forwardRef(({props}, ref) => {

    return(
        <>
            <div ref={ref} className="postMain">
                <div className="postHeader">
                    <div className="postHeaderProfile">
                        <span className="postProfileImage">
                            <img alt="Instagram" src={`${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                        </span>
                        <strong>{props.data.author.displayName}</strong>
                    </div>
                    <MoreHorizIcon />
                </div>
                <img alt="Post" src={props.data.image}></img>
                <div className="postButtons">
                    <div className="postBttnLeft">
                        <FavoriteBorderOutlinedIcon className="icon" style={{ fontSize: 30 }} />
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
                        <span>View all comments</span>
                    </div>
                    <span>{`${props.data.timestamp.toDate()}`}</span>
                </div>
                <div className="postAddComment">
                    <input placeholder="Add a comment..." />
                    {/* <DoneSharpIcon /> */}
                    <h5>Post</h5>
                </div>
            </div>
        </>
    )
})

export default Post