import React,{useState,useEffect,forwardRef} from 'react';
import {useSelector} from 'react-redux'
import {db} from '../database/firebase'
import firebase from 'firebase/app'
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import CreateIcon from '@material-ui/icons/Create';
import FlipMove from 'react-flip-move'
import ModalNewChat from './ModalNewChat'

import '../styles/Messages.css'

const MessagesChat = ({setChat,props}) => {
    const [chatUser,setChatUser] = useState(null)
    const [lastMessage,setLastMessage] = useState("")

    useEffect(() => {
        const getUser = () => {
            db.collection('users').doc(props.with).get().then((user) => {
                setChatUser(user.data())
            })
            db.collection('chats').doc(props.chatId).get().then((doc) => {
                try{
                    setLastMessage(doc.data().messages[doc.data().messages.length-1].message)
                }catch{

                }
            })
        }

        getUser()
        // eslint-disable-next-line 
    },[])

    return (
        <div onClick={() => {
            setChat({chat:props,user:chatUser})
        }} className="chatItem">
            <div className="chatItemContent">
                <span className="chatItemImage">
                    <img alt="" src={chatUser !== null ? (chatUser.photoURL !== null ? chatUser.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`) : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                </span>
                <div className="chatItemDesc">
                    <span>{props.title}</span>
                    <span>{lastMessage.length >= 30 ? `${lastMessage.substring(0,30)}...` : lastMessage}</span>
                </div>
            </div>
        </div>
    );
}

const MessagesItem = forwardRef(({user,props},ref) => {
    return (
        <>
        <div ref={ref} style={{"justifyContent": `${props.sender === user.uid ? "right" : "left"}`}} className="mainMessageItem">
            <div style={{"backgroundColor": `${props.sender === user.uid ? "#EFEFEF" : "#FFF"}`}} className="mainMessageItemContent">
                <p>{props.message}</p>
            </div>
        </div>
        </>
    )
})

const ChatDisplay = ({actualState,props}) => {
    const [messages,setMessages] = useState([])
    // eslint-disable-next-line
    const [message, setMessage] = useState("");
    const user = useSelector(state => state.user)

    const send = (e) => {
        if(e.key === 'Enter'){
            db.collection('chats').doc(props.chat.chatId).update({
                messages: firebase.firestore.FieldValue.arrayUnion({sender:user.uid,message:e.target.value,timestamp: new Date()})
            }).then(() => {
                e.target.value = ""
            })
        }
    }

    useEffect(() => {
        const getMessages = () => {
            db.collection('chats').doc(props.chat.chatId).onSnapshot((docSnap) => {
                setMessages(docSnap.data().messages)
                var element = document.getElementById("messagesDisplay")
                element.scrollTo(0,element.scrollHeight)
            })
        }

        getMessages()
        // eslint-disable-next-line
    },[actualState])

    return (
        <div className="mainChatDisplay">
            <div className="mainChatDesc">
                <div className="mainChatDescImageDiv">
                    <span className="mainChatDescImage">
                        <img alt="" src={props.user !== null ? (props.user.photoURL !== null ? props.user.photoURL : `${process.env.PUBLIC_URL}/images/person-icon.png`) : `${process.env.PUBLIC_URL}/images/person-icon.png`}></img>
                    </span>
                    <div className="mainChatDescName">
                        <h4>{props.chat.title}</h4>
                        <span>{props.user.email}</span>
                    </div>
                </div>
            </div>
            <div id="messagesDisplay" className="mainChatMessages">
                <FlipMove>
                    {messages.map((messageItem) => {
                        return <MessagesItem key={messageItem.timestamp.seconds} user={user} props={messageItem} />
                    })}
                </FlipMove>
            </div>
            <div className="mainChatInput">
                <input onChange={(e) => {
                    setMessage(e.target.value)
                }} placeholder="Message..." type="text" onKeyDown={(e) => {send(e)}}></input>
            </div>
        </div>
    );
}

const DefaultDisplay = ({setState}) => {
    return (
        <>
        <div className="mainDefaultDisplay">
            <div className="mainDefaultDisplayIcon">
                {/* <TelegramIcon style={{ fontSize: 100 }} /> */}
            </div>
            <h2>Your Messages</h2>
            <span>Send private photos and messages to a friend or group.</span>
            <button onClick={() => {setState(true)}}>Send Message</button>
        </div>
        </>
    )
}

const Messages = () => {
    const user = useSelector(state => state.user)
    const [actualChat,setChat] = useState({chat:null,user:null})
    const [state,setState] = useState(false)
    const [allChats,setChats] = useState([]) 

    useEffect(() => {
        db.collection('users').doc(user.uid).onSnapshot((docSnap) => {
            setChats(docSnap.data().chats)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <>
        {state ? <ModalNewChat user={user} setState={setState} setChat={setChat}/> : null}
        <div className="mainMessages">
            <div className="mainMessagesContents">
                <div className="mainMessagesChats">
                    <div className="mainMessagesNewChats">
                        <h4>{user.nickName}</h4>
                        <ExpandMoreSharpIcon />
                        <CreateIcon onClick={() => {setState(true)}} className="icon" style={{fontSize: 20, position: "absolute", right: 20}} />
                    </div>
                    <div className="mainMessagesAllChats">
                        {allChats.map((chat) => {
                            return <MessagesChat key={chat.chatId} stateChat={actualChat} setChat={setChat} props={chat}/>
                        })}
                    </div>
                </div>
                <div className="mainMessagesDisplay">
                    {actualChat.chat ? <ChatDisplay actualState={actualChat.chat.chatId} props={actualChat}/> : <DefaultDisplay setState={setState}/>}
                </div>
            </div>
        </div>
        </>
    );
}

export default Messages;
