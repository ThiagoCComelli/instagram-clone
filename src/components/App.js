import '../styles/App.css';
import React,{useEffect} from 'react'
import Navbar from './Navbar'
import Contents from './Contents'
import Modal from './Modal'
import Login from './Login'
import {useSelector,useDispatch} from 'react-redux'
import {signIn,signOut} from '../actions'
import {auth} from '../database/firebase';

function App() {
  const isLogged = useSelector(state => state.user)
  const havePost = useSelector(state => state.post)
  const dispatch = useDispatch()
  
  useEffect(() => {
    
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth){
        dispatch(signIn({
          uid: userAuth.providerData[0].uid,
          displayName: userAuth.providerData[0].displayName,
            photoURL: userAuth.providerData[0].photoURL,
            email: userAuth.providerData[0].email
          }))
        } else {
        dispatch(signOut())
      }
    })

    window.addEventListener('scroll', function() {
      // console.log(window.innerHeight + window.scrollY)
      // console.log(document.body.offsetHeight)
      const element = document.getElementById("contentsNews_")
      
      if(element !== null){
        element.style.top = `${window.scrollY}px`
      }


      if ((window.innerHeight + window.scrollY - 60) >= document.body.offsetHeight) {
         console.log("you're at the bottom of the page");
      }
   })

    // eslint-disable-next-line
  }, [])

  return (
    <>
      {isLogged ? (
        <>
          <Navbar />
          <Contents />
          {havePost ? <Modal props={havePost} /> : null}
        </>
        ) : <Login />}
    </>
  );
}

export default App;
