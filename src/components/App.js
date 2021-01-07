import '../styles/App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React,{useEffect} from 'react'
import Navbar from './Navbar'
import Contents from './Contents'
import Modal from './Modal'
import Login from './Login'
import Profile from './Profile'
import {useSelector,useDispatch} from 'react-redux'
import {signIn,signOut} from '../actions'
import {auth,db} from '../database/firebase';

function App() {
  const isLogged = useSelector(state => state.user)
  const havePost = useSelector(state => state.post)
  const dispatch = useDispatch()
  
  useEffect(() => {
    
    auth.onAuthStateChanged(async (userAuth) => {
      if(userAuth !== null) {
        const userRef = await db.collection('users').doc(userAuth.providerData[0].uid).get()

        dispatch(signIn(userRef.data()))
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
    <Router>
      <Switch>
        {isLogged ? (
          <>
            <Navbar />
            <Route path="/" exact component={Contents}/>
            <Route path="/profile/:uid" exact component={Profile}/>
            {havePost ? <Modal props={havePost} /> : null}
          </>
          ) : <Login />}
      </Switch>
    </Router>
    </>
  );
}

export default App;
