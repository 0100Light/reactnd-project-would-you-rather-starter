import {useAppSelector} from "../redux/hooks";
import {Navigate} from "react-router-dom";
import {Container, Heading} from "@chakra-ui/react";
import LeaderboardBox from "./leaderboardBox";

function Leaderboard() {
    let loggedIn = useAppSelector(s => s.user.loggedIn)
    let users = useAppSelector(s => s.user.users)

    return (
        !loggedIn ? <Navigate to={"/"}/> :
            <Container minW="80vw">
                <Heading>Leaderboard</Heading>
                {
                    Object.values(users).sort((a => Object.keys(a.answers).length + a.questions.length)).map(u => {
                        return <LeaderboardBox key={u.id} userData={u}/>
                    })
                }
            </Container>
    )
}

export default Leaderboard