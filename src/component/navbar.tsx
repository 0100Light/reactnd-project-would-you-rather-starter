import React from "react";
import {Flex, Heading} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/hooks";
import {logoutUser} from "../redux/userSlice";

function Navbar() {
    let dispatch = useAppDispatch()
    let navigate = useNavigate()

    let handleLogoutUser = () => {
        dispatch(logoutUser())
        navigate("/")
    }
    return <div>
        <Flex p={5}>
            <Heading>Would U Rather</Heading>
            <Link to={"/"}>[ Login ]</Link>
            <Link to={"/vote"}>[ Vote ]</Link>
            <Link to={"/leaderboard"}>[ Leaderboard ]</Link>
            <p onClick={() => handleLogoutUser() }>[ Logout ]</p>
        </Flex>
    </div>
}

export default Navbar