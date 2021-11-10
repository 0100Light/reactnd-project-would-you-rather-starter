import {Container, Heading} from "@chakra-ui/react";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useEffect} from "react";
import {_getQuestions} from "../_DATA";
import {fetchQuestions} from "../redux/voteSlice";

function Vote() {
    let dispatch = useAppDispatch()
    let loggedIn = useAppSelector(s => s.user.loggedIn)
    let questions = useAppSelector(s => s.vote.questions)

    useEffect(() => {
        _getQuestions().then((data) => {
            dispatch(fetchQuestions(data))
        })
    }, [])

    let qList = Object.entries(questions).map(([,v]) => { return v })

    return (
        !loggedIn ? <Navigate to="/"/> : (
            <Container minW="80vw">
                <Heading>Vote</Heading>
                <p>(show | hide) unanswered</p>
                <br/>

                { qList.map((q) => {
                    return <p key={q.id}>{ q.author }, { q.optionOne.text }, { q.optionOne.votes.length },
                        { q.optionTwo.text }, { q.optionTwo.votes.length }</p>
                })}

            </Container>
        )
    )
}

export default Vote