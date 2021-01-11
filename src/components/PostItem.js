import React from 'react';
import {putPost} from '../actions/index'
import {useDispatch} from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const PostItem = ({props}) => {
    const dispatch = useDispatch()

    return (
        <>
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
        </>
    );
}

export default PostItem;
