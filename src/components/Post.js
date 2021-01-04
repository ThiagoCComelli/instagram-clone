import React from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import '../styles/Post.css'

function Post({nome,idade}){

    return(
        <>
            <div className="postMain">
                <div className="postHeader">
                    <div className="postHeaderProfile">
                        <span className="postProfileImage">
                            <img alt="Instagram" src={`${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                        </span>
                        <strong>{nome}</strong>
                    </div>
                    <MoreHorizIcon />
                </div>
                <img alt="Post" src={`${process.env.PUBLIC_URL}/images/paisagem.jpeg`}></img>
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
                        <strong>899,743 views</strong>
                    </div>
                    <div className="postFullDesc">
                        <strong>{nome}</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam condimentum purus id bibendum pulvinar. Cras a viverra nisi. Phasellus purus nisl, rutrum ut elit sed, sollicitudin porttitor nisl.
                    </div>
                    <div className="postComments">
                        <span>View all comments</span>
                    </div>
                    <span>2 hours ago</span>
                </div>
                <div className="postAddComment">
                    <input placeholder="Add a comment..." />
                    {/* <DoneSharpIcon /> */}
                    <h5>Post</h5>
                </div>
            </div>
        </>
    )
}

export default Post