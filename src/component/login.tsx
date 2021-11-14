import React from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {loadUsers, loginWithUser} from "../redux/userSlice";
import {_getUsers} from "../_DATA";
import {Container, Heading} from "@chakra-ui/react";
import User from "../types/User";
import {Navigate, useNavigate} from "react-router-dom";
import LoginUserBox from "./loginUserBox";

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
            <Container minW="70vw" p={5}>
                <Heading>Login</Heading>
                <p>click on one of the users to login</p>
                <br/>
                { Object.values(loadedUsers) ? Object.values(loadedUsers).map(u => {
                    return <div key={u.id} onClick={ () => handleLoginWithUser(u) }>
                        <LoginUserBox loginUser={u}/>
                    </div>
                }) : null }
            </Container>
        </div>
    )
}


export default Login