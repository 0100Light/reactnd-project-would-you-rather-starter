import React from "react";
import {Flex, Heading, Spacer} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {logoutUser} from "../redux/userSlice";

function Navbar() {
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    let loggedIn = useAppSelector(s => s.user.loggedIn)
    let loggedInUser = useAppSelector(s => s.user.loginUser)

    let handleLogoutUser = () => {
        dispatch(logoutUser())
        navigate("/")
    }
    return <div>
        <Flex p={5} mx={3} align={"center"}>
            <Heading m={3}>Would You Rather</Heading>
            { !loggedIn ? <Link to={"/"}>[ Login ] &nbsp;</Link> : null }
            <Link to={"/vote"}>[ Vote ] &nbsp;</Link>
            <Link to={"/leaderboard"}>[ Leaderboard ]</Link>

            <Spacer/>
            { loggedInUser !== undefined ?
                <p>Welcome, {loggedInUser.name} &nbsp;</p> : null}

            <p onClick={() => handleLogoutUser() }>[ Logout ]</p>
        </Flex>
    </div>
}

export default Navbar