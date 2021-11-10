import {Container, Heading} from "@chakra-ui/react";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useEffect} from "react";
import {_getQuestions} from "../_DATA";
import {fetchQuestions} from "../redux/voteSlice";
import Question from "../types/Question";

function Vote() {
    let dispatch = useAppDispatch()
    let loggedIn = useAppSelector(s => s.user.loggedIn)
    let questions = useAppSelector(s => s.vote.questions)
    let navigate = useNavigate()

    useEffect(() => {
        _getQuestions().then((data) => {
            dispatch(fetchQuestions(data))
        })
    }, [])

    let qList = Object.entries(questions).map(([, v]) => {
        return v
    })

    let handleQuestionDetailClick = (q:Question) => {
        navigate("/voteDetail/" + q.id)
    }

    return (
        !loggedIn ? <Navigate to="/"/> : (
            <Container minW="80vw">
                <Heading>Vote</Heading>
                <p>(show | hide) unanswered</p>
                <br/>

                {qList.map((q) => {
                    return <div key={q.id} onClick={ () => { handleQuestionDetailClick(q) }}>
                        <p>{ q.author }</p>
                        <p>{q.optionOne.text}, {q.optionOne.votes.length}, {q.optionTwo.text}, {q.optionTwo.votes.length}</p>
                        <br/>
                    </div>
                })}

            </Container>
        )
    )
}

export default Vote