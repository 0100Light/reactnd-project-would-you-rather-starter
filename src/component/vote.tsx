import {Button, Container, Heading, HStack, Text} from "@chakra-ui/react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {_getQuestions} from "../_DATA";
import {changeVisibility, fetchQuestions} from "../redux/voteSlice";
import Question from "../types/Question";
import moment from "moment";

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
                .sort(i => i.timestamp).reverse()
        }
        dispatch(changeVisibility(pl))
    }
    let handleShowAnsweredList = () => {
        let al = Object.values(questions).filter(q => {
            return q.optionOne.votes.length + q.optionTwo.votes.length > 0
        }).sort(i => i.timestamp).reverse()

        let pl: ChangeVisibilityPayload = {
            displayOption: "ans",
            displayedQuestions: al
        }
        dispatch(changeVisibility(pl))
    }
    let handleShowUnansList = () => {
        let ul = Object.values(questions).filter(q => {
            return q.optionOne.votes.length + q.optionTwo.votes.length === 0
        }).sort(i => i.timestamp).reverse()
        let pl: ChangeVisibilityPayload = {
            displayOption: "unans",
            displayedQuestions: ul
        }
        dispatch(changeVisibility(pl))
    }

    return (
        !loggedIn ? <Navigate to="/"/> : (
            <Container minW="80vw">
                <Heading my={3}>Vote</Heading>

                <Text color={"gray.500"}>
                    Click on one of the questions to vote,
                        or click the button to add a question yourself :)
                </Text>
                <br/>

                <HStack style={{ textDecoration: "underline" }}>
                    <button onClick={ () => handleShowAllList() }>Show All |</button>
                    <button onClick={ () => handleShowAnsweredList() }>Show Answered |</button>
                    <button onClick={ () => handleShowUnansList() }>Show Unaswered |</button>
                </HStack>
                <p>(currently showing: {displayOption})</p>
                <Button my={5} bg={"yellow.300"}>
                    <Link to={"/add"}> Add Question </Link>
                </Button>
                <br/>

                {displayedQuestions ? displayedQuestions.map((q) => {
                    return <div key={q.id} onClick={ () => { handleQuestionDetailClick(q) }}>
                        <p><strong>{ q.author.toUpperCase() }</strong> asked at {moment(q.timestamp).format("YYYY-MM-DD HH:mm")}:
                        Would you rather <strong>{q.optionOne.text} ({q.optionOne.votes.length}) </strong>
                            or <strong>{q.optionTwo.text} ({q.optionTwo.votes.length})</strong></p>
                        {/*<p>{q.optionOne.text}, {q.optionOne.votes.length}, {q.optionTwo.text}, {q.optionTwo.votes.length}</p>*/}
                        <br/>
                    </div>
                }) : null }

            </Container>
        )
    )
}

export default Vote