import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {signIn} from '../actions'
import {auth} from '../database/firebase'
import '../styles/Login.css'

function Login() {
    const [isLogin,changeIsLogin] = useState(false)
    const [loginState,setLoginState] = useState({email:'',passWd:''})
    const [registerState,setRegisterState] = useState({email:'',fullName:'',userName:'',passWd:''})
    const dispatch = useDispatch()

    const login = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(loginState.email,loginState.passWd).then((userAuth) => {
            dispatch(signIn(userAuth))
        }).catch((err) => {
            console.log(err)
        })
    }

    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(registerState.email,registerState.passWd).then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: registerState.userName
            }).then(() => {
                dispatch(signIn({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName
                }))
            })
        })
    }

    const registerForm = () => {
        return(
            <>
                <div className="mainLogin">
                    <div className="mainLoginForm">
                        <div className="mainLoginImage">
                            <img alt="Instagram" src={`${process.env.PUBLIC_URL}/images/instagram.svg`}></img>
                        </div>
                        <form onSubmit={register} className="loginform">
                            <input onChange={(e) => {
                                setRegisterState({...registerState,email:e.target.value})
                            }} placeholder="Mobile Number or Email" type="text"></input>
                            <input onChange={(e) => {
                                setRegisterState({...registerState,fullName:e.target.value})
                            }} placeholder="Full Name" type="text"></input>
                            <input onChange={(e) => {
                                setRegisterState({...registerState,userName:e.target.value})
                            }} placeholder="Username" type="text"></input>
                            <input onChange={(e) => {
                                setRegisterState({...registerState,passWd:e.target.value})
                            }} placeholder="Password" type="password"></input>
                            <button type="submit">Sign up</button>
                            <p>By signing up, you agree to our <strong>Terms</strong>, <strong>Data</strong> <strong>Policy</strong> and <strong>Cookies Policy</strong> .</p>
                        </form>
                    </div>
                    <div className="mainLoginForm">
                        <p>Have an account? <b onClick={() => {
                            changeIsLogin(true)
                        }}>Log in</b></p>
                    </div>
                </div>
            </>
        )
    }

    const loginForm = () => {
        return(
            <>
                <div className="mainLogin">
                    <div className="mainLoginForm">
                        <div className="mainLoginImage">
                            <img alt="Instagram" src={`${process.env.PUBLIC_URL}/images/instagram.svg`}></img>
                        </div>
                        <form onSubmit={login} className="loginform">
                            <input onChange={(e) => {
                                setLoginState({...loginState,email:e.target.value})
                            }} placeholder="Mobile Number or Email" type="text"></input>
                            <input onChange={(e) => {
                                setLoginState({...loginState,passWd:e.target.value})
                            }} placeholder="Password" type="password"></input>
                            <button type="submit">Log In</button>
                            <p>By logging up, you agree to our <strong>Terms</strong>, <strong>Data</strong> <strong>Policy</strong> and <strong>Cookies Policy</strong> .</p>
                        </form>
                    </div>
                    <div className="mainLoginForm">
                        <p>Have an account? <b onClick={() => {
                            changeIsLogin(false)
                        }}>Sign up</b></p>
                    </div>
                </div>
            </>
        )
    }

    return(
        <>
            {isLogin ? loginForm() : registerForm()}
        </>
    )
}

export default Login