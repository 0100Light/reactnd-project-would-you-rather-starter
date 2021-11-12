import React from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {loadUsers, loginWithUser} from "../redux/userSlice";
import {_getUsers} from "../_DATA";
import {Container, Heading} from "@chakra-ui/react";
import User from "../types/User";
import {Navigate, useNavigate} from "react-router-dom";

function Login() {
    let dispatch = useAppDispatch()
    let loadedUsers = useAppSelector(state => state.user.users)
    let navigate = useNavigate()


    let shouldFetchUsers = useAppSelector(s => s.user.shouldFetchUsers)
    if (shouldFetchUsers) {
        _getUsers().then(data => {
            dispatch(loadUsers(data))
        })
    }

    let handleLoginWithUser = (user:User) => {
        dispatch(loginWithUser(user))
        navigate("/vote")
    }

    let loggedIn = useAppSelector(state => state.user.loggedIn)

    return (
        loggedIn ? <Navigate to="/vote" /> :
        <div>
            <Container bg="#eeeeee" minW="70vw" p={5}>
                <Heading>Login Page</Heading>
                <p>click to login</p>
                <br/>
                { Object.values(loadedUsers) ? Object.values(loadedUsers).map(u => {
                    return <p onClick={ () => handleLoginWithUser(u)} key={u.id}>{u.name}, {u.avatarURL}</p>
                }) : null }
            </Container>
        </div>
    )
}


export default Login