import {Container, Heading} from "@chakra-ui/react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {_getQuestions} from "../_DATA";
import {changeVisibility, fetchQuestions} from "../redux/voteSlice";
import Question from "../types/Question";

function Vote() {
    let dispatch = useAppDispatch()
    let loggedIn = useAppSelector(s => s.user.loggedIn)
    let questions = useAppSelector(s => s.vote.questions)
    let navigate = useNavigate()
    let displayedQuestions = useAppSelector(s => s.vote.displayedQuestions)
    let displayOption = useAppSelector(s => s.vote.displayOption)
    let shouldFetch = useAppSelector(s => s.vote.fetchQuestions)

    if (shouldFetch){
        _getQuestions().then((data) => {
            dispatch(fetchQuestions(data))
        })
    }

    let handleQuestionDetailClick = (q:Question) => {
        navigate("/voteDetail/" + q.id)
    }

    interface ChangeVisibilityPayload {
        displayOption: "all" | "ans" | "unans",
        displayedQuestions: Question[]
    }

    let handleShowAllList = () => {
        let pl: ChangeVisibilityPayload = {
            displayOption: "all",
            displayedQuestions: Object.values(questions)
        }
        dispatch(changeVisibility(pl))
    }
    let handleShowAnsweredList = () => {
        let al = Object.values(questions).filter(q => {
            return q.optionOne.votes.length + q.optionTwo.votes.length > 0
        })
        let pl: ChangeVisibilityPayload = {
            displayOption: "ans",
            displayedQuestions: al
        }
        dispatch(changeVisibility(pl))
    }
    let handleShowUnansList = () => {
        let ul = Object.values(questions).filter(q => {
            return q.optionOne.votes.length + q.optionTwo.votes.length === 0
        })
        let pl: ChangeVisibilityPayload = {
            displayOption: "unans",
            displayedQuestions: ul
        }
        dispatch(changeVisibility(pl))
    }

    return (
        !loggedIn ? <Navigate to="/"/> : (
            <Container minW="80vw">
                <Heading>Vote</Heading>
                <button onClick={ () => handleShowAllList() }>[ All ]</button>
                <button onClick={ () => handleShowAnsweredList() }>[ Ans ]</button>
                <button onClick={ () => handleShowUnansList() }>[ UnAns ]</button>
                <p>[ current: {displayOption} ]</p>
                <br/>
                <Link to={"/add"}>[ Add ]</Link>
                <br/>

                {displayedQuestions ? displayedQuestions.map((q) => {
                    return <div key={q.id} onClick={ () => { handleQuestionDetailClick(q) }}>
                        <p>{ q.author }</p>
                        <p>{q.optionOne.text}, {q.optionOne.votes.length}, {q.optionTwo.text}, {q.optionTwo.votes.length}</p>
                        <br/>
                    </div>
                }) : null }

            </Container>
        )
    )
}

export default Vote