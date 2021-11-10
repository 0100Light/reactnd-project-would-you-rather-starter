import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {loadUsers, loginWithUser} from "../redux/userSlice";
import {_getUsers} from "../_DATA";
import {Container, Heading} from "@chakra-ui/react";
import User from "../types/User";
import {Navigate, useNavigate} from "react-router-dom";

function Login() {
    let dispatch = useAppDispatch()
    let loadedUsers = useAppSelector(state => state.user.getUsers)
    let navigate = useNavigate()


    // https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
    // empty dependency: same effect as ComponentDidMount
    // dependency(+): when the value updates, the function will be run again, same effect as ComponentDidUpdate
    useEffect(()=> {
        _getUsers().then(data => {
            dispatch(loadUsers(data))
        })
    }, [])

    let handleLoginWithUser = (user:User) => {
        console.log("LIW", user.id)
        dispatch(loginWithUser(user))
        navigate("/vote")
    }

    // let loginRedirect = () => {
    //     let loggedIn = useAppSelector(state => state.user.loggedIn)
    //     return loggedIn ? <Redirect path="/vote"/>
    // }


    let loggedIn = useAppSelector(state => state.user.loggedIn)

    return (
        loggedIn ? <Navigate to="/vote" /> :
        <div>
            <Container bg="#eeeeee" minW="70vw" p={5}>
                <Heading>Login Page</Heading>
                <p>click to login</p>
                <br/>
                { loadedUsers ? loadedUsers.map(u => {
                    return <p onClick={ () => handleLoginWithUser(u)} key={u.id}>{u.name}, {u.avatarURL}</p>
                }) : null }
            </Container>
        </div>
    )
}


export default Login