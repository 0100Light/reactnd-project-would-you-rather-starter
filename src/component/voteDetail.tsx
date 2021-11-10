import {Heading} from "@chakra-ui/react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {voteForOption} from "../redux/voteSlice";

function VoteDetail() {
    let isLoggedIn = useAppSelector(s => s.user.loggedIn)
    let loggedInUser = useAppSelector(s => s.user.loginUser)
    let {qid} = useParams()
    let questions = Object.values(useAppSelector(s => s.vote.questions))
    let navigate = useNavigate()
    let q = questions.filter(q => q.id === qid)[0]
    let dispatch = useAppDispatch()

    let handleVoteForOption = (option: number) => {
        if (!loggedInUser) return null

        switch (option) {
            case 1: {
                let payload = {
                    "option": 1,
                    "question": q,
                    "user": loggedInUser
                }
                dispatch(voteForOption(payload))
                break
            }
            case 2: {
                let payload = {
                    "option": 2,
                    "question": q,
                    "user": loggedInUser
                }
                dispatch(voteForOption(payload))
                break
            }
            default: return null
        }

        // console.log(nq)
    }

    return (
        !isLoggedIn ? <Navigate to={"/"}/> : (
            <div>
                <Heading>Vote detail: {qid}</Heading>
                <p>[ { q.author } ] Asked</p>
                <p>Would your rather</p>
                <br/>
                <div id="optionA">
                    <p>[ { q.optionOne.text } ]</p>
                    <p>[ V ]</p>
                    <button onClick={ () => handleVoteForOption(1) }>Choose</button>
                </div>
                <br/>
                <div id="optionB">
                    <p>[ { q.optionTwo.text } ]</p>
                    <p>[ V ]</p>
                    <button onClick={ () => handleVoteForOption(2) }>Choose</button>
                </div>
            </div>
        )
    )
}

export default VoteDetail