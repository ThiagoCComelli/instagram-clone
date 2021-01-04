import '../styles/App.css';
import React,{useEffect} from 'react'
import Navbar from './Navbar'
import Contents from './Contents'
import Login from './Login'
import {useSelector,useDispatch} from 'react-redux'
import {signIn,signOut} from '../actions'
import {auth} from '../database/firebase';

function App() {
  const isLogged = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth){
        dispatch(signIn(userAuth))
      } else {
        dispatch(signOut())
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
        </>
        ) : <Login />}
    </>
  );
}

export default App;
