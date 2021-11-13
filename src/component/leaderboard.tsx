import {useAppSelector} from "../redux/hooks";
import {Navigate} from "react-router-dom";
import {Container, Heading} from "@chakra-ui/react";

function Leaderboard() {
    let loggedIn = useAppSelector(s => s.user.loggedIn)
    let users = useAppSelector(s => s.user.users)

    return (
        !loggedIn ? <Navigate to={"/"}/> :
            <Container minW="80vw">
                <Heading>Leaderboard</Heading>
                {
                    Object.values(users).sort((a => Object.keys(a.answers).length + a.questions.length)).map(u => {
                        console.log(u.id)
                        let ansCount = Object.keys(u.answers).length
                        return <p>{u.name}, {u.avatarURL}, ANS: { ansCount }, ASK: {u.questions.length},
                            POINTS: { ansCount + u.questions.length}</p>
                    })
                }
            </Container>
    )
}

export default Leaderboard