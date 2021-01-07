import React,{useState} from 'react'
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {useSelector} from 'react-redux'
import {db} from '../database/firebase'
import '../styles/NewPost.css'

function NewPost(){
    const [state,setState] = useState({image:null,text:''})
    const user = useSelector(state => state.user)
    const element = document.getElementById("newImage")

    const newImageDiv = () => {

        return(
            <>
                <div className="newImageDiv">
                    <div className="inputImageDiv" onClick={() => {
                        document.getElementById("inputImage").click()
                    }}>
                        <AddIcon />
                        <h5>Upload image</h5>
                    </div>
                    <input id="inputImage" onChange={(e) => {
                        if(e.target.files[0].size > 1000000){
                            alert("File is too big! Maximun size 1MB");
                            e.target.value = "";
                            return
                        }

                        var reader = new FileReader()

                        element.style.display = "block"
                        
                        reader.readAsDataURL(e.target.files[0])
                        reader.onload = function(){
                            setState({...state,image:reader.result})
                        }

                    }} accept="image/*" type="file"></input>
                </div>
            </>
        )
    }

    const sendPost = () => {
        if(state.text !== '' && state.image !== null){
            db.collection('posts').add({
                image: state.image,
                description: state.text,
                comments: [],
                author: user,
                authorUID: user.email,
                timestamp: new Date(),
                likes: 0
            }).then(() => {
                setState({image:null,text:''})
                document.getElementById('textareNewPost').value = ""
            })
        }
    }

    return(
        <>
            <div className="newPostMain">
                <div className="newPostImageArea">
                    <img id="newImage" alt="" src={state.image}></img>
                    {state.image === null ? newImageDiv() : <DeleteOutlineIcon onClick={() => {
                        element.style.display = "none"
                        
                        setState({...state,image:null})
                    }} style={{ fontSize: 40 }} className="newPostDeleteImage" />}
                </div>
                <div className="newPostTextArea">
                    <textarea id="textareNewPost" onChange={(e) => {
                        setState({...state,text:e.target.value})
                    }} placeholder="Write something..."/>
                </div>
                <div className="newPostbttnArea">
                    <button onClick={() => {
                        sendPost()
                    }} className="newPostBttn">Post</button>
                </div>
            </div>
        </>
    )
}

export default NewPost

// function readURL(input) {
//     if (input.files && input.files[0]) {
//       var reader = new FileReader();
  
//     //   reader.addEventListener(
//     //     "load",
//     //     function() {
//     //       var avatarImg = new Image();
//     //       var src = reader.result;
//     //       avatarImg.src = src;
//     //       document.getElementById("dataUrl").innerText = src;
  
//     //       avatarImg.onload = function() {
//     //         var c = document.getElementById("myCanvas");
//     //         var ctx = c.getContext("2d");
//     //         ctx.canvas.width = avatarImg.width;
//     //         ctx.canvas.height = avatarImg.height;
            
//     //         ctx.drawImage(avatarImg, 0, 0);
//     //       };
//     //     },
//     //     false
//     //   );
  
//       reader.readAsDataURL(input.files[0]);
//     }
//   }