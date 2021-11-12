import {useAppSelector} from "../redux/hooks";
import {Navigate} from "react-router-dom";
import {Heading} from "@chakra-ui/react";

function Leaderboard() {
    let loggedIn = useAppSelector(s => s.user.loggedIn)
    let users = useAppSelector(s => s.user.getUsers)
    let questions = useAppSelector(s => s.vote.questions)

    return (
        !loggedIn ? <Navigate to={"/"}/> :
            <div>
                <Heading>Leaderboard</Heading>

            </div>
    )
}

export default Leaderboard